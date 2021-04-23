import getContractsAbi from "variables/GetContractsAbi";

const getContractWeb3Obj = async (drizzle, contracts, web3, SmartLicense1) => {
  let contractObjects = new Map();
  let contractsAbi = getContractsAbi();

  for (let instance of contracts) {
    if (instance != null) {
      let aux = new web3.eth.Contract(SmartLicense1.abi, instance);
      try {
        let contractType = await aux.methods.getContractType().call();
        let newC = new web3.eth.Contract(
          contractsAbi.get(contractType),
          instance
        );

        contractObjects.set(instance, newC);
        let events = ["Mint"];
        let contractConfig = {
          contractName: instance,
          web3Contract: newC,
        };
        drizzle.addContract(contractConfig, events);
      } catch (e) {
        console.log(e);
      }
    }
  }

  // const options = {
  //   contracts: cArr,
  //   web3: {
  //     fallback: {
  //       type: "ws",
  //       url: "ws://127.0.0.1:8545",
  //     },
  //   },
  // };
  // const drizzleStore = generateStore(options);
  // drizzle = new Drizzle(options, drizzleStore);
  console.log("GET WEB3 RESULTS", contractObjects);
  console.log("DRIZZLE", drizzle);
  return contractObjects;
};

export default getContractWeb3Obj;
