const Web3 = require("web3");
require("dotenv").config();
const contractJson = require("../artifacts/contracts/BoredApePunkClub.sol/BoredApePunkClub.json");
async function listenBoredApe() {
  // console.log("ebv", process.env);
  try {
    var web3 = new Web3(
      new Web3.providers.WebsocketProvider(process.env.INFURA_MAINNET_WSS_URL)
    );
    console.log("connected");

    const boredApe = new web3.eth.Contract(
      contractJson.abi,
      "0x8d4B648F7fAB1c72d1690b42693fb7525ce3025e"
    );
    console.log("evnts", boredApe.events);
    await boredApe.getPastEvents("Transfer", {}, function (error, events) {
      console.log("transfer", events);
    });
    boredApe.getPastEvents("Approval", {}, function (error, events) {
      console.log("Approval", events);
    });
    boredApe.events
      .Transfer({})
      .on("data", transfer)
      .on("error", console.error);
    console.log("listening transfer event");
    function transfer(e) {
      console.log(
        "evt",
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        e.event,
        e.logIndex,
        e.returnValues.from,
        e.returnValues.to,
        e.returnValues.tokenId
      );
    }
    boredApe.events
      .Approval({})
      .on("data", approval)
      .on("error", console.error);
    console.log("listening Approval event");
    function approval(e) {
      console.log(
        "evt",
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        e.event,
        e.logIndex,
        e.returnValues.owner,
        e.returnValues.approved,
        e.returnValues.tokenId
      );
    }
  } catch (error) {
    console.log("err", error);
  }
}
listenBoredApe();
