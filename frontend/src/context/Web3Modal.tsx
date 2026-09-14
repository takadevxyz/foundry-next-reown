'use client';

import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import {
  cookieStorage,
  createStorage,
  cookieToInitialState,
  WagmiProvider,
  type Config,
} from 'wagmi';
import { networks, projectId } from '@/lib/config';

const queryClient = new QueryClient();

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Foundry Next Reown Monorepo',
    description: 'Starter Kit Monolith',
    url:
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://github.com/takadevxyz/foundry-next-reown.git',
    icons: ['https://avatars.githubusercontent.com/takadevxyz'],
  },
  themeMode: 'dark',
  features: {
    analytics: false,
    email: false,
    socials: false,
    swaps: false,
    send: false,
    onramp: false,
    history: false,
  },
  allWallets: 'HIDE',
  chainImages: {
    73829164: 'https://kryvora.network/kryvora-brand-logo.png?v=3',
  },
});

export function Web3ModalProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies?: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies ?? null,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
