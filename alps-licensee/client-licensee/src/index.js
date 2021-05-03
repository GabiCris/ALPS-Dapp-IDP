/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import LicenseeLayout from "./layouts/Licensee";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import App from "App";
import getContractObjects from "scripts/getContractObjects";
import Web3 from "web3";
import SmartLicense1 from "./contracts/SmartLicense1.json";
import OracleDemo from "./contracts/OracleDemo.json";

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);

const hist = createBrowserHistory();
getContractObjects(web3, SmartLicense1).then((result) => {
  console.log("INDEX LIST", result);
  let contracts = result[0];
  contracts.push(OracleDemo);
  const optionsDrizzle = {
    contracts: contracts,
    web3: {
      fallback: {
        type: "ws",
        url: "ws://127.0.0.1:8545",
      },
    },
    events: {
      SmartLicense1: ["PaymentAcknowledged", "RoyaltyComputed"],
    },
  };
  let drizzle = new Drizzle(optionsDrizzle);

  // Get licensors
  let smartLicenses = result[1];
  let deviceManagers = result[2];
  let licensors = result[3];
  let ips = result[4];
  let deviceIds = result[5];
  let slIpMap = result[6];
  ReactDOM.render(
    <Router history={hist}>
      <App
        drizzle={drizzle}
        smartLicenses={smartLicenses}
        deviceManagers={deviceManagers}
        licensors={licensors}
        ips={ips}
        deviceIds={deviceIds}
        slIpMap={slIpMap}
      />
    </Router>,
    document.getElementById("root")
  );
});
// ReactDOM.render(
//   <Router history={hist}>
//     <App/>
//   </Router>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
