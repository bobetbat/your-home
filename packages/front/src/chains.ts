import type { Chain } from 'wagmi/chains'

export const srcollAlfaTestnet: Chain = {
  id: 534353,
  name: 'Scroll Alfa Testnet',
  network: '',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://alpha-rpc.scroll.io/l2']
    },
    public: {
      http: ['https://alpha-rpc.scroll.io/l2']
    }
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://blockscout.scroll.io/'
    }
  }
}

export const OptimismTestnet: Chain = {
  id: 420,
  name: 'Optimism Testnet',
  network: '',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://goerli.optimism.io']
    },
    public: {
      http: ['https://goerli.optimism.io']
    }
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://blockscout.scroll.io/'
    }
  }
}

export const polygonZkEvmTestnet: Chain = {
  id: 1442,
  name: 'Polygon zkEVM Testnet',
  network: '',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.public.zkevm-test.net']
    },
    public: {
      http: ['https://rpc.public.zkevm-test.net']
    }
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://explorer.public.zkevm-test.net'
    }
  }
}
export const gerliTestnet: Chain = {
  id: 5,
  name: 'Görli Testnet',
  network: 'Görli',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://endpoints.omniatech.io/v1/eth/goerli/public']
    },
    public: {
      http: ['https://endpoints.omniatech.io/v1/eth/goerli/public']
    }
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://blockscout.com/eth/goerli'
    }
  }
}

export const localTestnet: Chain = {
  id: 31337,
  name: 'Local Testnet',
  network: 'hardhat',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545']
    },
    public: {
      http: ['http://localhost:8545']
    }
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://blockscout.com/eth/goerli'
    }
  }
}
export const chiadoTestnet: Chain = {
  id: 10200,
  name: 'Chiado Testnet (XDAI)',
  network: 'Gnosis',
  nativeCurrency: {
    name: 'XDAI',
    symbol: 'XDAI',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.chiadochain.net']
    },
    public: {
      http: ['https://rpc.chiadochain.net']
    }
  },
  blockExplorers: {
    default: {
      name: 'blockscout',
      url: 'https://blockscout.com/gnosis/chiado'
    }
  }
}
