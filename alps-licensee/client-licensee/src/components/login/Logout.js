/* eslint-disable no-unused-vars */
import React from "react";
import SignInSlide from "components/login/SignInSlide";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

export default function Logout({setToken}) {
    localStorage.clear();
     setToken(null);
  }

  Logout.propTypes = {
    setToken: PropTypes.func,
  };