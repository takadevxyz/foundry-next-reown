

# Foundry Next Reown Monorepo

A high-performance, production-ready dApp starter kit tailored for custom networks (such as **Kryvora Network Testnet**). Built with Foundry for smart contracts and Next.js 16 (Turbopack) with Wagmi v3, Viem, TanStack Query, and Reown AppKit for the frontend.

## Tech Stack

* **Smart Contracts**: Foundry (`forge`)
* **Framework**: Next.js 16 (App Router, Turbopack)
* **Web3 Libraries**: Wagmi v3, Viem, TanStack Query
* **Wallet Connection**: Reown AppKit
* **Styling**: Tailwind CSS

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
Compile and test your smart contracts inside the contracts directory:
```bash
cd contracts
forge build
forge test -vvvv
```

### Running the Frontend dApp
Start the Next.js development server with Turbopack from the root or inside the frontend folder:
```bash
pnpm --filter frontend dev
```
Open http://localhost:3000 in your browser to view the dApp interface.

## Features
- Custom Chain Support: Configured for Kryvora Network Testnet via explicit RPC transport mapping.
```typescript
frontend/lib/config.ts

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
    kryvora_network_testnet, sepolia // Add new chain here
];
```
- Custom Balance Reader: Overcomes internal Reown indexer gaps for custom chains by reading live balances directly via Wagmi's useBalance.
- Message Signing: Built-in components for wallet signature.
- Optimized Polling: Dynamic block tracking powered by TanStack Query and Wagmi actions.

## License
MIT