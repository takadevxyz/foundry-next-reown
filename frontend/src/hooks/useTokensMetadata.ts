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
export interface Tokens {
    tokens: TokenList
}

export function useTokensMedata({tokens}: Tokens) {
    const tokenEntries = Object.entries(tokens);
    const contracts = tokenEntries.flatMap(([_, address]) => [
        {address, abi: mockErc20Abi, functionName: 'symbol'},
        {address, abi: mockErc20Abi, functionName: 'decimals'},
        {address, abi: mockErc20Abi, functionName: 'name'},
    ])

    const {data, isLoading, isError} = useReadContracts({contracts});
    const tokensMetadata: TokenMetadata[] = tokenEntries.map(([key, address], index) => {
        const baseIdx = index * 3;
        const symbol = (data?.[baseIdx]?.result as string) || key.toUpperCase();
        const decimals = (data?.[baseIdx + 1]?.result as number) || 18;
        const name = (data?.[baseIdx + 2]?.result as string) || key;

        return {
            key,
            address: address as Address,
            symbol,
            decimals,
            name
        }
    })

    return {
        tokens: tokensMetadata,
        isLoading,
        isError
    }
}