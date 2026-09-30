'use client'

import { toast } from 'sonner'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect, useRef } from 'react'
import { getExplorerTxUrl } from '@/lib/explorer'

interface UseWeb3ToastProps {
    txhash: `0x${string}` | undefined
    isPending: boolean // User wallet signature status
    error: Error | null
    actionName?: string
}

export function useWeb3Toast({
    txhash,
    isPending,
    error,
    actionName = 'Transaction',
}: UseWeb3ToastProps) {
    const { chainId } = useAccount()
    const toastIdRef = useRef<string | number | null>(null)

    // Wait for transaction mining/confirmation
    const {
        isLoading: isConfirming,
        isSuccess,
        isError: isTxError,
        error: txError,
    } = useWaitForTransactionReceipt({
        hash: txhash,
    })

    // 1. User Signature Pending (Metamask Popup Open)
    useEffect(() => {
        if (isPending) {
            toastIdRef.current = toast.loading(`Confirming ${actionName} in wallet...`, {
                description: 'Please approve the transaction in your wallet extension.',
            })
        }
    }, [isPending, actionName])

    // 2. Transaction Submitted to Mempool (Waiting for Block Mining)
    useEffect(() => {
        if (txhash && isConfirming) {
            const explorerUrl = getExplorerTxUrl({chainId, txhash})

            toast.loading(`${actionName} Submitted!`, {
                id: toastIdRef.current ?? undefined,
                description: 'Waiting for block confirmation on-chain...',
                action: explorerUrl
                    ? {
                        label: 'View Explorer',
                        onClick: () => window.open(explorerUrl, '_blank'),
                    }
                    : undefined,
            })
        }
    }, [txhash, isConfirming, chainId, actionName])

    // 3. Transaction Success (Mined)
    useEffect(() => {
        if (txhash && isSuccess) {
            const explorerUrl = getExplorerTxUrl({ chainId, txhash })

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
            })
        }
    }, [txhash, isSuccess, chainId, actionName])

    // 4. Transaction Rejected / Reverted
    useEffect(() => {
        if (error || isTxError) {
            const rawError = error || txError
            const isUserRejected = rawError?.message?.includes('User rejected')

            toast.error(isUserRejected ? 'Transaction Rejected' : `${actionName} Failed ❌`, {
                id: toastIdRef.current ?? undefined,
                description: isUserRejected
                    ? 'You declined the transaction in your wallet.'
                    : rawError?.message?.slice(0, 100) || 'Transaction execution reverted.',
                duration: 5000,
            })
        }
    }, [error, isTxError, txError, actionName])
}