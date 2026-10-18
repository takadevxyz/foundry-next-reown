import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniswapV2Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uniswapV2FactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_feeToSetter', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'allPairs',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'allPairsLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
    ],
    name: 'createPair',
    outputs: [{ name: 'pair', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeTo',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeToSetter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'getPair',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_feeTo', internalType: 'address', type: 'address' }],
    name: 'setFeeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feeToSetter', internalType: 'address', type: 'address' },
    ],
    name: 'setFeeToSetter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token0',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token1',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pair',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'PairCreated',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__
 */
export const useReadUniswapV2Factory = /*#__PURE__*/ createUseReadContract({
  abi: uniswapV2FactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"allPairs"`
 */
export const useReadUniswapV2FactoryAllPairs =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'allPairs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"allPairsLength"`
 */
export const useReadUniswapV2FactoryAllPairsLength =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'allPairsLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"feeTo"`
 */
export const useReadUniswapV2FactoryFeeTo = /*#__PURE__*/ createUseReadContract(
  { abi: uniswapV2FactoryAbi, functionName: 'feeTo' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"feeToSetter"`
 */
export const useReadUniswapV2FactoryFeeToSetter =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'feeToSetter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"getPair"`
 */
export const useReadUniswapV2FactoryGetPair =
  /*#__PURE__*/ createUseReadContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'getPair',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__
 */
export const useWriteUniswapV2Factory = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV2FactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"createPair"`
 */
export const useWriteUniswapV2FactoryCreatePair =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'createPair',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"setFeeTo"`
 */
export const useWriteUniswapV2FactorySetFeeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'setFeeTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"setFeeToSetter"`
 */
export const useWriteUniswapV2FactorySetFeeToSetter =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'setFeeToSetter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__
 */
export const useSimulateUniswapV2Factory =
  /*#__PURE__*/ createUseSimulateContract({ abi: uniswapV2FactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"createPair"`
 */
export const useSimulateUniswapV2FactoryCreatePair =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'createPair',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"setFeeTo"`
 */
export const useSimulateUniswapV2FactorySetFeeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'setFeeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `functionName` set to `"setFeeToSetter"`
 */
export const useSimulateUniswapV2FactorySetFeeToSetter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV2FactoryAbi,
    functionName: 'setFeeToSetter',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2FactoryAbi}__
 */
export const useWatchUniswapV2FactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: uniswapV2FactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uniswapV2FactoryAbi}__ and `eventName` set to `"PairCreated"`
 */
export const useWatchUniswapV2FactoryPairCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uniswapV2FactoryAbi,
    eventName: 'PairCreated',
  })
