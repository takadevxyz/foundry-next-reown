import { defineConfig } from '@wagmi/cli';
import { foundry, react } from '@wagmi/cli/plugins';

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
