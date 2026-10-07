import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const contractsDir = '../contracts'
const names = ['MockVault', 'MockERC20', 'Counter']

export default defineConfig(
  names.map((name) => {
    const artifact = JSON.parse(
      readFileSync(join(contractsDir, 'out', `${name}.sol`, `${name}.json`), 'utf-8'),
    )

    return {
      out: `./src/lib/generated/${name}.ts`,
      contracts: [{ name, abi: artifact.abi }],
      plugins: [react()],
    }
  }),
)