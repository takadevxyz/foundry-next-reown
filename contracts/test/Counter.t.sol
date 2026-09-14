// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "@forge-std/Test.sol";
import {Counter} from "@src/Counter.sol";

contract CounterTest is Test {
  Counter _counter;

  function setUp() public {
    string memory rpc = vm.envOr("RPC_URL", string(""));
    vm.createSelectFork(rpc);
  }

  function test_deploy() public {
    _counter = new Counter();

    _counter.setNumber(100);
    _counter.number();
  }
}
