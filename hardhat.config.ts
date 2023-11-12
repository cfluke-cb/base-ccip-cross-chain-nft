require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

const ETHEREUM_SEPOLIA_RPC_URL = process.env.ETHEREUM_SEPOLIA_RPC_URL;
const OPTIMISM_GOERLI_RPC_URL = process.env.OPTIMISM_GOERLI_RPC_URL;
const AVALANCHE_FUJI_RPC_URL = process.env.AVALANCHE_FUJI_RPC_URL;
const BASE_GOERLI_PRC_URL = process.env.BASE_GOERLI_PRC_URL;
const mnemonic = process.env.MNEMONIC ?? "";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5",
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    ethereumSepolia: {
      url:
        ETHEREUM_SEPOLIA_RPC_URL !== undefined ? ETHEREUM_SEPOLIA_RPC_URL : "",
      accounts: {
        mnemonic,
      },
      chainId: 11155111,
    },
    optimismGoerli: {
      url: OPTIMISM_GOERLI_RPC_URL !== undefined ? OPTIMISM_GOERLI_RPC_URL : "",
      accounts: {
        mnemonic,
      },
      chainId: 420,
    },
    avalancheFuji: {
      url: AVALANCHE_FUJI_RPC_URL !== undefined ? AVALANCHE_FUJI_RPC_URL : "",
      accounts: {
        mnemonic,
      },
      chainId: 43113,
    },
    baseGoerli: {
      url: BASE_GOERLI_PRC_URL !== undefined ? BASE_GOERLI_PRC_URL : "",
      accounts: {
        mnemonic,
      },
      chainId: 84531,
      gasPrice: 1000000000,
      verify: {
        etherscan: {
          apiUrl: "https://api-goerli.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY",
        },
      },
    },
  },
  etherscan: {
    apiKey: {
      baseGoerli: "PLACEHOLDER_STRING",
    },
    customChains: [
      {
        network: "baseGoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org",
          browserURL: "https://goerli.basescan.org",
        },
      },
    ],
  },
};

export default config;
