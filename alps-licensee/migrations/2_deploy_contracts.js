const MyStringStore = artifacts.require("MyStringStore");
const SmartLicense1 = artifacts.require("SmartLicense1");
const SmartLicense2 = artifacts.require("SmartLicense2");
const SmartLicense3 = artifacts.require("SmartLicense3");
const DeviceManager1 = artifacts.require("DeviceManager1");
const DeviceManager2 = artifacts.require("DeviceManager2");

module.exports = function(deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(SmartLicense1);
  deployer.deploy(SmartLicense2);
  deployer.deploy(SmartLicense3);
  deployer.deploy(DeviceManager1);
  deployer.deploy(DeviceManager2);
};