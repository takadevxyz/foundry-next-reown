import { defineChain } from '@reown/appkit/networks';

export const kryvora_network_testnet = defineChain({
    id: 73829164,
    name: 'Kryvora Network Testnet',
    caipNetworkId: 'eip155:73829164',
    chainNamespace: 'eip155',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH Kryvora',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.kryvora.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Explorer',
            url: 'https://explorer-testnet.kryvora.network/',
        },
    },
});
