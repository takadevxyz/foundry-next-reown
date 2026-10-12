export const CONTRACTS = {
  // Kryvora Network Testnet
  73829164: {
    counter: '0x1d25ED9D1c5853F2e93044121CEFC5C9BA7E565D',
    usdcm: '0x1B0d943B12AD99D64d87f8464F945D87E58a14Ad',
    vault: '0xc0403d9642f2c9b6dAF702898dDF7839d3806a7D'
  },
  // Ethereum Sepolia
  11155111: {
    counter: '0x948eaC901183b07fd6dfbb79B1C5e4134ADB1de2',
    usdcm: '0x09AaDE25F8d2AD7E32cD5c0f1BdCc82F1E9648D5',
    vault: '0x2219d43e214bee5f5d6aed65fa80a518e9ef1026'
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
