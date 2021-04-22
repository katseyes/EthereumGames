// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

// do not forget: npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
// RUN WITH npx hardhat run scripts/deployHH.js:
const hre = require("hardhat");
//const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

function save(network, address) {
  const file = path.join(
  __dirname, '..', 'artifacts', 'Deploys.json');
  const deployments = fs.existsSync(file)? JSON.parse(fs.readFileSync(file)) : {};
  deployments[network] = address;
  const content = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(file, content);
}


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  // trying to get network id to call my save function from here
  const provider = deployer.provider;
  // const url = provider.url;
  // console.log(provider);
  // const web3 = new Web3(provider);
  // console.log(web3);
  // nw = await web3.eth.net.getId();
  //const provider = new ethers.providers.JsonRpcProvider();
  const network = await provider.getNetwork();

  const nw = network.chainId;

  console.log("Account balance:", (await deployer.getBalance()).toString());
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
 
  
  const Greeter = await ethers.getContractFactory("SimplePonzi");
  const greeter = await Greeter.deploy();

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("network is:", nw);
  save(nw,greeter.address);
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });