// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
  it("test initial value", async function () {
    const LoveCounter = await ethers.getContractFactory("LoveCounter");
    const loveCounter = await LoveCounter.deploy();
    await loveCounter.deployed();
    console.log('loveCounter deployed at:'+ loveCounter.address);
    expect((await loveCounter.getMoments()).length).to.equal(0);
  });

  it("test initial value", async function () {
    const LoveCounter = await ethers.getContractFactory("LoveCounter");
    const loveCounter = await LoveCounter.deploy();
    await loveCounter.deployed();
    console.log('loveCounter deployed at:'+ loveCounter.address);
    await loveCounter.addMoment(1, 1, "Hello world!");
    expect((await loveCounter.getMoments()).length).to.equal(1);
  });
});
