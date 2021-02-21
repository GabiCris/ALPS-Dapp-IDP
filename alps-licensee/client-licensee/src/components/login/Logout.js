import React from "react";
import SignInSide from "components/login/SignInSlide";
import PropTypes from "prop-types";

export default function Logout({setToken}) {
    localStorage.clear();
    setToken(undefined);
    return (
      <SignInSide/>
    );
  }

  Logout.propTypes = {
    setToken: PropTypes.func,
  };