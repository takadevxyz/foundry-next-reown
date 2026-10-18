import { useReadContracts } from "wagmi";
import { mockErc20Abi } from "@/lib/generated/MockERC20";

export type Address = `0x${string}`;

export interface TokenList {
    [symbol: string]: Address;
}

interface TokensAllowanceProps {
    tokens: TokenList;
    userAddress?: Address;
    spenderAddress?: Address;
}

export function useTokensAllowance({tokens, userAddress, spenderAddress}: TokensAllowanceProps){
    const tokenEntries = Object.entries(tokens);

    const contracts = tokenEntries.flatMap(([_, address]) => [{
        address,
        abi: mockErc20Abi,
        functionName: 'allowance',
        args: userAddress && spenderAddress ? [userAddress, spenderAddress] : undefined,
    }])

    const {data, isLoading, isError, refetch} = useReadContracts({
        contracts,
        query: {
            enabled: !!userAddress && !!spenderAddress
        }
    })

    const allowances: Record<string, bigint> = {};
    tokenEntries.forEach(([key], index) => {
        const allowanceResult = data?.[index]?.result;
        allowances[key] = (allowanceResult as bigint) || BigInt(0);
    })

    return {
        allowances,
        rawData: data,
        isLoading, 
        isError,
        refetch
    }
}