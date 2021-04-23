/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignInSide from "components/login/SignInSlide";
import LicenseeLayout from "./layouts/Licensee";
import PropTypes from "prop-types";
import Logout from "components/login/Logout";
// import Devices from "./views/Devices";

import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import MyStringStore from "./contracts/MyStringStore.json";
import SmartLicense1 from "./contracts/SmartLicense1.json";
import SmartLicense2 from "./contracts/SmartLicense2.json";
import SmartLicense3 from "./contracts/SmartLicense3.json";
import Web3 from "web3";
import getContractObjects from "scripts/getContractObjects";
import getContractWeb3Obj from "scripts/getContractWeb3Obj";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [SmartLicense1, SmartLicense2, SmartLicense3],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
    
  },
};
const drizzle = new Drizzle(options);
let provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);

async function getArtifact() {
  // const truffleContract = await web3.artifactsToContract(
  //   SmartLicense1
  // );
  // const contractInstance = await truffleContract.at(
  //   "0x91f52659514631930Fe57A0afa45Ce9AE44E7f9D"
  // );
  // console.log("CONTRACT INSTANCCE", SmartLicense1.at("0x91f52659514631930Fe57A0afa45Ce9AE44E7f9D"));
  // console.log("CONTRACT INSTANCCE", await SmartLicense1.licensee());
  // return contractInstance;
}

export default function App(props) {
  const [token, setToken] = useState();
  const [contracts, setContracts] = useState([]);
  const [contractObj, setContractObj] = useState([]);

  const passedFunction = (e) => {
    e.preventDefault();
    getContractsEth();
    getContractWeb3Obj(drizzle, contracts, web3, SmartLicense1);
  };

  async function getContractsEth() {
    console.log("SYNCHING contracts from BLOCKCHAIN!");
    let transactionsList = [];
    let contractsSet = new Set();
    let currentBlockNo = await web3.eth.getBlockNumber();
    localStorage.removeItem("contracts");

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
      // console.log(trInfo);
      contractsSet.add(trInfo.contractAddress);
    }
    // ContractsSet contains the addresses of all the contracts in the blockchain
    console.log(contractsSet);
    localStorage.setItem("contracts", JSON.stringify(Array.from(contractsSet)));

    //   let contractObjects = new Map();
    //   try {
    //   // console.log("contracts", contracts)
    //   for (let instance of contracts) {
    //     if (instance != null) {
    //       let aux = new web3.eth.Contract(SmartLicense1.abi, instance);

    //         let licensee = await aux.methods.licensee().call();
    //         let dueAmount = await aux.methods.dueAmount().call();

    //       let dataItem = [aux, licensee, dueAmount]; // await aux.methods.licensee().call(), await aux.methods.dueAmount().call()];
    //       contractObjects.set(instance, dataItem);
    //     }
    //   }
    // } catch (error) {console.log(error)}
    //   console.log("GET CONTRACT OBJECTS", contractObjects);
    //   //return contractObjects;

    return contractsSet;
  }

  console.log("Storage Token:" + localStorage.getItem("CurrentToken"));
  if (!token && !localStorage.getItem("CurrentToken")) {
    // console.log("Showing False Token:" + token);
    return <SignInSide setToken={setToken} />;
  } else {
    if (!token) {
      //if current token is undefined, use the local storage one
      setToken(localStorage.getItem("CurrentToken"));
    } else {
      // Token has been set. Store token in local storage. Until log-out (or new token is input)
      localStorage.setItem("CurrentToken", token);
    }

    useEffect(async () => {
      const data = localStorage.getItem("contracts");
      console.log("data:", data);

      if (data != "[]" && data != "{}" && data != "undefined" && data != null) {
        let aux = JSON.parse(data);
        setContracts(aux);
        // let obj = await getContractObjects(aux, web3, SmartLicense1);
        let obj2 = await getContractWeb3Obj(drizzle, aux, web3, SmartLicense1);
        //setContractObj(obj);
        // console.log("contracts list:", Array.from(obj2.values()));
        // let events = ["Mint"];
        // for (const [address, contract] of obj2.entries()) {
        //   let contractConfig = {
        //     contractName: address,
        //     web3Contract: contract,
        //   };
        //   drizzle.addContract(contractConfig, events);
        // }
        // console.log(drizzle);
      } else {
        let contractsArray = getContractsEth()
          .then(Array.from)
          .then((value) => {
            localStorage.setItem("contracts", JSON.stringify(value));
          });
      }
    }, []);

    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading...";
            }

            // setContractObj(getContractObjects(contracts, web3, SmartLicense1));
            //console.log("STORAGE CONTRACTS: ", localStorage.getItem("contracts"));
            console.log("PROPS CONTRACTS", contracts);
            return (
              <div className="App">
                {/* {console.log("APP DRIZZLESTATE: ", drizzleState, drizzleState.currentBlock)} */}
                <Switch>
                  <Route
                    path="/licensee/devices/:id"
                    render={(props) => (
                      <LicenseeLayout
                        {...props}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        loading={initialized}
                        contracts={contracts}
                        contractObjects={contractObj}
                        onRefresh={getContractsEth}
                      />
                    )}
                  ></Route>
                  <Route
                    path="/licensee"
                    render={(props) => (
                      <LicenseeLayout
                        {...props}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        loading={initialized}
                        contracts={contracts}
                        contractObjects={contractObj}
                        onRefresh={passedFunction}
                      />
                    )}
                  />
                  <Route
                    path="/logout"
                    render={() => <Logout setToken={setToken} />}
                  />

                  <Redirect to="/licensee/dashboard" />
                </Switch>
              </div>
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
};
