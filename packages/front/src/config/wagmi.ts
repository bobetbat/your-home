import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http, createConfig } from 'wagmi'
import { hardhat, mainnet, sepolia } from 'wagmi/chains'



export const config = getDefaultConfig({
  appName: 'ZKEstate',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  chains: [mainnet, sepolia, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    // [hardhat.id]: http(),
  },
})
