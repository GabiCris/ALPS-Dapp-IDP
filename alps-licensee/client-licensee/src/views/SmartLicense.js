/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import HorizontalNonLinearAlternativeLabelStepper from "components/Stepper";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import HistoryIcon from "@material-ui/icons/History";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";
import SLTable from "components/SLTable";
import SmartLicenseLicensee from "components/smart-license/SmartLicenseLicensee";
import SmartLicenseLicensor from "components/smart-license/SmartLicenseLicensor";

class SmartLicense extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = 250;
  }

  sendMessage() {
    let websocket = this.state.ws;
    try {
      let data = "Random text of data";
      websocket.send(data); //send data to the server
    } catch (error) {
      console.log(error); // catch error
    }
  }

  render() {
    return (
      <div className="content">
        {this.props.appState === "1" ? (
          <SmartLicenseLicensor {...this.props} />
        ) : (
          <SmartLicenseLicensee {...this.props} />
        )}
      </div>
    );
  }
}

export default SmartLicense;
