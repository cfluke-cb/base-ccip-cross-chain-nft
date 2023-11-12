import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl } from "./utils";
import { Wallet, providers } from "ethers";
import { Spinner } from "../utils/spinner";
import { Withdraw, Withdraw__factory } from "../typechain-types";

task(
  `withdraw`,
  `Withdraws tokens and coins from Withdraw.sol. Must be called by an Owner, otherwise it will revert`
)
  .addParam(
    `blockchain`,
    `The name of the blockchain (for example ethereumSepolia)`
  )
  .addParam(
    `from`,
    `The address of the Withdraw.sol smart contract from which funds should be withdrawn`
  )
  .addOptionalParam(`beneficiary`, `The address to withdraw to`)
  .addOptionalParam(`tokenAddress`, `The address of a token to withdraw`)
  .setAction(async (taskArguments: TaskArguments) => {
    const { blockchain, from, beneficiary, tokenAddress } = taskArguments;

    const privateKey = getPrivateKey();
    const rpcProviderUrl = getProviderRpcUrl(blockchain);

    const provider = new providers.JsonRpcProvider(rpcProviderUrl);
    const wallet = Wallet.fromMnemonic(privateKey); // new Wallet(privateKey);
    const signer = wallet.connect(provider);
    const receiver = beneficiary || wallet.address;

    const withdraw: Withdraw = Withdraw__factory.connect(from, signer);

    const spinner: Spinner = new Spinner();

    if (tokenAddress) {
      console.log(
        `ℹ️  Attempting to withdraw ${tokenAddress} tokens from ${from} to ${receiver}`
      );
      spinner.start();

      const withdrawalTx = await withdraw.withdrawToken(receiver, tokenAddress);
      await withdrawalTx.wait();

      spinner.stop();
      console.log(
        `✅ Withdrawal successful, transaction hash: ${withdrawalTx.hash}`
      );
    } else {
      console.log(
        `ℹ️  Attempting to withdraw coins from ${from} to ${receiver}`
      );
      spinner.start();

      const withdrawalTx = await withdraw.withdraw(receiver);
      await withdrawalTx.wait();

      spinner.stop();
      console.log(
        `✅ Withdrawal successful, transaction hash: ${withdrawalTx.hash}`
      );
    }
  });
