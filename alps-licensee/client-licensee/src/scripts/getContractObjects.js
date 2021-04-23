const getContractObjects = async (contracts, web3, SmartLicense1) => {
  let contractObjects = new Map();
  // console.log("contracts", contracts)
  try {
    for (let instance of contracts) {
      if (instance != null) {
        let aux = new web3.eth.Contract(SmartLicense1.abi, instance);
        let licensee = null;
        let licensor = null;
        let dueAmount = null;
        let startDate = null;
        let auxx = null;
        try {
          licensee = await aux.methods.licensee().call();
          licensor = await aux.methods.licensor().call();
          dueAmount = await aux.methods.dueAmount().call();
          startDate = await aux.methods.startDate().call();
          auxx = await aux.methods.identifier().call();
        } catch (e) {
          console.log(e);
        }
        let dataItem = [
          instance,
          licensee,
          licensor,
          dueAmount,
          startDate,
          auxx,
        ]; // await aux.methods.licensee().call(), await aux.methods.dueAmount().call()];
        contractObjects.set(aux, dataItem);
      }
    }
  } catch (error) {
    console.log("error in getcObjects", error);
  }
  console.log("GET CONTRACT OBJECTS", contractObjects);
  return contractObjects;
};

export default getContractObjects;
