const { expect } = require("chai");
const { ethers } = require("hardhat");

beforeEach(async () => {
  [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
  ownerAccount = owner.address;
  account1 = addr1.address;
  account2 = addr2.address;

  account3 = addr3.address;
  account4 = addr4.address;
  // console.log("accs", ownerAccount, account1, account2, account3, account4);

  const Token = await ethers.getContractFactory("CreateToken");
  token = await Token.deploy("irfan", "irf", "irf101", 1000);
  await token.deployed();

  // 1_000_000_000_000_000_000
  const tokenPrize = ethers.BigNumber.from(18);
  console.log("tokenPrize", tokenPrize);
  const Selltoken = await ethers.getContractFactory("SellToken");
  sellToken = await Selltoken.deploy(token.address, tokenPrize);
  await sellToken.deployed();

  console.log("token", await sellToken.tokenPrice());
});
describe("Token", function () {
  it("total supply", async function () {
    expect(await token.totalSupply()).to.equal(1000);
  });
  it("transfer", async function () {
    // Transfer 50 tokens from owner to addr1
    await token.transfer(account1, 50);
    expect(await token.balanceOf(account1)).to.equal(50);
  });
  it("transfer from", async function () {
    // await token.transfer(account1, 50);
    await token.approve(account1, 20);
    await expect(token.approve(account1, 20))
      .to.emit(token, "Approval")
      .withArgs(ownerAccount, account1, 20);

    // // Transfer 50 tokens from addr1 to addr2
    await token.connect(addr1).transferFrom(ownerAccount, account2, 10);
    expect(await token.balanceOf(account2)).to.equal(10);
  });
});
