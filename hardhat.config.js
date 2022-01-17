require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.18",
      },
      {
        version: "0.4.22",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  networks: {
    mainnet: {
      url: process.env.INFURA_MAINNET_URL || "",
      accounts:
        process.env.ACCOUNT_PK !== undefined ? [process.env.ACCOUNT_PK] : [],
    },
    rinkeby: {
      url: process.env.INFURA_RINKEBY_URL || "",
      accounts:
        process.env.ACCOUNT_PK !== undefined ? [process.env.ACCOUNT_PK] : [],
    },
    robsten: {
      url: process.env.INFURA_ROBSTEN_URL || "",
      accounts:
        process.env.ACCOUNT_PK !== undefined ? [process.env.ACCOUNT_PK] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
