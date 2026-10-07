// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "@forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";
import {MockERC20} from "@src/MockERC20.sol";
import {MockVault} from "@src/MockVault.sol";

contract TestMockERC20 is Test {
    MockERC20 _erc20Contract;
    MockVault _vaultContract;

    function setUp() public {
        string memory rpc = vm.envOr("RPC_URL", string(""));
        vm.createSelectFork(rpc);

        _erc20Contract = new MockERC20("USD Coin Test", "USDC", 1_000_000);
        IERC20(address(_erc20Contract)).balanceOf(address(this));

        _vaultContract = new MockVault("USD Yield Test", "USDY", _erc20Contract);
    }

    function test_execute() public {
        IERC20(address(_erc20Contract)).approve(address(_vaultContract), 20e18);

        uint256 shares = _vaultContract.deposit(10e18, address(this));
        _vaultContract.simulateYield(5e18);
        
        uint256 assets = _vaultContract.redeem(shares, address(this), address(this));
        console.log(shares, assets);
    }
}