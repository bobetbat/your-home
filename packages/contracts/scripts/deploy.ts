import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const EstateToken = await ethers.getContractFactory("EstateToken");
  const estateContract = await EstateToken.deploy();
  await estateContract.deployed();
  console.log(`EstateToken deployed. Address: ${estateContract.address}`);
  
  // const RentContract = await ethers.getContractFactory("RentContract");
  // const rentContract = await RentContract.deploy();
  // await rentContract.deployed();
  // console.log(`RentContract deployed. Address: ${rentContract.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
