export const CONTRACTS = {
  // Kryvora Network Testnet
  73829164: {
    counter: '0x1d25ED9D1c5853F2e93044121CEFC5C9BA7E565D',
    usdcm: '0x1B0d943B12AD99D64d87f8464F945D87E58a14Ad',
    vault: '0xc0403d9642f2c9b6dAF702898dDF7839d3806a7D',
    weth: '0xe74DAb1a68A1cc93ADE05d39C1571E554D5Ca4AB',
    v2Factory: '0xcF4BF5b45e9056d63e3473F2672bcDF121192028',
    v2Router02: '0x12b07eD9290AB4B4D20AbCb49E49e82f2C13374E'
  },
  // Ethereum Sepolia
  11155111: {
    counter: '0x948eaC901183b07fd6dfbb79B1C5e4134ADB1de2',
    usdcm: '0x09AaDE25F8d2AD7E32cD5c0f1BdCc82F1E9648D5',
    vault: '0x2219d43e214bee5f5d6aed65fa80a518e9ef1026',
    weth: '0xAA4150F9B5c694fe1FA83eDc5E0D290489fb2B50',
    v2Factory: '0xb7d95d1D008b56DB475ED2642ed1aC963e2Bca62',
    v2Router02: '0xbD857379dC0F4922392697fbe1eC58da156F4d1E'
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
