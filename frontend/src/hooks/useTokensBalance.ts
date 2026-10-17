import { useReadContracts } from "wagmi";
import { mockErc20Abi } from "@/lib/generated/MockERC20";

export type Address = `0x${string}`;
export interface TokenMetadata {
    key: string;
    address: Address;
    symbol: string;
    decimals: number;
    name: string;
}
export interface TokenList {
    [symbol: string]: Address;
}
export interface TokensBalance {
    tokens: TokenList,
    userAddress: Address
}

export function useTokensBalance({tokens, userAddress}: TokensBalance) {
    const tokenEntries = Object.entries(tokens);
    const contracts = tokenEntries.flatMap(([_, address]) => [
        { address, abi: mockErc20Abi, functionName: 'balanceOf', args: userAddress ? [userAddress] : undefined },
    ])

    const {data, isLoading, isError, refetch} = useReadContracts({
        contracts,
        query: {
            enabled: !!userAddress
        }
    });
    const balances: Record<string, BigInt> = {}
    tokenEntries.forEach(([key], index) => {
        const balanceResult = data?.[index]?.result;
        balances[key] = (balanceResult as BigInt) || BigInt(0);
    })

    return {
        balances,
        rawData : data,
        isLoading,
        isError,
        refetch
    }
}