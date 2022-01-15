const hre = require("hardhat"); //import the hardhat
const { ethers } = require("ethers");
async function listenExCore() {
  try {
    // const campaign = await hre.ethers.getContractAt(
    //   "Campaign",
    //   "0x34F84c90c8CADE3995EC2256b4060007260c2238"
    // );
    // // console.log("summ", await campaign.getSummary());
    // campaign.on("NewContribution", newCont);
    // function newCont(evt) {
    //   console.log("evt", evt);
    // }
    // const count = campaign.listenerCount(["NewContribution"]);
    // console.log("count", count);
    const exCore = await hre.ethers.getContractAt(
      "ExchangeCore",
      "0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b"
    );
    // console.log("summ", await campaign.getSummary());
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
async function listenCampaign() {
  try {
    const campaign = await hre.ethers.getContractAt(
      "Campaign",
      "0x34F84c90c8CADE3995EC2256b4060007260c2238"
    );
    // console.log("summ", await campaign.getSummary());
    campaign.on("NewContribution", newCont);
    function newCont(a, b) {
      console.log("evt", a, b);
    }
  } catch (error) {
    console.log("err", error);
  }
}

// listenCampaign();
