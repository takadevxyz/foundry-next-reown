import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockVaultAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_asset', internalType: 'contract IERC20', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
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
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'redeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'simulateYield',
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
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
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
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxDeposit',
  },
  {
    type: 'error',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxMint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxRedeem',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxWithdraw',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__
 */
export const useReadMockVault = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMockVaultAllowance = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"asset"`
 */
export const useReadMockVaultAsset = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'asset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMockVaultBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"convertToAssets"`
 */
export const useReadMockVaultConvertToAssets =
  /*#__PURE__*/ createUseReadContract({
    abi: mockVaultAbi,
    functionName: 'convertToAssets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"convertToShares"`
 */
export const useReadMockVaultConvertToShares =
  /*#__PURE__*/ createUseReadContract({
    abi: mockVaultAbi,
    functionName: 'convertToShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMockVaultDecimals = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"maxDeposit"`
 */
export const useReadMockVaultMaxDeposit = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'maxDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"maxMint"`
 */
export const useReadMockVaultMaxMint = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'maxMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"maxRedeem"`
 */
export const useReadMockVaultMaxRedeem = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'maxRedeem',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"maxWithdraw"`
 */
export const useReadMockVaultMaxWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'maxWithdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"name"`
 */
export const useReadMockVaultName = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"previewDeposit"`
 */
export const useReadMockVaultPreviewDeposit =
  /*#__PURE__*/ createUseReadContract({
    abi: mockVaultAbi,
    functionName: 'previewDeposit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"previewMint"`
 */
export const useReadMockVaultPreviewMint = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'previewMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"previewRedeem"`
 */
export const useReadMockVaultPreviewRedeem =
  /*#__PURE__*/ createUseReadContract({
    abi: mockVaultAbi,
    functionName: 'previewRedeem',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"previewWithdraw"`
 */
export const useReadMockVaultPreviewWithdraw =
  /*#__PURE__*/ createUseReadContract({
    abi: mockVaultAbi,
    functionName: 'previewWithdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMockVaultSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"totalAssets"`
 */
export const useReadMockVaultTotalAssets = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'totalAssets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMockVaultTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: mockVaultAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__
 */
export const useWriteMockVault = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMockVaultApprove = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteMockVaultDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMockVaultMint = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"redeem"`
 */
export const useWriteMockVaultRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"simulateYield"`
 */
export const useWriteMockVaultSimulateYield =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockVaultAbi,
    functionName: 'simulateYield',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMockVaultTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMockVaultTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mockVaultAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteMockVaultWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: mockVaultAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__
 */
export const useSimulateMockVault = /*#__PURE__*/ createUseSimulateContract({
  abi: mockVaultAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMockVaultApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateMockVaultDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMockVaultMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: mockVaultAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"redeem"`
 */
export const useSimulateMockVaultRedeem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'redeem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"simulateYield"`
 */
export const useSimulateMockVaultSimulateYield =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'simulateYield',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMockVaultTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMockVaultTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mockVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateMockVaultWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mockVaultAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockVaultAbi}__
 */
export const useWatchMockVaultEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: mockVaultAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockVaultAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMockVaultApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockVaultAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockVaultAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchMockVaultDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockVaultAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockVaultAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMockVaultTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockVaultAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mockVaultAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchMockVaultWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mockVaultAbi,
    eventName: 'Withdraw',
  })
