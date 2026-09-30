import { networksList } from "@/lib/networks";
interface GetExplorerTxUrlParams {
    chainId: number | undefined;
    txhash: string;
}
export function getExplorerTxUrl({chainId, txhash}: GetExplorerTxUrlParams): string | null {
    if(!chainId || !txhash) return null 
    
    const targetChain = networksList.find((net) => net.id  === chainId);
    const explorerUrl = targetChain?.blockExplorers?.default?.url;

    if(!explorerUrl) return null;

    const baseUrl = explorerUrl.endsWith("/") ? explorerUrl.slice(0, -1) : explorerUrl;
    return `${baseUrl}/tx/${txhash}`
}