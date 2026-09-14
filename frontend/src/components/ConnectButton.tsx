'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';

export const ConnectButton = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="flex items-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md opacity-80 cursor-wait hover:cursor-pointer">
                Connect Wallet
            </button>
        );
    }

    return <ConnectButtonInner />;
};

function ConnectButtonInner() {
    const { open, close } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { caipNetwork, chainId } = useAppKitNetwork();

    const isFirstRender = useRef(true);
    const prevChainId = useRef(chainId);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            prevChainId.current = chainId;
            return;
        }

        if (chainId !== prevChainId.current) {
            prevChainId.current = chainId;
            close();
        }
    }, [chainId, close]);

    if (!isConnected) {
        return (
            <button
                onClick={() => open({ view: 'Connect' })}
                className="flex items-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md hover:opacity-90 transition-all active:scale-95 hover:cursor-pointer"
            >
                Connect Wallet
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => open({ view: 'Networks' })}
                className="flex items-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md hover:opacity-90 transition-all active:scale-95 hover:cursor-pointer"
            >
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                {caipNetwork?.name ?? 'Network'}
            </button>

            <button
                onClick={() => open({ view: 'ProfileWallets' })}
                className="flex items-center gap-2 rounded-sm bg-blue-600 hover:bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md hover:opacity-90 transition-all active:scale-95 hover:cursor-pointer"
            >
                {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
        </div>
    );
}