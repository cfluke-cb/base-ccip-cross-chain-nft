export type AddressMap = { [blockchain: string]: string };
export type TokenAmounts = { token: string; amount: string };

export const supportedNetworks = [
  `ethereumSepolia`,
  `optimismGoerli`,
  `arbitrumTestnet`,
  `avalancheFuji`,
  `polygonMumbai`,
  `baseGoerli`,
];

export const routerConfig = {
  ethereumSepolia: {
    address: `0xd0daae2231e9cb96b94c8512223533293c3693bf`,
    chainSelector: `16015286601757825753`,
  },
  optimismGoerli: {
    address: `0xeb52e9ae4a9fb37172978642d4c141ef53876f26`,
    chainSelector: `2664363617261496610`,
  },
  avalancheFuji: {
    address: `0x554472a2720e5e7d5d3c817529aba05eed5f82d8`,
    chainSelector: `14767482510784806043`,
  },
  arbitrumTestnet: {
    address: `0x88e492127709447a5abefdab8788a15b4567589e`,
    chainSelector: `6101244977088475029`,
  },
  polygonMumbai: {
    address: `0x70499c328e1e2a3c41108bd3730f6670a44595d1`,
    chainSelector: `12532609583862916517`,
  },
  baseGoerli: {
    address: `0xa8c0c11bf64af62cdca6f93d3769b88bdd7cb93d`,
    chainSelector: `5790810961207155433`,
  },
};
