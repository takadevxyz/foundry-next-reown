// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Test, console} from "@forge-std/Test.sol";
import {UniswapV2Factory} from "@uniswap-v2-core/UniswapV2Factory.sol";
import {MockERC20} from "@src/MockERC20.sol";
import {IUniswapV2Pair} from "@uniswap-v2-core/interfaces/IUniswapV2Pair.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {UniswapV2Router02} from "@src/v2-periphery/contracts/UniswapV2Router02.sol";
import {UniswapV2Pair} from "@uniswap-v2-core/UniswapV2Pair.sol";
import {UniswapV2Library} from "@uniswap-v2-periphery/libraries/UniswapV2Library.sol";

contract UniswapV2Test is Test {
    using SafeERC20 for IERC20;

  UniswapV2Factory v2Factory;
  MockERC20 tokenA;
  MockERC20 tokenB;
  MockERC20 WETH_MOCK;
  UniswapV2Router02 routerV2_02;

  address pair;
  address token0;
  address token1;

  uint256 tokenADeposited = 500e18;
  uint256 tokenBDeposited = 1_000e18;
  uint256 slippageBps = 50; // 0.5%
  uint256 maksBPs = 10_000; // 100%

  error InsufficientBalance();

  function setUp() public {
    string memory rpc = vm.envOr("RPC_URL", string(""));
    vm.createSelectFork(rpc);
    v2Factory = new UniswapV2Factory(address(this));
    v2Factory.setFeeTo(msg.sender);

    tokenA = new MockERC20("tokenA", "TKA", 1_000_000);
    tokenB = new MockERC20("tokenB", "TKB", 1_000_000);
    WETH_MOCK = new MockERC20("WETH", "WETH", 1_000_000);
    pair = v2Factory.createPair(address(tokenA), address(tokenB));
    bytes32 pairHash = keccak256(type(UniswapV2Pair).creationCode);
    console.logBytes32(pairHash);

    routerV2_02 = new UniswapV2Router02(address(v2Factory), address(WETH_MOCK));

    token0 = IUniswapV2Pair(pair).token0();
    token1 = IUniswapV2Pair(pair).token1();
  }

  function test_swap_without_router() public {
    v2Factory.feeTo();
    v2Factory.feeToSetter();
    IUniswapV2Pair(pair).balanceOf(msg.sender);

    _addLiquidity_without_router(
      tokenA,
      tokenB,
      tokenADeposited,
      tokenBDeposited,
      pair
    );

    // Test Swap Without Router
    _test_swap_without_router(token1, 10e18);

    // Action add/remove LP to trigger mintFee
    _addLiquidity_without_router(
      tokenA,
      tokenB,
      tokenADeposited,
      tokenBDeposited,
      pair
    );

    IUniswapV2Pair(pair).balanceOf(msg.sender);
  }

  function test_swap_with_router() public {
    v2Factory.feeTo();
    v2Factory.feeToSetter();
    IUniswapV2Pair(pair).balanceOf(msg.sender);

    _addLiquidity_with_router(
      tokenA,
      tokenB,
      tokenADeposited,
      tokenBDeposited,
      address(this)
    );

    // Test Swap With Router
    _test_swap_with_router(token1, 10e18);

    // Action add/remove LP to trigger mintFee
    _addLiquidity_with_router(
      tokenA,
      tokenB,
      tokenADeposited,
      tokenBDeposited,
      address(this)
    );

    IUniswapV2Pair(pair).balanceOf(msg.sender);
  }

  function _test_swap_with_router(
    address _tokenIn,
    uint256 _amountIn
  ) internal returns (uint[] memory amounts) {
    (uint112 reserve0, uint112 reserve1, ) = IUniswapV2Pair(pair).getReserves();
    (uint reserveIn, uint reserveOut) = (_tokenIn == token0)
      ? (reserve0, reserve1)
      : (reserve1, reserve0);

    if (IERC20(_tokenIn).balanceOf(address(this)) < _amountIn)
      revert InsufficientBalance();
    SafeERC20.forceApprove(IERC20(_tokenIn), address(routerV2_02), _amountIn);

    uint256 amountOutMin =
      (UniswapV2Library.getAmountOut(_amountIn, reserveIn, reserveOut) *
        (maksBPs - slippageBps)) / maksBPs;

    address[] memory path = new address[](2);
    (path[0], path[1]) =
      (_tokenIn == token0) ? (token0, token1) : (token1, token0);
    uint256 deadline = block.timestamp + 1200; // 20 Minutes

    amounts = routerV2_02.swapExactTokensForTokens(
      _amountIn,
      amountOutMin,
      path,
      address(this),
      deadline
    );
  }

  function _addLiquidity_with_router(
    ERC20 _tokenA,
    ERC20 _tokenB,
    uint256 _Aamount,
    uint256 _Bamount,
    address _to
  ) internal returns (uint amountA, uint amountB, uint liquidity) {
    if (_tokenA.balanceOf(address(this)) < _Aamount)
      revert InsufficientBalance();
    if (_tokenB.balanceOf(address(this)) < _Bamount)
      revert InsufficientBalance();

    uint256 deadline = block.timestamp + 1200; // 20 Minutes
    SafeERC20.forceApprove(_tokenA, address(routerV2_02), _Aamount);
    SafeERC20.forceApprove(_tokenB, address(routerV2_02), _Bamount);

    (uint256 reserveA, uint256 reserveB) = UniswapV2Library.getReserves(
      address(v2Factory),
      address(_tokenA),
      address(_tokenB)
    );
    uint256 amountAMin;
    uint256 amountBMin;

    if (reserveA == 0 && reserveB == 0) {
      amountAMin = (_Aamount * (maksBPs - slippageBps)) / maksBPs;
      amountBMin = (_Bamount * (maksBPs - slippageBps)) / maksBPs;
    } else {
      uint256 optimalB = UniswapV2Library.quote(_Aamount, reserveA, reserveB);
      if (optimalB <= _Bamount) {
        amountAMin = (_Aamount * (maksBPs - slippageBps)) / maksBPs;
        amountBMin = (optimalB * (maksBPs - slippageBps)) / maksBPs;
        _Bamount = optimalB;
      } else {
        uint256 optimalA = UniswapV2Library.quote(_Bamount, reserveB, reserveA);
        amountAMin = (optimalA * (maksBPs - slippageBps)) / maksBPs;
        amountBMin = (_Bamount * (maksBPs - slippageBps)) / maksBPs;
        _Aamount = optimalA;
      }
    }
    (amountA, amountB, liquidity) = routerV2_02.addLiquidity(
      address(_tokenA),
      address(_tokenB),
      _Aamount,
      _Bamount,
      amountAMin,
      amountBMin,
      _to,
      deadline
    );
  }

  function _addLiquidity_without_router(
    ERC20 _tokenA,
    ERC20 _tokenB,
    uint256 _Aamount,
    uint256 _Bamount,
    address _pair
  ) internal {
    SafeERC20.safeTransfer(_tokenA, _pair, _Aamount);
    SafeERC20.safeTransfer(_tokenB, _pair, _Bamount);

    IUniswapV2Pair(_pair).mint(address(this));
  }

  function _test_swap_without_router(
    address _tokenIn,
    uint256 _amountIn
  ) internal returns (uint256 _amountOut) {
    (uint112 reserve0, uint112 reserve1, ) = IUniswapV2Pair(pair).getReserves();
    (uint reserveIn, uint reserveOut) = (_tokenIn == token0)
      ? (reserve0, reserve1)
      : (reserve1, reserve0);

    if (IERC20(_tokenIn).balanceOf(address(this)) < _amountIn)
      revert InsufficientBalance();
    SafeERC20.safeTransfer(IERC20(_tokenIn), pair, _amountIn);

    _amountOut = UniswapV2Library.getAmountOut(_amountIn, reserveIn, reserveOut);

    (uint256 amount0Out, uint256 amount1Out) = (_tokenIn == token0)
      ? (uint256(0), _amountOut)
      : (_amountOut, uint256(0));

    IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), "");
  }
}