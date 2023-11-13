import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, utils, providers } from "ethers";
import {
  SourceMinter,
  SourceMinter__factory,
  EcosystemToken__factory,
  EcosystemToken,
} from "../typechain-types";
import { Spinner } from "../utils/spinner";
import { LINK_ADDRESSES } from "./constants";

task(`deploy-source-minter`, `Deploys SourceMinter.sol smart contract`)
  .addOptionalParam(
    `router`,
    `The address of the Router contract on the source blockchain`
  )
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const routerAddress = taskArguments.router
        ? taskArguments.router
        : getRouterConfig(hre.network.name).address;

      const privateKey = getPrivateKey();
      const rpcProviderUrl = getProviderRpcUrl(hre.network.name);

      const provider = new providers.JsonRpcProvider(rpcProviderUrl);
      const wallet = Wallet.fromMnemonic(privateKey);
      const deployer = wallet.connect(provider);

      const spinner: Spinner = new Spinner();

      const tokenFactory: EcosystemToken__factory =
        (await hre.ethers.getContractFactory(
          "EcosystemToken"
        )) as EcosystemToken__factory;

      console.log(
        `ℹ️  Attempting to deploy EcosystemToken smart contract on the ${hre.network.name} blockchain using ${deployer.address} address as constructor argument`
      );
      spinner.start();

      const token: EcosystemToken = await tokenFactory.deploy(wallet.address);
      await token.deployed();
      spinner.stop();
      console.log(
        `✅ EcosystemToken contract deployed at address ${token.address} on the ${hre.network.name} blockchain`
      );

      const tokenAddr = token.address;

      /*
      const tokenAddr = "0x9e68DbF70B1131194c4D3524faede6991c791dDC";
      const token = tokenFactory.attach(tokenAddr);
*/
      console.log(
        `ℹ️  Attempting to deploy SourceMinter smart contract on the ${hre.network.name} blockchain using ${deployer.address} address, with the Router address ${routerAddress} provided as constructor arguments`
      );
      spinner.start();
      const sourceMinterFactory: SourceMinter__factory =
        (await hre.ethers.getContractFactory(
          "SourceMinter"
        )) as SourceMinter__factory;
      const sourceMinter: SourceMinter = await sourceMinterFactory.deploy(
        routerAddress,
        tokenAddr
      );
      await sourceMinter.deployed();

      await token.approve(sourceMinter.address, utils.parseUnits("5", "ether"));

      spinner.stop();
      console.log(
        `✅ SourceMinter contract deployed at address ${sourceMinter.address} on the ${hre.network.name} blockchain`
      );
    }
  );
