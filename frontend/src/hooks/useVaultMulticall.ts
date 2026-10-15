import { useReadContracts } from "wagmi";
import { mockErc20Abi } from "@/lib/generated/MockERC20";
import { mockVaultAbi } from "@/lib/generated/MockVault";

interface UseVaultMulticall {
    vaultAddress: `0x${string}`;
    tokenAddress: `0x${string}`;
    userAddress: `0x${string}`;
}
export function useVaultMulltical({vaultAddress, tokenAddress, userAddress}: UseVaultMulticall) {
    const {data, refetch, isLoading, isError} = useReadContracts({
        contracts: [
            {
                address: vaultAddress,
                abi: mockVaultAbi,
                functionName: 'totalAssets'
            }, 
            {
                address: vaultAddress,
                abi: mockVaultAbi,
                functionName: 'balanceOf',
                args: userAddress ? [userAddress] : undefined
            },
            {
                address: vaultAddress,
                abi: mockVaultAbi,
                functionName: 'symbol'
            },
            {
                address: tokenAddress,
                abi: mockErc20Abi,
                functionName: 'balanceOf',
                args: userAddress ? [userAddress] : undefined
            },
            {
                address: tokenAddress,
                abi: mockErc20Abi,
                functionName: 'allowance',
                args: userAddress && vaultAddress ? [userAddress as `0x${string}`, vaultAddress as `0x${string}`] : undefined,
            },
            {
                address: tokenAddress,
                abi: mockErc20Abi,
                functionName: 'symbol'
            }
        ],
        query: {enabled: Boolean(vaultAddress && tokenAddress)}
    })

    const [totalAssetResult, userBalanceVaultResult, symbolVaultResult, userTokenBalanceResult, userTokenAllowanceResult, symbolTokenResult] = data || []

    return {
        totalAssetVault: totalAssetResult?.status === 'success' ? totalAssetResult.result : BigInt(0),
        userBalanceVault: userBalanceVaultResult?.status === 'success' ? userBalanceVaultResult.result : BigInt(0),
        symbolVault: symbolVaultResult?.status === 'success' ? symbolVaultResult.result : 'MockVault',
        userTokenBalance: userTokenBalanceResult?.status === 'success' ? userTokenBalanceResult.result : BigInt(0),
        userTokenAllowance: userTokenAllowanceResult?.status === 'success' ? userTokenAllowanceResult.result : BigInt(0),
        symbolToken: symbolTokenResult?.status === 'success' ? symbolTokenResult.result : 'MockToken',
        isLoading,
        isError,
        refetchAll: refetch
    }
}