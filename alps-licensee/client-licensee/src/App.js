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
import getContractsAbi from "variables/GetContractsAbi";
import SmartLicense3 from "contracts/SmartLicense3.json";

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
    this.rejectSL = this.rejectSL.bind(this);
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
      messages: new Map(),
      isSLConfirmed: false,
      slCreationList: [],
      isSlRejected: false,
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
      if (message.type === "ACCEPT") {
        this.confirmSL(message.message);
      } else if (message.type === "REJECT") {
        this.rejectSL(message.message);
      } else if (this.state.appState === "1" && message.type === "CREATE") {
        const mess = {
          party: this.state.appState,
          licensee: message.licensee,
          type: message.type,
          message: message.message,
          licensor: this.state.token,
          sign: message.sign,
        };
        this.addMessage(mess);
      } else if (this.state.appState === "1" && message.type === "DEPLOYED") {
        let item = this.state.messages.get(message.message);
        item.type = "DEPLOYED";
        item["address"] = message.address;
        this.setState({
          messages: new Map(this.state.messages.set(message.message, item)),
        });
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
    this.setState(new Map(this.state.messages.set(message.message, message)));
  }

  submitMessage(messageString, type, licensor, sign) {
    if (type === "CREATE") {
      const message = {
        party: this.state.appState,
        licensee: this.state.token,
        type: type,
        message: messageString,
        licensor: licensor,
        sign: sign,
      };
      // const message = { name: this.state.appState === "0" ? "LICENSEE" : "LICENSOR", message: messageString };
      ws.send(JSON.stringify(message));
      this.addMessage(message);
    } else if (type === "ACCEPT") {
      let item = this.state.messages.get(messageString);
      item.type = "ACCEPT";
      this.setState({
        messages: new Map(this.state.messages.set(messageString, item)),
      });
    } else if (type === "REJECT") {
      let item = this.state.messages.get(messageString);
      item.type = "REJECT";
      this.setState({
        messages: new Map(this.state.messages.set(messageString, item)),
      });
    }
  }

  confirmSL(key) {
    this.setState({
      isSLConfirmed: true,
    });
    this.submitMessage(key, "ACCEPT", "", "");
    if (this.state.appState === "0") {
      this.deploySL(key);
    }
  }

  rejectSL(key) {
    this.setState({
      isSlRejected: true,
    });
    this.submitMessage(key, "REJECT", "", "");
  }

  deploySL(key) {
    let contractsAbi = getContractsAbi();
    let abi = contractsAbi.get("SmartLicense3");
    console.log("ABI", abi);
    let bytecode =
      "0x60806040526040518060400160405280600a81526020017f4c6963656e736565203100000000000000000000000000000000000000000000815250600090805190602001906200005192919062000140565b506040518060600160405280603e815260200162000dee603e9139600190805190602001906200008392919062000140565b506040518060400160405280600381526020017f333230000000000000000000000000000000000000000000000000000000000081525060029080519060200190620000d192919062000140565b506040518060400160405280600a81526020017f31302f30382f3230323100000000000000000000000000000000000000000000815250600390805190602001906200011f92919062000140565b506104d86004556115b36005553480156200013957600080fd5b50620001ef565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200018357805160ff1916838001178555620001b4565b82800160010185558215620001b4579182015b82811115620001b357825182559160200191906001019062000196565b5b509050620001c39190620001c7565b5090565b620001ec91905b80821115620001e8576000816000905550600101620001ce565b5090565b90565b610bef80620001ff6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063911c17921161008c578063c30a4d4811610066578063c30a4d4814610551578063c51a29e0146105d4578063d023420d14610657578063fc7f34ca14610675576100ea565b8063911c17921461044a578063b917d4fc14610478578063c204296514610533576100ea565b8063398e1b18116100c8578063398e1b18146102b05780635e3044cb146102de57806374c0854c146103615780637d42c3241461041c576100ea565b80630144f989146100ef5780630b97bc861461017257806324bf2e1d146101f5575b600080fd5b6100f7610730565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013757808201518184015260208101905061011c565b50505050905090810190601f1680156101645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017a6107ce565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101ba57808201518184015260208101905061019f565b50505050905090810190601f1680156101e75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102ae6004803603602081101561020b57600080fd5b810190808035906020019064010000000081111561022857600080fd5b82018360208201111561023a57600080fd5b8035906020019184600183028401116401000000008311171561025c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061086c565b005b6102dc600480360360208110156102c657600080fd5b8101908080359060200190929190505050610886565b005b6102e6610890565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561032657808201518184015260208101905061030b565b50505050905090810190601f1680156103535780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61041a6004803603602081101561037757600080fd5b810190808035906020019064010000000081111561039457600080fd5b8201836020820111156103a657600080fd5b803590602001918460018302840111640100000000831117156103c857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061092e565b005b6104486004803603602081101561043257600080fd5b8101908080359060200190929190505050610948565b005b6104766004803603602081101561046057600080fd5b81019080803590602001909291905050506109a1565b005b6105316004803603602081101561048e57600080fd5b81019080803590602001906401000000008111156104ab57600080fd5b8201836020820111156104bd57600080fd5b803590602001918460018302840111640100000000831117156104df57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506109fa565b005b61053b610a14565b6040518082815260200191505060405180910390f35b610559610a1a565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561059957808201518184015260208101905061057e565b50505050905090810190601f1680156105c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105dc610ab8565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561061c578082015181840152602081019050610601565b50505050905090810190601f1680156106495780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61065f610af5565b6040518082815260200191505060405180910390f35b61072e6004803603602081101561068b57600080fd5b81019080803590602001906401000000008111156106a857600080fd5b8201836020820111156106ba57600080fd5b803590602001918460018302840111640100000000831117156106dc57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610afb565b005b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107c65780601f1061079b576101008083540402835291602001916107c6565b820191906000526020600020905b8154815290600101906020018083116107a957829003601f168201915b505050505081565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108645780601f1061083957610100808354040283529160200191610864565b820191906000526020600020905b81548152906001019060200180831161084757829003601f168201915b505050505081565b8060009080519060200190610882929190610b15565b5050565b8060048190555050565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109265780601f106108fb57610100808354040283529160200191610926565b820191906000526020600020905b81548152906001019060200180831161090957829003601f168201915b505050505081565b8060039080519060200190610944929190610b15565b5050565b6109558160045403610886565b7fd46e4a54c5d2e2bdba7d8708fd2c0ff8b3d9cd7eec365f22e5a7378d5c759ccb816004544260405180848152602001838152602001828152602001935050505060405180910390a150565b6109ae8160045401610886565b7fbfd30cf8cf963cd2507e1cdc8b263f10c813dce918785f36206a6d7c89f1215f816004544260405180848152602001838152602001828152602001935050505060405180910390a150565b8060019080519060200190610a10929190610b15565b5050565b60045481565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ab05780601f10610a8557610100808354040283529160200191610ab0565b820191906000526020600020905b815481529060010190602001808311610a9357829003601f168201915b505050505081565b60606040518060400160405280600d81526020017f536d6172744c6963656e73653300000000000000000000000000000000000000815250905090565b60055481565b8060029080519060200190610b11929190610b15565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b5657805160ff1916838001178555610b84565b82800160010185558215610b84579182015b82811115610b83578251825591602001919060010190610b68565b5b509050610b919190610b95565b5090565b610bb791905b80821115610bb3576000816000905550600101610b9b565b5090565b9056fea265627a7a72315820401ba1275be0449f1cc5658ba6ab60c53b89c513c421357e165578abd43e982164736f6c63430005100032526164696f20416e642054656c65766973696f6e2042726f616463617374696e6720416e6420436f6d6d756e69636174696f6e732045717569706d656e74";
    let account = "0x9F90a92275cEca6F77F12C4b2f48de414e3A3897";
    let sl3 = new web3.eth.Contract(SmartLicense3.abi);
    let payload = {
      data: bytecode,
    };
    let parameter = {
      from: account,
      gas: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("50", "gwei")),
    };
    sl3
      .deploy(payload)
      .send(parameter, (err, transactionHash) => {
        console.log("Transaction Hash :", transactionHash);
      })
      .on("confirmation", () => {})
      .then((newContractInstance) => {
        console.log(
          "Deployed Contract Address : ",
          newContractInstance.options.address
        );

        let item = this.state.messages.get(key);
        item.type = "DEPLOYED";
        item["address"] = newContractInstance.options.address;
        ws.send(JSON.stringify(item));
        this.setState({
          messages: new Map(this.state.messages.set(key, item)),
        });
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
              ipSlMap,
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
                        onSubmitMessage={(messageString, type) =>
                          this.submitMessage(messageString, type)
                        }
                        isSLConfirmed={this.state.isSLConfirmed}
                        messages={this.state.messages}
                        ws={ws}
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
                        onSubmitMessage={(
                          messageString,
                          type,
                          licensor,
                          sign
                        ) =>
                          this.submitMessage(
                            messageString,
                            type,
                            licensor,
                            sign
                          )
                        }
                        isSLConfirmed={this.state.isSLConfirmed}
                        messages={this.state.messages}
                        ws={ws}
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
