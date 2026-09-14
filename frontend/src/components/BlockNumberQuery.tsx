'use client';

import { useQuery } from '@tanstack/react-query';
import { useConfig, useAccount } from 'wagmi';
import { getBlockNumber } from 'wagmi/actions';

export function BlockNumberQuery() {
    const config = useConfig();
    const { isConnected } = useAccount();

    const { data: blockNumber, isLoading, refetch } = useQuery({
        queryKey: ['blockNumber'],
        queryFn: async () => {
            const block = await getBlockNumber(config);
            return block.toString();
        },
        refetchInterval: 5000,
        enabled: isConnected,
    });

    return (
        <div className="mt-5 p-4 bg-neutral-900 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Network Block Number</h3>
            <p className="text-neutral-300 text-sm mb-3 font-mono">
                {!isConnected
                    ? '--- undefined ---'
                    : isLoading
                        ? 'Loading block...'
                        : `Current Block: ${blockNumber}`}
            </p>
            {isConnected && (
                <button
                    onClick={() => refetch()}
                    className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded transition cursor-pointer"
                >
                    Refresh Block
                </button>
            )}
        </div>
    );
}