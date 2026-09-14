'use client';

import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export function WalletBalance() {
    const { address, isConnected } = useAccount();
    const { data: balance, isLoading } = useBalance({
        address,
    });

    if (!isConnected) return null;
    if (isLoading) {
        return (
            <div className="mt-5 p-4 bg-neutral-900 rounded-lg text-neutral-400 text-sm">
                Loading balance...
            </div>
        );
    }

    return (
        <div className="mt-5 p-4 bg-neutral-900 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Wallet Balance</h3>
            <div className="text-emerald-400 font-mono text-sm">
                {balance ? Number(formatEther(balance.value)).toFixed(4) : '0'} {balance?.symbol}
            </div>
        </div>
    );
}