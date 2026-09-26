import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  cookieStorage,
  createStorage,
  http,
  fallback,
  type Transport,
} from 'wagmi';
import { networks, projectId } from '@/lib/config';

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const alchemySubdomains: Record<number, string> = {
  11155111: 'eth-sepolia',
};

const dynamicTransports = networks.reduce(
  (acc, network) => {
    const chainId = Number(network.id);
    if (isNaN(chainId)) return acc;

    const rpcUrls: string[] = [];

    const alchemySubdomain = alchemySubdomains[chainId];
    if (alchemyKey && alchemySubdomain) {
      rpcUrls.push(
        `https://${alchemySubdomain}.g.alchemy.com/v2/${alchemyKey}`,
      );
    }

    const defaultRpcs = network.rpcUrls?.default?.http || [];
    rpcUrls.push(...defaultRpcs);

    if (chainId === 11155111) {
      rpcUrls.push(
        'https://sepolia.gateway.tenderly.co',
        'https://api.zan.top/eth-sepolia',
      );
    }

    const uniqueRpcUrls = Array.from(new Set(rpcUrls));

    acc[chainId] = fallback(
      uniqueRpcUrls.map((url) => http(url)),
      { rank: false },
    );

    return acc;
  },
  {} as Record<number, Transport>,
);

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: dynamicTransports,
});
