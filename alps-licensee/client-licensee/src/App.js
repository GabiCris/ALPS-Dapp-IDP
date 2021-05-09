/* eslint-disable react/prop-types */
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
import Web3 from "web3";

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateTransactionHistory = this.updateTransactionHistory.bind(this);
    this.state = {
      token: null,
      transactionHistory: [],
    };
  }

  updateTransactionHistory(newHistory) {
    this.setState((prevState) => ({
      transactionHistory: [...prevState.transactionHistory, ...newHistory],
    }));
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
    return (
      <DrizzleContext.Provider drizzle={this.props.drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading...";
            }

            console.log("DRIZZLE  OBJ IN APP", drizzle);
            const {
              deviceManagers,
              smartLicenses,
              licensors,
              ips,
              deviceIds,
              slIpMap,
              ipDeviceMap,
            } = this.props;
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
