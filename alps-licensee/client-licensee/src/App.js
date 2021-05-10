/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignInSlide from "components/login/SignInSlide";
import LicenseeLayout from "./layouts/Licensee";
import PropTypes from "prop-types";
import Logout from "components/login/Logout";
// import Devices from "./views/Devices";

import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import Web3 from "web3";
import getContractObjects from "scripts/getContractObjects";
import SmartLicense1 from "./contracts/SmartLicense1.json";
import OracleDemo from "./contracts/OracleDemo.json";

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateTransactionHistory = this.updateTransactionHistory.bind(this);
    this.setToken = this.setToken.bind(this);
    this.logout = this.logout.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.state = {
      drizzle: null,
      token: null,
      appState: 0,
      transactionHistory: [],
      contracts: null,
      smartLicenses: null,
      deviceManagers: null,
      licensors: null,
      ips: null,
      deviceIds: null,
      slIpMap: null,
      ipDeviceMap: null,
      needRefresh: false,
    };
  }

  updateTransactionHistory(newHistory) {
    this.setState((prevState) => ({
      transactionHistory: [...prevState.transactionHistory, ...newHistory],
    }));
  }

  setToken(newToken, newState) {
    this.setState({
      token: newToken,
      needRefresh: true,
      appState: newState,
    });
  }

  logout() {
    localStorage.clear();
    this.setState({
      token: null,
    });
  }

  setAppState(state) {
    this.setState({
      appState: state,
    });
  }

  refresh() {
    this.setState({
      needRefresh: false,
    });
    window.location.reload();
  }

  componentDidMount() {
    this._asyncRequest = getContractObjects(web3, SmartLicense1).then(
      (result) => {
        this._asyncRequest = null;
        let contracts = result[0];
        console.log("RESULT", result);
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
        console.log(drizzle);
        // Get licensors
        let smartLicenses = result[1];
        let deviceManagers = result[2];
        let licensors = result[3];
        let ips = result[4];
        let deviceIds = result[5];
        let slIpMap = result[6];
        let ipDeviceMap = result[7];

        this.setState({
          contracts: contracts,
          drizzle: drizzle,
          smartLicenses: smartLicenses,
          deviceManagers: deviceManagers,
          licensors: licensors,
          ips: ips,
          deviceIds: deviceIds,
          slIpMap: slIpMap,
          ipDeviceMap: ipDeviceMap,
          needRefresh: false,
        });
      }
    );
  }

  // console.log("Storage Token:" + localStorage.getItem("CurrentToken"), token);
  // if (!token && !localStorage.getItem("CurrentToken")) {
  //   // console.log("Showing False Token:" + token);
  //   return <SignInSide setToken={setToken} />;
  // } else {
  //   if (!token) {
  //     //if current token is undefined, use the local storage one
  //     setToken(localStorage.getItem("CurrentToken"));
  //   } else {
  //     // Token has been set. Store token in local storage. Until log-out (or new token is input)
  //     localStorage.setItem("CurrentToken", token);
  //   }

  render() {
    // // Not yet logged in
    if (this.state.token === null && !localStorage.getItem("CurrentToken")) {
      return (
        <SignInSlide setToken={this.setToken} setAppState={this.setAppState} />
      );
      // return <Redirect to={"/licensee/devices"}/>
    } else if (this.state.token === null) {
      this.setState({
        token: localStorage.getItem("CurrentToken"),
        appState: localStorage.getItem("AppState"),
        needRefresh: true,
      });
    } else {
      // Token has been set. Store token in local storage. Until log-out (or new token is input)
      localStorage.setItem("CurrentToken", this.state.token);
      localStorage.setItem("AppState", this.state.appState);
    }
    // drizzle not loaded yet
    if (
      this.state.drizzle === null ||
      typeof this.state.drizzle === "undefined"
    ) {
      return "Loading BlockChain Data";
    }
    if (this.state.needRefresh) {
      this.refresh();
    }
    console.log("TOKEN", this.state.token);
    return (
      <DrizzleContext.Provider drizzle={this.state.drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              console.log("Intialized check", drizzle, initialized);
              // window.location.reload();
              return "Loading Drizzle State";
            }

            const {
              deviceManagers,
              smartLicenses,
              licensors,
              ips,
              deviceIds,
              slIpMap,
              ipDeviceMap,
            } = this.state;
            console.log("screen STATE ID", this.state.appState);
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
                        deviceManagers={deviceManagers}
                        smartLicenses={smartLicenses}
                        licensors={licensors}
                        ips={ips}
                        deviceIds={deviceIds}
                        slIpMap={slIpMap}
                        ipDeviceMap={ipDeviceMap}
                        setToken={this.setToken}
                        logout={this.logout}
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
                        deviceManagers={deviceManagers}
                        smartLicenses={smartLicenses}
                        licensors={licensors}
                        ips={ips}
                        deviceIds={deviceIds}
                        updateTransactionHistory={this.updateTransactionHistory}
                        transactionHistory={this.state.transactionHistory}
                        slIpMap={slIpMap}
                        ipDeviceMap={ipDeviceMap}
                        setToken={this.setToken}
                        logout={this.logout}
                      />
                    )}
                  />
                  <Route
                    path="/logout"
                    // render={() => <Logout setToken={setToken} />}
                    render={() => <Logout />}
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

export default App;
