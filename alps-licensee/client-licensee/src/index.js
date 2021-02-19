/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import LicenseeLayout from "./layouts/Licensee";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store";
import MyStringStore from "./contracts/MyStringStore.json";
import App from "App";

// let drizzle know what contracts we want and how to access our test blockchain
// const options = {
//   contracts: [MyStringStore],
//   web3: {
//     fallback: {
//       type: "ws",
//       url: "ws://127.0.0.1:9545",
//     },
//   },
// };
// setup drizzle
//const drizzle = new Drizzle(options);
//ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));

const hist = createBrowserHistory();


ReactDOM.render(
  <Router history={hist}>
    <App/>
  </Router>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
