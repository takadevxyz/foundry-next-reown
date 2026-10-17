export const CONTRACTS = {
    // Kryvora Network Testnet
    73829164: {
        usdcm: '0x1B0d943B12AD99D64d87f8464F945D87E58a14Ad',
        vault: '0xc0403d9642f2c9b6dAF702898dDF7839d3806a7D',
        weth: '0xe74DAb1a68A1cc93ADE05d39C1571E554D5Ca4AB',
    },
    // Ethereum Sepolia
    11155111: {
        usdcm: '0x09AaDE25F8d2AD7E32cD5c0f1BdCc82F1E9648D5',
        vault: '0x2219d43e214bee5f5d6aed65fa80a518e9ef1026',
        weth: '0xAA4150F9B5c694fe1FA83eDc5E0D290489fb2B50',
    },
} as const;

interface GetTokenAddresses {
    chainId: number;
}
export function getTokenAddresses({ chainId }: GetTokenAddresses) {
    const contracts =
        CONTRACTS[chainId as keyof typeof CONTRACTS] || CONTRACTS[11155111];
    return contracts
}
