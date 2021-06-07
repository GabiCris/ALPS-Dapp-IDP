/* eslint-disable react/prop-types */
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
import SLStepperLicensee from "./SLStepperLicensee";

class SmartLicenseLicensee extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      tabsValue: 0,
    };
  }

  handleChange() {
    this.setState({
      tabsValue: this.state.tabsValue === 0 ? 1 : 0,
    });
  }

  getStep() {
    let sl = this.props.messages;
    let step = 0;
    if (sl.length > 0) {
      let state = sl[sl.length - 1].type;
      if (state === "ACCEPT") {
        step = 2;
      } else if (state === "REJECT") {
        step = 0;
      } else if (state === "CREATE") {
        step = 1;
      }
    }
    return step;
  }

  render() {
    let step = this.getStep();
    console.log("STEP VAL", step);
    return (
      <div className="content">
        <ThemeProvider theme={theme}>
          <Paper square>
            <Tabs
              value={this.state.tabsValue}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<AddIcon />} label="Create Smart License" value={0} />
              <Tab icon={<HistoryIcon />} label="History" value={1} />
            </Tabs>
          </Paper>

          <Box mt={5}>
            {this.state.tabsValue ? (
              <SLTable messages={this.props.messages} />
            ) : (
              <SLStepperLicensee
                onSubmitMessage={this.props.onSubmitMessage}
                appState={this.props.appState}
                isSLConfirmed={this.props.isSLConfirmed}
                isSLRejected={this.props.isSLRejected}
                messages={this.props.messages}
                step={step}
                setSLState={this.props.setSLState}
              />
            )}
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default SmartLicenseLicensee;
