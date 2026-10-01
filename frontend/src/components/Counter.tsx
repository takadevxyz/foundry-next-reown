'use client';

import {
  useWriteCounterIncrement,
  useReadCounterNumber,
} from '@/lib/generated';
import { useWeb3Toast } from '@/hooks/useWeb3Toast';
import { useAppKitNetwork } from '@reown/appkit/react';
import { getContractAddresses } from '@/lib/contracts';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useEffect } from 'react';

export function IncrementCounterButton() {
  const { chainId } = useAppKitNetwork();
  const contractAddress = getContractAddresses({
    chainId: chainId as number,
    key: 'counter',
  });

  // 1. Read On-Chain Counter Data
  const {
    data: count,
    isLoading: isReadLoading,
    refetch,
  } = useReadCounterNumber({
    address: contractAddress,
    chainId: chainId as number,
  });

  // 2. Write Contract Hook
  const {
    writeContract,
    data: hash,
    isPending,
    error,
  } = useWriteCounterIncrement();

  // 3. Trigger Toast & Wait for Confirmation
  useWeb3Toast({
    txhash: hash,
    isPending,
    error,
    actionName: 'Increment Counter',
  });

  const handleIncrement = () => {
    writeContract({
      address: contractAddress,
      chainId: chainId as number,
    });
  };

  const { isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 4. AUTO REFETCH
  useEffect(() => {
    if (isTxSuccess) {
      refetch();
    }
  }, [isTxSuccess, refetch]);

  return (
    <div className="p-4 bg-neutral-900 rounded-lg text-white space-y-4 border border-neutral-800">
      {/* Read State Display */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-400">Current Counter:</span>
        <span className="text-xl font-bold font-mono text-emerald-400">
          {isReadLoading ? (
            <span className="text-neutral-500 text-sm animate-pulse">
              Loading...
            </span>
          ) : (
            (count?.toString() ?? '0')
          )}
        </span>
      </div>

      {/* Write Button */}
      <button
        onClick={handleIncrement}
        disabled={isPending || isReadLoading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 text-white font-medium rounded transition cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? 'Check Wallet...' : 'Increment Counter'}
      </button>
    </div>
  );
}
