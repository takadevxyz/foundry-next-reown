import { type AppKitNetwork } from '@reown/appkit/networks';
import { networksList } from '@/lib/networks';

// Get projectId from https://cloud.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || 'YOUR_PROJECT_ID';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = networksList;
