import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const projectId = '56959faf83f27a7194ccfe06af3e4458' // to .env after

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({ projectId, showQrModal: false }),
    coinbaseWallet({ appName: 'DAPP WALLECT CONNECTOR' })
  ],
})
