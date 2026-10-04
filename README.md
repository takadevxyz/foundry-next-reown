# Foundry Next Reown Monorepo

A high-performance, production-ready dApp starter kit tailored for custom networks (such as **Kryvora Network Testnet**). Built with Foundry for smart contracts and Next.js 16 (Turbopack) with Wagmi v3, Viem, TanStack Query, and Reown AppKit for the frontend.

## Tech Stack

- **Smart Contracts**: Foundry (`forge`)
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Web3 Libraries**: Wagmi v3, Viem, TanStack Query
- **Wallet Connection**: Reown AppKit
- **Styling**: Tailwind CSS

---

## Repository Structure

```text
.
├── contracts/          # Foundry smart contract workspace (Counter.sol, scripts, tests)
├── frontend/           # Next.js 16 dApp interface & Web3 components
├── foundry.toml        # Global Foundry configuration
├── package.json        # Root workspace scripts
└── pnpm-workspace.yaml # Monorepo configuration
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [NodeJS v18+](https://nodejs.org/en)
- [pnpm](https://pnpm.io)
- [foundry (forge, cast, anvil)](https://www.getfoundry.sh)

### 1. Installation

Clone the repository and install all monorepo dependencies:

```bash
git clone https://github.com/takadevxyz/foundry-next-reown.git
cd foundry-next-reown
pnpm install
git submodule update --init --recursive
```

### 2. Environment Setup

Navigate to the frontend directory and create a local environment configuration file:

```bash
cd frontend
cp .env.example .env.local
```

Open .env.local and configure your Reown Project ID:

```bash
# Get projectId from https://dashboard.walletconnect.com
NEXT_PUBLIC_PROJECT_ID=<YOUR_PROJECT_ID_HERE>
```

## Development

### Running Smart Contracts (Foundry)

On root folder

```bash
cp .env.example .env
```

Open .env and configure your RPC:

```bash
#Example https://rpc-testnet.kryvora.network for kryvora testnet
RPC_URL=<URL_RPC_HERE>
```

Compile and test your smart contracts inside the contracts directory:

```bash
cd contracts
forge build
forge test -vvvv
```

### Auto-Generating Type-Safe Web3 Hooks

This project uses `@wagmi/cli` with the foundry plugin to automatically read Foundry artifacts (contracts/out) and generate React hooks in frontend/src/lib/generated.ts.

Whenever you update your Solidity contracts, compile them first and run the codegen command:

```bash
# 1. Recompile contracts
cd contracts && forge build

# 2. Run Wagmi CLI generator (from root or frontend folder)
pnpm --filter frontend wagmi
```

### Running the Frontend dApp

Start the Next.js development server with Turbopack from the root or inside the frontend folder:

```bash
pnpm --filter frontend dev
```

Open http://localhost:3000 in your browser to view the dApp interface.

## Features

- **Custom Chain Support**: Configured for Kryvora Network Testnet via explicit RPC transport mapping.

```typescript
frontend / src / lib / networks.ts;

export const networksList = [kryvora_network_testnet, sepolia, <Add_New_Chain_Here>] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];
```

- **Custom Balance Reader**: Overcomes internal Reown indexer gaps for custom chains by reading live balances directly via Wagmi's useBalance.
- **Message Signing**: Built-in components for wallet signature.
- **Optimized Polling**: Dynamic block tracking powered by TanStack Query and Wagmi actions.
- **Multi-Chain & Fallback RPC Support**: Resilient provider configuration supporting custom RPC fallbacks for testnets and mainnets (Sepolia, Kryvora, etc.).

```typescript
frontend/src/lib/wagmi.ts -> dynamicTransports

if (chainId === 11155111) {
  rpcUrls.push(
    'https://sepolia.gateway.tenderly.co',
    'https://api.zan.top/eth-sepolia',
    // Add_New_RPC_Here
  );
};
```

- **Web3 Notification System (`useWeb3Toast`)**: Real-time lifecycle feedback powered by Sonner for wallet approvals, mempool submissions, block confirmations, and wallet rejections with cross-chain isolation.

```typescript
import { useWeb3Toast } from '@/hooks/useWeb3Toast';

// Automatically handles loading, success (with explorer link), and error/rejection toasts
useWeb3Toast({
  txhash,
  isPending,
  error,
  actionName: 'Increment Counter',
});
```

- **Auto-Generated Contract Hooks**: Type-safe, auto-generated React hooks via `@wagmi/cli` for seamless contract read/write operations and automatic query invalidation.

```typescript
frontend / wagmi.config.ts;

export default defineConfig({
  out: './src/lib/generated.ts',
  contracts: [],
  plugins: [
    foundry({
      project: '../contracts',
      forge: {
        build: false,
      },
      // Explicitly include contracts to generate ABIs & hooks (from contracts/out).
      // Avoids bloat by preventing auto-generation for standard dependencies/libraries.
      include: ['Counter.sol/**'],
    }),
    react(),
  ],
});
```

- **Dynamic Explorer Resolution**: Automated block explorer URL generator based on active network context (`getExplorerTxUrl`).

## Custom Development & Services

Building a custom DeFi Protocol, RWA Dashboard, or Cross-chain Bridge and need an experienced developer to scale this starter kit?
I specialize in Foundry, Next.js, and Reown AppKit integrations. Available for:

- Full-stack dApp Development (Smart Contracts & Frontend)
- Custom Chain / RPC Configuration & Wagmi Setup
- Smart Contract Testing & Hardening (Foundry Suite)
- Web3 UI/UX Optimization & Bug Fixing

### Get in Touch:

- Twitter / X: [takadevxyz](https://x.com/takadevxyz)
- Website: [https://takadevxyz.vercel.app/](https://takadevxyz.vercel.app/)
- Email / Inquiry: Drop a DM on X or open a discussion thread here!

## Support & Sponsorship

If this template saved you hours of setup time, consider supporting the continuous maintenance of this project!

- EVM Tip Jar:

```bash
0x1CCE1ba2a17279Cc90212b9f3B99aeAAB7eB472c
```

- Solana Tip Jar:

```bash
4SfApexfy88UaTKxp25Uxy7KVBNTDE6rjcU4joCSwZJ8
```

- GitHub Sponsors: Star ⭐ this repo & share it with fellow Web3 devs!

## License

MIT
