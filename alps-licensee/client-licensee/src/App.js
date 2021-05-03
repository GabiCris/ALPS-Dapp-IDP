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

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);
// let contractObjects = undefined;// = getContractObjects(web3, SmartLicense1);
// (async () => {
//   contractObjects = await getContractObjects(web3, SmartLicense1);
//   console.log('Test!');
// })();

// function waitForDrizzle(){
//   if(typeof contractObjects !== "undefined"){
//       //variable exists, do what you want
//   }
//   else{
//     console.log("Timeout triggered. WATING FOR DRIZZLE");
//     setTimeout(waitForDrizzle, 250);
//   }
// }
//  waitForDrizzle();

// let drizzle = undefined;
// getContractObjects()
//   .then((result) => {
//     const options = {
//       contracts: result,
//       web3: {
//         fallback: {
//           type: "ws",
//           url: "ws://127.0.0.1:8545",
//         },
//       },
//     };
//     drizzle = new Drizzle(options);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// nothing else

// let drizzle know what contracts we want and how to access our test blockchain
//console.log("contract obj initialized", contractObjects);
const options = {
  contracts: [],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
};

export default function App(props) {
  const [token, setToken] = useState();
  const [contracts, setContracts] = useState([]);
  const [contractObj, setContractObj] = useState([]);
  const [drizzle, setDrizzle] = useState(new Drizzle(options));
  const [transactionHistory, setTransactionHistory] = useState([]);

  function updateTransactionHistory(newHistory) {
    setTransactionHistory(newHistory);
  }

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
        //let obj2 = await getContractWeb3Obj(drizzle, aux, web3, SmartLicense1);
        //setContractObj(obj);
      } else {
        let contractsArray = getContractsEth()
          .then(Array.from)
          .then((value) => {
            localStorage.setItem("contracts", JSON.stringify(value));
          });
      }
    }, []);

    return (
      <DrizzleContext.Provider drizzle={props.drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading...";
            }

            // setContractObj(getContractObjects(contracts, web3, SmartLicense1));
            //console.log("STORAGE CONTRACTS: ", localStorage.getItem("contracts"));
            console.log("DRIZZLE  OBJ IN APP", drizzle);
            const {
              deviceManagers,
              smartLicenses,
              licensors,
              ips,
              deviceIds,
              slIpMap,
            } = props;
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
                        deviceManagers={deviceManagers}
                        smartLicenses={smartLicenses}
                        licensors={licensors}
                        ips={ips}
                        deviceIds={deviceIds}
                        slIpMap={slIpMap}
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
                        deviceManagers={deviceManagers}
                        smartLicenses={smartLicenses}
                        licensors={licensors}
                        ips={ips}
                        deviceIds={deviceIds}
                        updateTransactionHistory={updateTransactionHistory}
                        transactionHistory={transactionHistory}
                        slIpMap={slIpMap}
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
