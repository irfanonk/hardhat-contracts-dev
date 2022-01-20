const { ethers } = require("ethers");
require("dotenv").config();
const contractJson = require("../artifacts/contracts/BoredApePunkClub.sol/BoredApePunkClub.json");
async function listenboredApe() {
  // console.log("ebv", process.env);
  try {
    const provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_PK
    );
    const wallet = new ethers.Wallet(process.env.ACCOUNT_PK, provider);
    console.log("wallet", wallet.address);
    const boredApe = new ethers.Contract(
      "0x8d4B648F7fAB1c72d1690b42693fb7525ce3025e",
      contractJson.abi,
      wallet
    );
    // console.log("boredApe", boredApe.address);
    // boredApe.connect();

    boredApe.on("Transfer", transfer);
    function transfer(a, b, c, d) {
      console.log(
        "evt",
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        "a",
        a,
        "b",
        b,
        "c",
        c,
        "d",
        d,
        "e"
      );
    }
  } catch (error) {
    console.log("err", error);
  }
}
listenboredApe();
