// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
* @title MockVault
* @dev Simple ERC-4626 Vault implementation for local testing & dApp boilerplate integrations.
*/

contract MockVault is ERC4626 {
    constructor(
        string memory _name,
        string memory _symbol,
        IERC20 _asset
    ) ERC4626(_asset) ERC20(_name, _symbol) {}

    /**
     * @dev Helper function to simulate yield generation for testing purposes.
     * Mints underlying asset directly to the vault to increase share value.
     */
    function simulateYield(uint256 _amount) external {
        IERC20(asset()).transferFrom(_msgSender(), address(this), _amount);
    }
}