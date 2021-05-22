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
import LoadingAnimation from "components/login/LoadingAnimation";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

let provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);


const URL = "ws://localhost:3030";
let ws = new WebSocket(URL);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateTransactionHistory = this.updateTransactionHistory.bind(this);
    this.setToken = this.setToken.bind(this);
    this.logout = this.logout.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.confirmSL = this.confirmSL.bind(this);
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
      ipSlMap: null,
      needRefresh: false,
      messages: [],
      isSLConfirmed: false,
    };
  }

  updateTransactionHistory(newHistory) {
    this.setState((prevState) => ({
      transactionHistory: newHistory,
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
        let ipSlMap = result[8];

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
          ipSlMap: ipSlMap,
          needRefresh: false,
        });
      }
    );

    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      console.log("MESSAGE RECEIVED:", message);
      if (message.type === "CONFIRM"){
        this.confirmSL();
      }
      else {
      this.addMessage(message);
      console.log("MESSAGES:", this.state.messages);
      }
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      // this.setState({
      //   ws: new WebSocket(URL),
      // });
      ws = new WebSocket(URL);
    };
  }

  addMessage(message) {
    this.setState((state) => ({ messages: [message, ...state.messages] }));
  }

  submitMessage (messageString, type) {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { party: this.state.appState, name: this.state.token, type: type, message: messageString };
    // const message = { name: this.state.appState === "0" ? "LICENSEE" : "LICENSOR", message: messageString };
    ws.send(JSON.stringify(message));
    this.addMessage(message);
  }

  confirmSL() {
    this.setState({
      isSLConfirmed: true,
    });
  }

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
      return <LoadingAnimation details={"Loading Data from Blockchain"} />;
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
              // return "Loading Drizzle State";
              return <LoadingAnimation details={"Rendering Data..."} />;
            }

            const {
              deviceManagers,
              smartLicenses,
              licensors,
              ips,
              deviceIds,
              slIpMap,
              ipDeviceMap,
              ipSlMap
            } = this.state;
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
                        ipSlMap={ipSlMap}
                        setToken={this.setToken}
                        logout={this.logout}
                        appState={this.state.appState}
                        onSubmitMessage={(messageString, type) => this.submitMessage(messageString, type)}
                        isSLConfirmed={this.state.isSLConfirmed}
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
                        ipSlMap={ipSlMap}
                        setToken={this.setToken}
                        logout={this.logout}
                        appState={this.state.appState}
                        onSubmitMessage={(messageString, type) => this.submitMessage(messageString, type)}
                        isSLConfirmed={this.state.isSLConfirmed}
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
