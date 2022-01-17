const hre = require("hardhat"); //import the hardhat

async function main() {
  // const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  // console.log("Deploying contracts with the account:", deployer.address);

  try {
    const CampaignFac = await hre.ethers.getContractFactory("CampaignFactory"); // Getting the Contract
    const campaignFac = await CampaignFac.deploy(); //deploying the contract

    await campaignFac.deployed(); // waiting for the contract to be deployed
    console.log("CampaignFac deployed to:", campaignFac.address);

    campaignFac.on("NewCampaign", listenEvent);
    function listenEvent(a, b, c, d) {
      console.log("evt", a, b, c, d);
    }
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
