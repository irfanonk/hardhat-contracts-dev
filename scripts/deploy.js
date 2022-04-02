const hre = require("hardhat"); //import the hardhat

async function main() {
  // const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  // console.log("Deploying contracts with the account:", deployer.address);

  try {
    // //-- MyNFT

    // const MyNFT = await hre.ethers.getContractFactory("MyNFT"); // Getting the Contract
    // const myNFT = await MyNFT.deploy(); //deploying the contract

    // await myNFT.deployed(); // waiting for the contract to be deployed
    // console.log("MyNFT deployed to:", myNFT.address);

    // //-- Date

    const Date = await hre.ethers.getContractFactory("Date"); // Getting the Contract
    const date = await Date.deploy(); //deploying the contract

    await date.deployed(); // waiting for the contract to be deployed
    console.log("date deployed to:", date.address);

    //-- Token

    // const Token = await hre.ethers.getContractFactory("StreetFightersToken"); // Getting the Contract
    // const token = await Token.deploy(); //deploying the contract

    // await token.deployed(); // waiting for the contract to be deployed
    // console.log(" deployed to:", token.address, await token.name());

    //--- campaign--
    // const CampaignFac = await hre.ethers.getContractFactory("CampaignFactory"); // Getting the Contract
    // const campaignFac = await CampaignFac.deploy(); //deploying the contract

    // await campaignFac.deployed(); // waiting for the contract to be deployed
    // console.log("CampaignFac deployed to:", campaignFac.address);

    // campaignFac.on("NewCampaign", listenEvent);
    // function listenEvent(a, b, c, d) {
    //   console.log("evt", a, b, c, d);
    // }

    // await campaignFac.createCampaign("irfan", "for irf", 2500);
    // console.log("campaignFac", campaignFac.events);
    // const getDeployedCamp = await campaignFac.getDeployedCampaign();
    // console.log("getDeployedCamp", getDeployedCamp);
    // campaignFac.events.NewCampaign({}).on('data',function (event) {
    //   console.log('new camp created',event);
    // })
  } catch (error) {
    console.log("err", error);
  }
}

main()
  .then(() => console.log)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
