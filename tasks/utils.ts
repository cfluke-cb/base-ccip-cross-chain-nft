import { routerConfig } from "./constants";

export const getProviderRpcUrl = (network: string) => {
  let rpcUrl;

  switch (network) {
    case "ethereumSepolia":
      rpcUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;
      break;
    case "optimismGoerli":
      rpcUrl = process.env.OPTIMISM_GOERLI_RPC_URL;
      break;
    case "arbitrumTestnet":
      rpcUrl = process.env.ARBITRUM_TESTNET_RPC_URL;
      break;
    case "avalancheFuji":
      rpcUrl = process.env.AVALANCHE_FUJI_RPC_URL;
      break;
    case "polygonMumbai":
      rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;
      break;
    case "baseGoerli":
      rpcUrl = process.env.BASE_GOERLI_PRC_URL;
      break;
    default:
      throw new Error("Unknown network: " + network);
  }

  if (!rpcUrl)
    throw new Error(
      `rpcUrl empty for network ${network} - check your environment variables`
    );

  return rpcUrl;
};

export const getPrivateKey = () => {
  const privateKey = process.env.MNEMONIC;

  if (!privateKey)
    throw new Error(
      "private key not provided - check your environment variables"
    );

  return privateKey;
};

export const getRouterConfig = (network: string) => {
  switch (network) {
    case "ethereumSepolia":
      return routerConfig.ethereumSepolia;
    case "optimismGoerli":
      return routerConfig.optimismGoerli;
    case "arbitrumTestnet":
      return routerConfig.arbitrumTestnet;
    case "avalancheFuji":
      return routerConfig.avalancheFuji;
    case "polygonMumbai":
      return routerConfig.polygonMumbai;
    case "baseGoerli":
      return routerConfig.baseGoerli;
    default:
      throw new Error("Unknown network: " + network);
  }
};
