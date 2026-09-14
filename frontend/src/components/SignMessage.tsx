'use client';

import { useState } from 'react';
import { useSignMessage, useAccount } from 'wagmi';

export function SignMessage() {
    const { isConnected } = useAccount();
    const { signMessage, data: signature, isPending, error } = useSignMessage();
    const [message, setMessage] = useState('Hello Onchain');

    if (!isConnected) return null;

    return (
        <div className="mt-5 p-4 bg-neutral-900 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Sign Message</h3>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 w-full mb-3 bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none focus:border-blue-500 font-mono text-sm"
            />
            <button
                onClick={() => signMessage({ message })}
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 text-white font-medium rounded transition cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? 'Signing...' : 'Sign Message'}
            </button>

            {signature && (
                <div className="break-all mt-3 text-xs text-emerald-400 font-mono bg-neutral-950 p-2.5 rounded border border-neutral-800">
                    <strong className="block text-white mb-1">Signature:</strong> {signature}
                </div>
            )}

            {error && <div className="text-red-400 mt-3 text-sm">Error: {error.message}</div>}
        </div>
    );
}