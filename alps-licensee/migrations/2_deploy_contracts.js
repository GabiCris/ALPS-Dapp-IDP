// const SmartLicense1 = artifacts.require("SmartLicense1");
// const SmartLicense2 = artifacts.require("SmartLicense2");
// const SmartLicense3 = artifacts.require("SmartLicense3");
// const DeviceManager1 = artifacts.require("DeviceManager1");
// const DeviceManager2 = artifacts.require("DeviceManager2");
// const OracleDemo = artifacts.require("OracleDemo");
const AggregatorContract = artifacts.require("AggregatorContract");
const VerificationContract = artifacts.require("VerificationContract");
const RoyaltyComputation = artifacts.require("RoyaltyComputationContract");
const ManagerContract = artifacts.require("ManagerContract");
const licensor1 = "0x5c8cAB6f54026a6CD9F0D82F5C972409be6cC357";
const licensee1 = "0x920552CCaEE56bD436859D37a9219CF16a888A9d";

module.exports = function(deployer) {
  deployer.then( async() => {
    await deployer.deploy(VerificationContract, "screen");
    await deployer.deploy(AggregatorContract, VerificationContract.address, VerificationContract.address, 0,0,0);
    await deployer.deploy(RoyaltyComputation, AggregatorContract.address);
    await deployer.deploy(ManagerContract, AggregatorContract.address, RoyaltyComputation.address, licensee1, licensor1, 123);
    await deployer.deploy(ManagerContract, AggregatorContract.address, RoyaltyComputation.address, licensee1, licensor1, 71);
    await deployer.deploy(ManagerContract, AggregatorContract.address, RoyaltyComputation.address, licensee1, licensor1, 345);
    
  });
};