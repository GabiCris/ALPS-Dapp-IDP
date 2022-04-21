import SmartLicense2 from "contracts/SmartLicense2.json";
import SmartLicense3 from "contracts/SmartLicense3.json";
import DeviceManager1 from "contracts/DeviceManager1.json";
import DeviceManager2 from "contracts/DeviceManager2.json";
import SmartLicense1 from "contracts/SmartLicense1.json";
import ManagerContract from "contracts/ManagerContract.json";

const getContractsAbi =  () => {
    let contractsAbi = new Map([
        ["SmartLicense1", SmartLicense1.abi],
        ["SmartLicense2", SmartLicense2.abi],
        ["SmartLicense3", SmartLicense3.abi],
        ["DeviceManager1", DeviceManager1.abi],
        ["DeviceManager2", DeviceManager2.abi],
        ["ManagerContract", ManagerContract.abi],
    ]);
    return contractsAbi;
  };
  
  export default getContractsAbi;
  