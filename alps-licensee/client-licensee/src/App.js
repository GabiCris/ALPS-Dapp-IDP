import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignInSide from "components/login/SignInSlide";
import LicenseeLayout from "./layouts/Licensee";
import PropTypes from "prop-types";
import Logout from "components/login/Logout";

export default function App() {
  const [token, setToken] = useState();

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
        <Switch>
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
