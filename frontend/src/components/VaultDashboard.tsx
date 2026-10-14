import React, { useState } from 'react';
import {
    useReadMockVaultTotalAssets,
    useReadMockVaultConvertToShares,
    useWriteMockVaultDeposit,
    useWriteMockVaultRedeem,
    useSimulateMockVaultDeposit
} from '@/lib/generated/MockVault';
import {
    useReadMockErc20BalanceOf,
    useWriteMockErc20Approve,
    useSimulateMockErc20Approve
} from '@/lib/generated/MockERC20';
import { useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { getContractAddresses } from '@/lib/contracts';

export function VaultDashboard() {
    const { address, isConnected } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
    const [depositAmount, setDepositAmount] = useState('');
    const [redeemShares, setRedeemShares] = useState('');

    // 1. Read Contract Data
    const { data: totalAssets, refetch: refetchTotalAssets } = useReadMockVaultTotalAssets();
    const { data: userBalance, refetch: refetchBalance } = useReadMockErc20BalanceOf({
        args: address ? [address as `0x${string}`] : undefined,
    });

    // 2. Write Contract Hooks
    const { writeContract: approveToken } = useWriteMockErc20Approve();
    const { writeContract: depositVault } = useWriteMockVaultDeposit();
    const { mutate: redeemVault } = useWriteMockVaultRedeem();

    if (!isConnected) {
        return <div className="p-6 text-center text-gray-500">Please connect your wallet first to access Vault.</div>;
    }

    const vaultAddress = getContractAddresses({ chainId: chainId as number, key: "vault"});
    const usdcm = getContractAddresses({chainId: chainId as number, key: "usdcm"});

    const handleApproveAndDeposit = async () => {
        if (!depositAmount) return;
        const parsedAmount = parseEther(depositAmount);

        approveToken({
            address: usdcm,
            args: [vaultAddress , parsedAmount],
        }, {
            onSuccess: () => {
                depositVault({
                    address: vaultAddress,
                    args: [parsedAmount, address as `0x${string}`],
                }, {
                    onSuccess: () => {
                        refetchTotalAssets();
                        refetchBalance();
                        setDepositAmount('');
                    }
                });
            }
        });
    };

    const handleRedeem = () => {
        if (!redeemShares) return;
        const parsedShares = parseEther(redeemShares);

        redeemVault({
            address: vaultAddress,
            args: [parsedShares, address as `0x${string}`, address as `0x${string}`],
        }, {
            onSuccess: () => {
                refetchTotalAssets();
                refetchBalance();
                setRedeemShares('');
            }
        });
    };

    return (
        <div className="mt-5 p-4 bg-neutral-900 rounded-lg text-white">
            <h2 className="text-lg font-semibold mb-2">ERC-4626 Vault Dashboard</h2>

            {/* Vault Stats */}
            <div className="grid grid-cols-2 gap-4 bg-neutral-900 p-4 rounded-lg">
                <div>
                    <p className="text-sm text-gray-500">Total Vault Assets</p>
                    <p className="text-lg font-semibold">{totalAssets ? formatEther(totalAssets) : '0'} MOCK</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Your Token Balance</p>
                    <p className="text-lg font-semibold">{userBalance ? formatEther(userBalance) : '0'} MOCK</p>
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
                        className="px-3 py-2 w-full bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none focus:border-blue-500 font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                        onClick={handleApproveAndDeposit}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 text-white font-medium rounded transition cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        Deposit
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
                        className="px-3 py-2 w-full bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none focus:border-blue-500 font-mono text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                        onClick={handleRedeem}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-700 text-white font-medium rounded transition cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        Redeem
                    </button>
                </div>
            </div>
        </div>
    );
}