import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, polygon } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet, metaMask } from 'wagmi/connectors';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [
    injected({ 
      target: 'metaMask',
      shimDisconnect: true,
    }),
    metaMask({
      dappMetadata: {
        name: 'Cosmic Guardians NFT',
        url: 'https://cosmic-guardians-nft-kreggscodes-projects.vercel.app',
      },
    }),
    walletConnect({ 
      projectId,
      showQrModal: true,
      metadata: {
        name: 'Cosmic Guardians NFT',
        description: 'Mint exclusive Cosmic Guardian NFTs',
        url: 'https://cosmic-guardians-nft-kreggscodes-projects.vercel.app',
        icons: ['https://cosmic-guardians-nft-kreggscodes-projects.vercel.app/logo.png'],
      },
    }),
    coinbaseWallet({
      appName: 'Cosmic Guardians NFT',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
});
