const { ethers, utils } = require("ethers");
require("dotenv").config();
const contractJson = require("../artifacts/contracts/WrappedEther.sol/WETH9.json");
async function listenWrappedEther() {
  // console.log("ebv", process.env);
  try {
    const provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_PK
    );
    const wallet = new ethers.Wallet(process.env.ACCOUNT_PK, provider);
    // console.log("wallet", wallet.address);
    const wrpEther = new ethers.Contract(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      contractJson.abi,
      wallet
    );

    const filter = wrpEther.filters.Transfer(
      "0x8d3c9f4d0a8dbb6d5e2068ac36719290f7988cc1",
      "0x7a250d5630b4cf539739df2c5dacb4c659f2488d"
    );
    let events = await wrpEther.queryFilter(filter);
    console.log("evt", events);
    wrpEther.on(filter, transfer);
    // wrpEther.on("Transfer", transfer);
    function transfer(a, b, c, d, e) {
      console.log(
        "evt",
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        a,
        b,
        c._hex,
        parseInt(c._hex, 16)
      );
    }
  } catch (error) {
    console.log("err", error);
  }
}
listenWrappedEther();
