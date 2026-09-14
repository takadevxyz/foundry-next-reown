'use client';

import { Suspense } from 'react';
import { ConnectButton } from '@/components/ConnectButton';
import { WalletBalance } from '@/components/WalletBalance';
import { SignMessage } from '@/components/SignMessage';
import { BlockNumberQuery } from '@/components/BlockNumberQuery';

interface HomePage {
  params: Promise<{
    id: string;
  }>;
}

export default function Page(props: HomePage) {
  return (
    <Suspense fallback={null}>
      <PageContent {...props} />
    </Suspense>
  );
}

function PageContent(props: HomePage) {
  return (
    <main className="app-shell min-h-screen flex flex-col items-center justify-center p-4">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="w-full max-w-xl space-y-6">
        <section className="flex flex-col items-center justify-center space-y-4 p-6 bg-neutral-950/50 border border-neutral-800 rounded-2xl backdrop-blur-md">
          <div className="top-actions">
            <div className="connect-button-wrapper">
              <ConnectButton />
            </div>
          </div>
          <WalletBalance />
        </section>

        <section className="space-y-4">
          <SignMessage />
          <BlockNumberQuery />
        </section>
      </div>
    </main>
  );
}
