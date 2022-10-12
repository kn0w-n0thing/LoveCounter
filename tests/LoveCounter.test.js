// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

const base = BigNumber.from(2);

function convertCoordinateToLocation(x, y) {
  let bigNumberX = BigNumber.from(x);
  let bigNumberY = BigNumber.from(y);
  return bigNumberX.mul(base.pow(32)).add(bigNumberY);
}

function convertLocationToCoordinate(location) {
  return [location.div(base.pow(32)).toNumber(), location.mask(32).toNumber()]
}

describe("LoveCounter", function () {
  it("test initial value", async function () {
    const LoveCounter = await ethers.getContractFactory("LoveCounter");
    const loveCounter = await LoveCounter.deploy();
    await loveCounter.deployed();
    console.log('loveCounter deployed at:'+ loveCounter.address);
    expect((await loveCounter.getMyLocations()).length).to.equal(0);
    expect((await loveCounter.getOccupiedLocations()).length).to.equal(0);
  });

  it("test add moment", async function () {
    const LoveCounter = await ethers.getContractFactory("LoveCounter");
    const loveCounter = await LoveCounter.deploy();
    await loveCounter.deployed();
    console.log('loveCounter deployed at:'+ loveCounter.address);

    let location;
    let myLocations;

    location = convertCoordinateToLocation(1, 1);
    await loveCounter.addMoment(location, 'Hello world');

    myLocations = await loveCounter.getMyLocations();
    expect(myLocations.length).to.equal(1);
    console.log()
    expect((await loveCounter.getOccupiedLocations()).length).to.equal(1);

    location = convertCoordinateToLocation(1, 2);
    await loveCounter.addMoment(location, 'Hello world');

    myLocations = await loveCounter.getMyLocations();    
    expect(myLocations.length).to.equal(2);
    let [resultX, resultY] = convertLocationToCoordinate(myLocations[0]);
    console.log(resultX + ', ' + resultY);
    // console.log(convertLocationToCoordinate(myLocations[0]));
    expect((await loveCounter.getOccupiedLocations()).length).to.equal(2);
  });

  it("test add moment at occupied location", async function () {
    const LoveCounter = await ethers.getContractFactory("LoveCounter");
    const loveCounter = await LoveCounter.deploy();
    await loveCounter.deployed();
    console.log('loveCounter deployed at:'+ loveCounter.address);

    let location;

    location = convertCoordinateToLocation(1, 1);
  
    await loveCounter.addMoment(location, 'Hello world');
    expect((await loveCounter.getMyLocations()).length).to.equal(1);
    expect((await loveCounter.getOccupiedLocations()).length).to.equal(1);

    await expect(loveCounter.addMoment(location, 'Hello world'))
        .to.be.revertedWith('Location is occupied!');
    
    expect((await loveCounter.getMyLocations()).length).to.equal(1);
    expect((await loveCounter.getOccupiedLocations()).length).to.equal(1);
  });
});
