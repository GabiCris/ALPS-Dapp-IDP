import getContractsAbi from "variables/GetContractsAbi";

// getall contracts from blockchain
// return all web3 contract objects corresp. to them
const getContractObjects = async (web3, SmartLicense1) => {
  let smartLicenses = new Map();
  let deviceManagers = new Map();
  let contractsAbi = getContractsAbi();
  let conArr = [];

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
  console.log(transactionsList);
  // Iterate through transactions, get all contracts from "from" field
  for (let transaction of transactionsList) {
    let trInfo = await web3.eth.getTransactionReceipt(transaction);
    console.log("transaction", transaction, trInfo)
    contractsSet.add(trInfo.contractAddress);
  }
  // ContractsSet contains the addresses of all the contracts in the blockchain
  let contracts = Array.from(contractsSet);
  let licensors = new Map();
  let ips = new Map();
  let ipsSet = new Set();
  let deviceIds = new Map();
  let slIpMap = new Map();

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
        conArr.push({
          contractName: instance,
          web3Contract: newC,
        });
        console.log("type:", contractType);
        if (contractType.includes("SmartLicense")) {
          smartLicenses.set(instance, newC);
          let licensor = await newC.methods.licensor().call();
          let ip = await newC.methods.ip().call();
          licensors.has(licensor)
            ? licensors.set(licensor, licensors.get(licensor) + 1)
            : licensors.set(licensor, 1);
          slIpMap.set(instance, ip);
        }
        if (contractType.includes("DeviceManager")) {
          deviceManagers.set(instance, newC);
          //let ipsList = await aux.methods.getIps().call();
          let deviceId = await newC.methods.deviceId().call();
          deviceIds.set(instance, deviceId);
          let ipsList = contractType === "DeviceManager1" ? [1111, 2222, 3333] : [1111, 5555];
          //add ips in set
          ips.set(instance, ipsList);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  ipsSet.add(1111);
  ipsSet.add(2222);
  ipsSet.add(3333);
  ipsSet.add(5555);
  console.log("GET CONTR OJ IPS ", ips)
  // ips map will have the set of all ips at key 0
  ips.set(0, ipsSet);

  // return array of [allContractobjects, smartlicenses Map, device Manager map, ips Map, device Ids Map]
  return [conArr, smartLicenses, deviceManagers, licensors, ips, deviceIds, slIpMap];
};

export default getContractObjects;
