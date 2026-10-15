import React, { useEffect, useState } from 'react';
import {
    useReadMockVaultTotalAssets,
    useReadMockVaultConvertToShares,
    useWriteMockVaultDeposit,
    useWriteMockVaultRedeem,
    useSimulateMockVaultDeposit,
    useReadMockVaultSymbol,
    useReadMockVaultBalanceOf
} from '@/lib/generated/MockVault';
import {
    useReadMockErc20BalanceOf,
    useWriteMockErc20Approve,
    useSimulateMockErc20Approve,
    useReadMockErc20Symbol,
    useReadMockErc20Allowance
} from '@/lib/generated/MockERC20';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { getContractAddresses } from '@/lib/contracts';
import { useWeb3Toast } from '@/hooks/useWeb3Toast';

export function VaultDashboard() {
    const { address, isConnected } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
    const [depositAmount, setDepositAmount] = useState('');
    const [redeemShares, setRedeemShares] = useState('');

    const vaultAddress = getContractAddresses({ chainId: chainId as number, key: "vault" });
    const usdcm = getContractAddresses({ chainId: chainId as number, key: "usdcm" });

    // 1. Read Contract Data
    const { data: totalAssets, refetch: refetchTotalAssets } = useReadMockVaultTotalAssets({address: vaultAddress});
    const { data: userBalance, refetch: refetchBalance } = useReadMockErc20BalanceOf({
        args: address ? [address as `0x${string}`] : undefined,
        address: usdcm
    });
    const {data: symbolAsset} = useReadMockErc20Symbol({address: usdcm});
    const {data: allowance, refetch: refetchAllowance} = useReadMockErc20Allowance({
        args: address && vaultAddress ? [address as `0x${string}`, vaultAddress as `0x${string}`] : undefined,
        address: usdcm
    })
    const { data: userVaultBalance, refetch: refetchVaultBalance } = useReadMockVaultBalanceOf({ address: vaultAddress, args: address ? [address as `0x${string}`] : undefined })
    const {data: symbolVault} = useReadMockVaultSymbol({address: vaultAddress});

    // 2. Write Contract Hooks
    const { mutate: approveToken, data: approveHash, isPending: isApprovePending, error: errorApprove } = useWriteMockErc20Approve();
    const { mutate: depositVault, data: depositHash, isPending: isDepositPending, error: errorVaultDeposit } = useWriteMockVaultDeposit();
    const { mutate: redeemVault, data: redeemHash, isPending: isRedeemPending, error: errorVaultRedeem } = useWriteMockVaultRedeem();

    const {isSuccess: isApproveSuccess} = useWaitForTransactionReceipt({hash: approveHash});
    const {isSuccess: isDepositSuccess} = useWaitForTransactionReceipt({hash: depositHash});
    const {isSuccess: isRedeemSuccess} = useWaitForTransactionReceipt({hash: redeemHash});

    useWeb3Toast({
        txhash: approveHash,
        isPending: isApprovePending,
        error: errorApprove,
        actionName: "Approve Token"
    })

    useWeb3Toast({
        txhash: depositHash,
        isPending: isDepositPending,
        error: errorVaultDeposit,
        actionName: "Deposit Token"
    })

    useWeb3Toast({
        txhash: redeemHash,
        isPending: isRedeemPending,
        error: errorVaultRedeem,
        actionName: "Redeem Shares"
    })

    useEffect(() => {
        if(isDepositSuccess){
            refetchTotalAssets();
            refetchBalance();
            refetchAllowance();
            refetchVaultBalance();
            setDepositAmount('');
        }
    }, [isDepositSuccess, refetchTotalAssets, refetchBalance, refetchAllowance, refetchVaultBalance])

    useEffect(() => {
        if (isApproveSuccess) refetchAllowance().then(() => depositVault({
            address: vaultAddress,
            args: [parsedAmount, address as `0x${string}`],
            chainId: chainId as number,
        }))
    }, [isApproveSuccess])

    const parsedAmount = depositAmount ? parseEther(depositAmount) : BigInt(0)
    const needsApproval = allowance  !== undefined && allowance < parsedAmount;
    const getButtonTextDeposit = () => {
        if(isApprovePending) return 'Approving...';
        if(isDepositPending) return 'Depositing...';
        if(needsApproval) return 'Approve';
        return 'Deposit';
    }
    const isLoading = isApprovePending || isDepositPending;
    const isButtonDisabled = isLoading || !depositAmount || parsedAmount === BigInt(0)
    const handleApproveAndDeposit = () => {
        if (!depositAmount) return;

        if(needsApproval){
            approveToken({
                address: usdcm,
                args: [vaultAddress , parsedAmount],
                chainId: chainId as number
            });
        }else {
            depositVault({
                address: vaultAddress,
                args: [parsedAmount, address as `0x${string}`],
                chainId: chainId as number,
            });
        }
    };


    const parsedShares = redeemShares ? parseEther(redeemShares) : BigInt(0);
    const isButtonRedeemDisabled = isRedeemPending || !redeemShares || parsedShares === BigInt(0);
    const handleRedeem = () => {
        if (!redeemShares) return;
        redeemVault({
            address: vaultAddress,
            args: [parsedShares, address as `0x${string}`, address as `0x${string}`],
            chainId: chainId as number
        });
    };

    useEffect(() => {
        if(isRedeemSuccess){
            refetchTotalAssets();
            refetchBalance();
            refetchVaultBalance();
            setRedeemShares('')
        }
    }, [isRedeemSuccess, refetchTotalAssets, refetchBalance, refetchVaultBalance]);

    if (!isConnected) {
        return <div className="p-6 text-center text-gray-500">Please connect your wallet first to access Vault.</div>;
    }

    return (
        <div className="mt-5 p-4 bg-neutral-900 rounded-lg text-white">
            <h2 className="text-lg font-semibold mb-2">ERC-4626 Vault Dashboard</h2>

            {/* Vault Stats */}
            <div className="grid grid-cols-3 gap-4 bg-neutral-900 p-4 rounded-lg">
                <div>
                    <p className="text-sm text-gray-500">Total Vault Assets</p>
                    <p className="text-lg font-semibold">{totalAssets ? formatEther(totalAssets) : '0'} {symbolAsset}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Your Token Balance</p>
                    <p className="text-lg font-semibold">{userBalance ? formatEther(userBalance) : '0'} {symbolAsset}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Your Vault Balance</p>
                    <p className="text-lg font-semibold">{userVaultBalance ? formatEther(userVaultBalance) : '0'} {symbolVault}</p>
                </div>
            </div>

            {/* Deposit Section */}
            <div className="space-y-3 mb-3">
                <h3 className="font-sm text-gray-500">Deposit Assets</h3>
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        placeholder="Amount to depositing"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        onWheel={(e) => e.currentTarget.blur()}
                        className="px-3 py-2 w-full bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none focus:border-blue-500 font-mono text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        onClick={handleApproveAndDeposit}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 text-white font-medium rounded transition cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                        disabled={isButtonDisabled}
                    >
                        {getButtonTextDeposit()}
                    </button>
                </div>
            </div>

            {/* Redeem Section */}
            <div className="space-y-3 mb-3">
                <h3 className="font-sm text-gray-500">Redeem Shares</h3>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Amount shares to redeeming"
                        value={redeemShares}
                        onChange={(e) => setRedeemShares(e.target.value)}
                        onWheel={(e) => e.currentTarget.blur()}
                        className="px-3 py-2 w-full bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none focus:border-blue-500 font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                        onClick={handleRedeem}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 text-white font-medium rounded transition cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                        disabled={isButtonRedeemDisabled}
                    >
                        {isRedeemPending ? "Redeeming" : "Redeem"}
                    </button>
                </div>
            </div>
        </div>
    );
}