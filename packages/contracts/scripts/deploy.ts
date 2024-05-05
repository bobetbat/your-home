import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const EstateContract = await ethers.getContractFactory("EstateContract");
  const estateContract = await EstateContract.deploy();
  await estateContract.deployed();
  console.log(`EstateContract deployed. Address: ${estateContract.address}`);
  
  const RentContract = await ethers.getContractFactory("RentContract");
  const rentContract = await RentContract.deploy();
  await rentContract.deployed();
  console.log(`EstateContract deployed. Address: ${rentContract.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
