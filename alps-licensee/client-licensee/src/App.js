import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignInSide from "components/login/SignInSlide";
import LicenseeLayout from "./layouts/Licensee";
import PropTypes from "prop-types";
import Logout from "components/login/Logout";
// import Devices from "./views/Devices";

export default function App(props) {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [drizzleState, setDrizzleState] = useState(null);

  useEffect(() => {
    const { drizzle } = props;

    // subscribe to changes in the store
    const unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      setDrizzleState(drizzle.store.getState());

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
       setLoading(false);
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  });
  console.log("Storage Token:" + localStorage.getItem("CurrentToken"));
  if (!token && !localStorage.getItem("CurrentToken")) {
    console.log("Showing False Token:" + token);
    return <SignInSide setToken={setToken} />;
  } else {
    if (!token) {
      //if current token is undefined, use the local storage one
      setToken(localStorage.getItem("CurrentToken"));
    } else {
      // Token has been set. Store token in local storage. Until log-out (or new token is input)
      localStorage.setItem("CurrentToken", token);
    }

    console.log("Showing True Token:" + token);

    return (
      <div className="App">
        {console.log("LOADING:" + loading)} {console.log( " DRIZZLESTATE: ")} {console.log(  drizzleState )}
        <Switch>
          <Route
            path="/licensee/devices/:id"
            render={(props) => <LicenseeLayout {...props} />}
          ></Route>
          <Route
            path="/licensee"
            render={(props) => <LicenseeLayout {...props} />}
          />
          <Route path="/logout" render={() => <Logout setToken={setToken} />} />

          <Redirect to="/licensee/dashboard" />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
};
