// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "@forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MockERC20} from "@src/MockERC20.sol";

contract TestMockERC20 is Test {
    MockERC20 _erc20Contract;

    function setUp() public {
        string memory rpc = vm.envOr("RPC_URL", string(""));
        vm.createSelectFork(rpc);
    }

    function test_deploy() public {
        _erc20Contract = new MockERC20("USD Coin Test", "USDC", 1_000_000);
        IERC20(address(_erc20Contract)).balanceOf(address(this));
    }
}