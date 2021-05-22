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

class SmartLicense extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = 250;
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 0,
    };
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
      ws: null,
    });
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
        <ThemeProvider theme={theme}>
          {this.props.appState === "1" ? (
            <div></div>
          ) : (
            <Paper square>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
              >
                <Tab icon={<AddIcon />} label="Create Smart License" />
                <Tab icon={<HistoryIcon />} label="History" />
              </Tabs>
            </Paper>
          )}
          <Box mt={5}>
            {this.state.value ? (
              <SLTable />
            ) : (
              <HorizontalNonLinearAlternativeLabelStepper
                onSubmitMessage={this.props.onSubmitMessage}
                appState={this.props.appState}
                isSLConfirmed={this.props.isSLConfirmed}
              />
            )}
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default SmartLicense;
