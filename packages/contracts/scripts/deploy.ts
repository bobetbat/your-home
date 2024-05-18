import { ethers } from "hardhat";

async function main() {
  // const EstateToken = await ethers.getContractFactory("EstateToken");
  // const estateContract = await EstateToken.deploy();
  // await estateContract.deployed();
  // console.log(`EstateToken deployed. Address: ${estateContract.address}`);

  const RentalToken = await ethers.getContractFactory("RentalToken");
  const rentadContract = await RentalToken.deploy("0xbA7a18ecF10f054052BF3E9C81dA0e39925491c9");
  await rentadContract.deployed();
  console.log(`RentContract deployed. Address: ${rentadContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
