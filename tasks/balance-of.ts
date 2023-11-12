import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getProviderRpcUrl } from "./utils";
import { providers } from "ethers";
import { GameNFT, GameNFT__factory } from "../typechain-types";
import { Spinner } from "../utils/spinner";

task("balance-of", "Gets the balance of GameNFTs for provided address")
  .addParam(`gameNft`, `The address of the GameNFT smart contract`)
  .addParam(
    `blockchain`,
    `The blockchain where the GameNFT smart contract was deployed`
  )
  .addParam(`owner`, `The address to check the balance of GameNFTs`)
  .setAction(async (taskArguments: TaskArguments) => {
    const rpcProviderUrl = getProviderRpcUrl(taskArguments.blockchain);
    const provider = new providers.JsonRpcProvider(rpcProviderUrl);

    const spinner: Spinner = new Spinner();

    const GameNFT: GameNFT = GameNFT__factory.connect(
      taskArguments.GameNFT,
      provider
    );

    console.log(
      `ℹ️  Attempting to check the balance of GameNFTs (${taskArguments.GameNFT}) for the ${taskArguments.owner} account`
    );
    spinner.start();

    const balanceOf = await GameNFT.balanceOf(taskArguments.owner);

    spinner.stop();
    console.log(
      `ℹ️  The balance of GameNFTs of the ${
        taskArguments.owner
      } account is ${balanceOf.toNumber()}`
    );
  });
