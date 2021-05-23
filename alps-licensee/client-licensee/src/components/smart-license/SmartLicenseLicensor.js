/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";
import SLTable from "components/SLTable";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";

function generate(arr, ws) {
  return arr.map((msg, index) => (
    //   React.cloneElement(element, {
    //     key: index,
    //   }),
    <ListItem key={index}>
      <ListItemText primary={msg.message} secondary={"Licensee: " + msg.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <CheckCircleIcon
            onClick={(e) => {
              e.preventDefault();
              const message = {
                type: "ACCEPT",
              };
              // const message = { name: this.state.appState === "0" ? "LICENSEE" : "LICENSOR", message: messageString };
              ws.send(JSON.stringify(message));
            }}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
}

class SmartLicenseLicensor extends React.Component {
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

  render() {
    console.log("props in licensor", this.props.messages);
    let verifiableSLs = this.props.messages.map((msg) => {
      if (msg.type === "CREATE") {
        return msg;
      }
    }).filter(e => e !== undefined);

    console.log("MAPPED LIST:", verifiableSLs);
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
              <Tab label="Smart Licenses to Verify" value={0} />
              <Tab label="History" value={1} />
            </Tabs>
          </Paper>

          <Box mt={5}>
            {this.state.tabsValue ? (
              <SLTable messages={this.props.messages} />
            ) : (
              // RENDERING THE SLs AWAITING VERIFICATION BY THE LICENSOR
              <div>
                <Typography variant="h6">
                  Smart Licenses Awaiting Verification
                </Typography>
                <Card>
                  <List dense={true}>{generate(verifiableSLs, this.props.ws)}</List>
                </Card>
              </div>
            )}
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default SmartLicenseLicensor;
