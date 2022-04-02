const ethers = require("ethers");
const Web3 = require("web3");

async function main() {
  const mnemonic = await ethers.utils.HDNode.entropyToMnemonic(
    ethers.utils.randomBytes(16)
  );
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  console.log("wallet", wallet);
}

// main();

async function newWallet() {
  Web3.eth.account.enable_unaudited_hdwallet_features();
  account = Web3.eth.account.from_mnemonic("hello john pizza guitar");
  print(account.address);
}
newWallet();
