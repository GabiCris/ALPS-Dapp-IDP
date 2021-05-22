import getContractsAbi from "variables/GetContractsAbi";

// getall contracts from blockchain
// return all web3 contract objects corresp. to them
const getContractObjects = async (web3, SmartLicense1) => {
  let smartLicenses = new Map();
  let deviceManagers = new Map();
  let contractsAbi = getContractsAbi();
  let conArr = [];

  let token = localStorage.getItem("CurrentToken");
  // 0 - licensee, 1-licensor
  let appState = localStorage.getItem("AppState");
  console.log("STATE DATA IN GET CONTRACT OBJ", token, appState);

  // get all contracts
  console.log("GETTING CONTRACTS TO CREATE WEB3 OBJECTS!");
  let transactionsList = [];
  let contractsSet = new Set();
  let currentBlockNo = await web3.eth.getBlockNumber();

  // Get all transactions in the blockchain -> transactionList
  for (
    // test net purposes - should start from gen block
    let blockIndex = 1;
    blockIndex <= currentBlockNo;
    blockIndex++
  ) {
    var currentBlock = await web3.eth.getBlock(blockIndex);
    transactionsList = [...transactionsList, ...currentBlock.transactions];
  }
  // Iterate through transactions, get all contracts from "from" field
  for (let transaction of transactionsList) {
    let trInfo = await web3.eth.getTransactionReceipt(transaction);
    contractsSet.add(trInfo.contractAddress);
  }
  // ContractsSet contains the addresses of all the contracts in the blockchain
  let contracts = Array.from(contractsSet);
  let licensors = new Map();
  let ips = new Map();
  let ipsSet = new Set();
  let deviceIds = new Map();
  let slIpMap = new Map();
  let ipDeviceMap = new Map();
  let ipSlMap = new Map();

  if (appState === "0") {
    console.log("APP STATE 0")
  // now create web3 objects
  for (let instance of contracts) {
    if (instance != null) {
      let aux = new web3.eth.Contract(SmartLicense1.abi, instance);
      try {
        let contractType = await aux.methods.getContractType().call();
        let newC = new web3.eth.Contract(
          contractsAbi.get(contractType),
          instance
        );
        console.log("type:", contractType);
        if (contractType.includes("SmartLicense")) {
          let licensee = await newC.methods.licensee().call();
          console.log("SL COMP", licensee, token, licensee===token)
          if (  licensee === token) {
          conArr.push({
            contractName: instance,
            web3Contract: newC,
          });
          let licensor = await newC.methods.licensor().call();
          let ip = await newC.methods.ip().call();
          smartLicenses.set(instance, newC);
          licensors.has(licensor)
            ? licensors.get(licensor).push(instance)
            : licensors.set(licensor, [instance]);
          slIpMap.set(instance, ip.toString());
          ipSlMap.has(ip.toString())
          ? ipSlMap.get(ip.toString()).push(instance)
          : ipSlMap.set(ip.toString(), [instance]);
        }}
        if (contractType.includes("DeviceManager")) {
          let licensee = await newC.methods.licensee().call();
          if (  licensee === token) {
            conArr.push({
              contractName: instance,
              web3Contract: newC,
            });
          deviceManagers.set(instance, newC);
          let ipsList = await newC.methods.getIps().call();
          let deviceId = await newC.methods.deviceId().call();
          deviceIds.set(instance, deviceId);
          //add ips in set
          ips.set(instance, ipsList);
          for (let ip of ipsList) {
            ipsSet.add(ip);
            ipDeviceMap.has(ip)
              ? ipDeviceMap.get(ip).push(instance)
              : ipDeviceMap.set(ip, [instance]);
          }
        }
      }
        // else {
        //   // Potential Oracle contracts or other necessary dynamically added contracts
        //   conArr.push({
        //     contractName: instance,
        //     web3Contract: newC,
        //   });
        // }
      } 
      catch (e) {
        console.log(e);
      }
    }
  }
} else if (appState === "1") {
  console.log("APP STATE 1")
  for (let instance of contracts) {
    if (instance != null) {
      let aux = new web3.eth.Contract(SmartLicense1.abi, instance);
      try {
        let contractType = await aux.methods.getContractType().call();
        let newC = new web3.eth.Contract(
          contractsAbi.get(contractType),
          instance
        );
        // conArr.push({
        //   contractName: instance,
        //   web3Contract: newC,
        // });
        console.log("type:", contractType);
        if (contractType.includes("SmartLicense")) {
          let licensor = await newC.methods.licensor().call();
          
          if ( licensor === token) {
          conArr.push({
            contractName: instance,
            web3Contract: newC,
          });
          let ip = await newC.methods.ip().call();
          smartLicenses.set(instance, newC);
          licensors.has(licensor)
            ? licensors.get(licensor).push(instance)
            : licensors.set(licensor, [instance]);
          slIpMap.set(instance, ip.toString());
          ipSlMap.has(ip.toString())
          ? ipSlMap.get(ip.toString()).push(instance)
          : ipSlMap.set(ip.toString(), [instance]);
        }}

        // FILER BY IP AS WELL
        if (contractType.includes("DeviceManager")) {
          conArr.push({
            contractName: instance,
            web3Contract: newC,
          });
          deviceManagers.set(instance, newC);
          let ipsList = await newC.methods.getIps().call();
          let deviceId = await newC.methods.deviceId().call();
          deviceIds.set(instance, deviceId);
          //add ips in set
          ips.set(instance, ipsList);
          for (let ip of ipsList) {
            ipsSet.add(ip);
            ipDeviceMap.has(ip)
              ? ipDeviceMap.get(ip).push(instance)
              : ipDeviceMap.set(ip, [instance]);
          }
        }
        // else {
        //   conArr.push({
        //     contractName: instance,
        //     web3Contract: newC,
        //   });
        // }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
  console.log("GET CONTR OJ IPS ", ips);
  // ips map will have the set of all ips at key 0
  ips.set(0, ipsSet);

  // return array of [allContractobjects, smartlicenses Map, device Manager map, ips Map, device Ids Map]
  // licensors: (MAP) Licensor name => #associated SL i.e. number of associated smart licenses
  // ips:(MAP) Device adr => [ips] list of associated ips
  // deviceIds: (MAP) Device addr => Device Id
  // slIpMap: IP => SmartLicense
  // ipDeviceMap:  IP => [Devices] list of associated devices
  return [
    conArr,
    smartLicenses,
    deviceManagers,
    licensors,
    ips,
    deviceIds,
    slIpMap,
    ipDeviceMap,
    ipSlMap,
  ];
};

export default getContractObjects;
