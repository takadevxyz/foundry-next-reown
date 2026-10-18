import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniswapV2Pair
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uniswapV2PairAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '_reserve0', internalType: 'uint112', type: 'uint112' },
      { name: '_reserve1', internalType: 'uint112', type: 'uint112' },
      { name: '_blockTimestampLast', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token0', internalType: 'address', type: 'address' },
      { name: '_token1', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'kLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: 'liquidity', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'skim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Out', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Out', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sync',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0In',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1In',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount0Out',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1Out',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve0',
        internalType: 'uint112',
        type: 'uint112',
        indexed: false,
      },
      {
        name: 'reserve1',
        internalType: 'uint112',
        type: 'uint112',
        indexed: false,
      },
    ],
    name: 'Sync',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__
 */
export const useReadUniswapV2Pair = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadUniswapV2PairDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"MINIMUM_LIQUIDITY"`
 */
export const useReadUniswapV2PairMinimumLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'MINIMUM_LIQUIDITY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadUniswapV2PairPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'PERMIT_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadUniswapV2PairAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadUniswapV2PairBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadUniswapV2PairDecimals = /*#__PURE__*/ createUseReadContract(
  { abi: uniswapV2PairAbi, functionName: 'decimals' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"factory"`
 */
export const useReadUniswapV2PairFactory = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadUniswapV2PairGetReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'getReserves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"kLast"`
 */
export const useReadUniswapV2PairKLast = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'kLast',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"name"`
 */
export const useReadUniswapV2PairName = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadUniswapV2PairNonces = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"price0CumulativeLast"`
 */
export const useReadUniswapV2PairPrice0CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'price0CumulativeLast',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"price1CumulativeLast"`
 */
export const useReadUniswapV2PairPrice1CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'price1CumulativeLast',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadUniswapV2PairSymbol = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"token0"`
 */
export const useReadUniswapV2PairToken0 = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"token1"`
 */
export const useReadUniswapV2PairToken1 = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2PairAbi,
  functionName: 'token1',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadUniswapV2PairTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2PairAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__
 */
export const useWriteUniswapV2Pair = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2PairAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteUniswapV2PairApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2PairAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteUniswapV2PairBurn = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2PairAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteUniswapV2PairInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2PairAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteUniswapV2PairMint = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2PairAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteUniswapV2PairPermit = /*#__PURE__*/ createUseWriteContract(
  { abi: uniswapV2PairAbi, functionName: 'permit' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"skim"`
 */
export const useWriteUniswapV2PairSkim = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2PairAbi,
  functionName: 'skim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteUniswapV2PairSwap = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2PairAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"sync"`
 */
export const useWriteUniswapV2PairSync = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2PairAbi,
  functionName: 'sync',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteUniswapV2PairTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2PairAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteUniswapV2PairTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2PairAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__
 */
export const useSimulateUniswapV2Pair = /*#__PURE__*/ createUseSimulateContract(
  { abi: uniswapV2PairAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateUniswapV2PairApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateUniswapV2PairBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateUniswapV2PairInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateUniswapV2PairMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateUniswapV2PairPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"skim"`
 */
export const useSimulateUniswapV2PairSkim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'skim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateUniswapV2PairSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'swap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"sync"`
 */
export const useSimulateUniswapV2PairSync =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'sync',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateUniswapV2PairTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateUniswapV2PairTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2PairAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__
 */
export const useWatchUniswapV2PairEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: uniswapV2PairAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchUniswapV2PairApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2PairAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchUniswapV2PairBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2PairAbi,
    eventName: 'Burn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchUniswapV2PairMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2PairAbi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `eventName` set to `"Swap"`
 */
export const useWatchUniswapV2PairSwapEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2PairAbi,
    eventName: 'Swap',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `eventName` set to `"Sync"`
 */
export const useWatchUniswapV2PairSyncEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2PairAbi,
    eventName: 'Sync',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2PairAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchUniswapV2PairTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2PairAbi,
    eventName: 'Transfer',
  })
