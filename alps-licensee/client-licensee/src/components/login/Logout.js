/* eslint-disable no-unused-vars */
import React from "react";
import SignInSide from "components/login/SignInSlide";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

export default function Logout({setToken}) {
    localStorage.clear();
    setToken(undefined);
    return (
      // <SignInSide/>
      <Redirect to="/login" />
    );
  }

  Logout.propTypes = {
    setToken: PropTypes.func,
  };