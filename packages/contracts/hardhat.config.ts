import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//TODO: Add more networks
//TODO: Add network RPC URLs to the .env file
//TODO: Add private key to the .env file
import dotenv from 'dotenv';

dotenv.config();


const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY_2 ?? ""]
    },
    hardhat: {
      // See its defaults
    }
    // goerliTestnet: {
    //   url: process.env.GOERLI_TESTNET_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 5,
    // },
    // polygonZkEvmTestnet: {
    //   url: process.env.POLYGON_ZKEVM_TESTNET_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 1442,
    // },
    // scrollTestnet: {
    //   url: process.env.SCROLL_ALFA_TESTNET_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 534353,
    // },
    // gnosis: {
    //   url: process.env.GNOSIS_MAINNET_RPS_URL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 100,
    // },
    // gnosisTestnet: {
    //   url: process.env.GNOSIS_CHIADO_TESTNET_RPS_URL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 10200,
    // },
    // optimismTestnet: {
    //   url: process.env.OP_GOERLI_TESTNET_PRC_UTL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 420,
    // },
    // optimism: {
    //   url: process.env.OP_MAINNET_PRC_UTL,
    //   accounts: [process.env.PRIVATE_KEY ?? ""],
    //   chainId: 10,
    // }

  },
  solidity: "0.8.1",
};

export default config;
