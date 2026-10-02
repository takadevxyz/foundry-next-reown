'use client';

import { toast } from 'sonner';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useRef } from 'react';
import { getExplorerTxUrl } from '@/lib/explorer';

interface UseWeb3ToastProps {
  txhash: `0x${string}` | undefined;
  isPending: boolean; // User wallet signature status
  error: Error | null;
  actionName?: string;
}

export function useWeb3Toast({
  txhash,
  isPending,
  error,
  actionName = 'Transaction',
}: UseWeb3ToastProps) {
  const { chainId } = useAccount();
  const toastIdRef = useRef<string | number | null>(null);

  // Track chainId & hash when the transaction is triggered for the FIRST TIME
  const initialChainIdRef = useRef<number | undefined>(chainId);
  const processedHashes = useRef<Set<string>>(new Set());

  // Helper function to safely clean up current toast reference
  const dismissActiveToast = () => {
    if (toastIdRef.current !== null) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  };

  // 0. RESET ALL TOASTS ON CHAIN SWITCH
  useEffect(() => {
    dismissActiveToast();
  }, [chainId]);

  // Lock chainId when a new txhash actually appears
  useEffect(() => {
    if (txhash) {
      initialChainIdRef.current = chainId;
    }
  }, [txhash, chainId]);

  // Only run query receipt if txhash exists AND current chain matches the submission chain
  const isChainMatched = chainId === initialChainIdRef.current;

  const {
    isLoading: isConfirming,
    isSuccess,
    isError: isTxError,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: isChainMatched ? txhash : undefined,
    chainId: initialChainIdRef.current,
  });

  // 1. User Signature Pending (Wallet extension popup open)
  useEffect(() => {
    if (isPending && !error && !isTxError) {
      // Dismiss any existing toast before spawning a new signature loading toast
      dismissActiveToast();

      toastIdRef.current = toast.loading(
        `Confirming ${actionName} in wallet...`,
        {
          description:
            'Please approve the transaction in your wallet extension.',
        },
      );
    }
  }, [isPending, error, isTxError, actionName]);

  // 2. Transaction Submitted to Mempool (Waiting for on-chain block mining)
  useEffect(() => {
    if (txhash && isConfirming && isChainMatched) {
      const explorerUrl = getExplorerTxUrl({
        chainId: initialChainIdRef.current,
        txhash,
      });

      toastIdRef.current = toast.loading(`${actionName} Submitted!`, {
        id: toastIdRef.current ?? undefined,
        description: 'Waiting for block confirmation on-chain...',
        action: explorerUrl
          ? {
              label: 'View Explorer',
              onClick: () => window.open(explorerUrl, '_blank'),
            }
          : undefined,
      });
    }
  }, [txhash, isConfirming, isChainMatched, actionName]);

  // 3. Transaction Success (Mined)
  useEffect(() => {
    if (
      txhash &&
      isSuccess &&
      isChainMatched &&
      !processedHashes.current.has(txhash)
    ) {
      processedHashes.current.add(txhash);

      const explorerUrl = getExplorerTxUrl({
        chainId: initialChainIdRef.current,
        txhash,
      });

      toast.success(`${actionName} Successful! 🎉`, {
        id: toastIdRef.current ?? undefined,
        description: 'Your transaction has been confirmed on the blockchain.',
        duration: 5000,
        action: explorerUrl
          ? {
              label: 'View Explorer ↗',
              onClick: () => window.open(explorerUrl, '_blank'),
            }
          : undefined,
      });

      toastIdRef.current = null;
    }
  }, [txhash, isSuccess, isChainMatched, actionName]);

  // 4. Transaction Rejected / Reverted / Execution Error
  useEffect(() => {
    const activeError = error || txError;

    if (activeError) {
      const isUserRejected =
        activeError?.message?.toLowerCase().includes('user rejected') ||
        activeError?.message?.toLowerCase().includes('user denied');

      // Force-dismiss loading toast first to prevent stuck pending toast
      dismissActiveToast();

      // Spawn standalone error toast (do NOT reuse id to prevent state collision)
      toast.error(
        isUserRejected ? 'Transaction Rejected' : `${actionName} Failed ❌`,
        {
          description: isUserRejected
            ? 'You declined the transaction in your wallet.'
            : activeError?.message?.slice(0, 100) ||
              'Transaction execution reverted.',
          duration: 5000,
        },
      );
    }
  }, [error, isTxError, txError, actionName]);
}
