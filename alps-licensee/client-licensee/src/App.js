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

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [MyStringStore, SmartLicense1, SmartLicense2, SmartLicense3],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
};
const drizzle = new Drizzle(options);

export default function App(props) {
  const [token, setToken] = useState();
  // const [loading, setLoading] = useState(true);
  // const [drizzleState, setDrizzleState] = useState(null);
  // const [key, setKey] = useState(null);

  // useEffect(() => {
  //   const { drizzle } = props;

  //   // subscribe to changes in the store
  //   const unsubscribe = drizzle.store.subscribe(() => {
  //     // every time the store updates, grab the state from drizzle
  //     const drizzleS = drizzle.store.getState();

  //     // check to see if it's ready, if so, update local component state
  //     if (drizzleS.drizzleStatus.initialized) {
  //       setLoading(false);
  //       setDrizzleState(drizzleS);
  //     }
  //   });
  //   return function cleanup() {
  //     unsubscribe();
  //   };
  // });

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

    // console.log("Showing True Token:" + token);

    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading...";
            }

            return (
              <div className="App">
                {/* {console.log("APP LOADING:" + loading)} {console.log("APP DRIZZLESTATE: ")}{" "}
        {console.log(drizzleState)}
        {console.log(props.drizzle)} */}
                <Switch>
                  <Route
                    path="/licensee/devices/:id"
                    render={(props) => (
                      <LicenseeLayout
                        {...props}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        loading={initialized}
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
