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
    contractsSet.add(trInfo.contractAddress);
  }
  // ContractsSet contains the addresses of all the contracts in the blockchain
  let contracts = Array.from(contractsSet);

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
        }
        if(contractType.includes("DeviceManager")) {
          deviceManagers.set(instance, newC);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  //let ret = Array.from(contractObjects.values());
  console.log("Array IN BEGINNING OF CONTRACTS OBJECTS", conArr);
  console.log(smartLicenses, deviceManagers);
  // return array of [allContractobjects, smartlicenses Map, device Manager map]
  return [conArr, smartLicenses, deviceManagers];
};

export default getContractObjects;
