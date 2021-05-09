/* eslint-disable no-unused-vars */
import React from "react";
import SignInSide from "components/login/SignInSlide";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

export default function Logout({setToken}) {
    localStorage.clear();
    return (
      // <SignInSide/>
      // <Redirect to="/login" />
      <SignInSide setToken={setToken} />
    );
  }

  Logout.propTypes = {
    setToken: PropTypes.func,
  };