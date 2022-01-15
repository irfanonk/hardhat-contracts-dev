const { ethers } = require("ethers");
require("dotenv").config();
const contractJson = require("../artifacts/contracts/OpenSea.sol/ExchangeCore.json");
async function listenExCore() {
  // console.log("ebv", process.env);
  try {
    const provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_PK
    );
    const wallet = new ethers.Wallet(process.env.ACCOUNT_PK, provider);
    console.log("wallet", wallet.address);
    const exCore = new ethers.Contract(
      "0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b",
      contractJson.abi,
      wallet
    );
    console.log("excore", exCore.address);
    // exCore.connect();

    exCore.on("OrdersMatched", matched);
    function matched(a, b, c, d, e, f) {
      console.log(
        "evt",
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        a,
        b,
        c,
        d,
        e,
        f
      );
    }
  } catch (error) {
    console.log("err", error);
  }
}
listenExCore();
