export const CONTRACTS = {
  // Kryvora Network Testnet
  73829164: {
    counter: '0x1d25ED9D1c5853F2e93044121CEFC5C9BA7E565D',
  },
  // Ethereum Sepolia
  11155111: {
    counter: '0x948eaC901183b07fd6dfbb79B1C5e4134ADB1de2',
  },
} as const;

interface GetContractAddresses {
  chainId: number;
  key: keyof (typeof CONTRACTS)[11155111];
}
export function getContractAddresses({ chainId, key }: GetContractAddresses) {
  const contracts =
    CONTRACTS[chainId as keyof typeof CONTRACTS] || CONTRACTS[11155111];
  return contracts[key];
}
