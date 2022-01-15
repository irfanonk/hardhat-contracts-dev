const Web3 = require("web3");
require("dotenv").config();
const contractJson = require("../artifacts/contracts/OpenSea.sol/ExchangeCore.json");
async function listenExCore() {
  // console.log("ebv", process.env);
  try {
    var web3 = new Web3(
      new Web3.providers.WebsocketProvider(process.env.INFURA_MAINNET_WSS_URL)
    );
    // const wallet = new ethers.Wallet(process.env.ACCOUNT_PK, provider);
    // console.log("wallet", wallet.address);
    // console.log("web3", web3.eth);
    const exCore = new web3.eth.Contract(
      contractJson.abi,
      "0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b"
    );
    // console.log("excore", exCore.events);
    // exCore.events.OrdersMatched({}, function (error, event) {
    //   console.log(event);
    // });
    exCore.getPastEvents("OrdersMatched", {}, function (error, events) {
      console.log("transfer", events);
      events.forEach((element) => {
        console.log("evt", element.returnValues.price);
      });
    });

    exCore.events
      .OrdersMatched({})
      .on("data", matched)
      .on("error", console.error);
    function matched(e) {
      console.log(
        "evt",
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        e.event,
        e.logIndex,
        e.transactionIndex,
        e.returnValues.price
      );
    }
  } catch (error) {
    console.log("err", error);
  }
}
listenExCore();
