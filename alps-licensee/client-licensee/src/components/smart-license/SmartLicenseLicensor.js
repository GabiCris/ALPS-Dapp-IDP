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
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import CommentIcon from "@material-ui/icons/Comment";

import { FormGroup, Input } from "reactstrap";

function SLDetails() {
  const [open, setOpen] = React.useState(false);
  const [pk, setPk] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="comments">
        <CommentIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={10}
        maxWidth={10}
      >
        <DialogTitle id="form-dialog-title">
          Review Smart License Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agreement Details
          </DialogContentText>
          <FormGroup>
            <Input
              type="textarea"
              defaultValue="This Intellectual Property Assignment Agreement (“Agreement”) is being made between [Employee Name] (“Employee”) located at [Street Address, City, State] and [Employer Name] (“Employer”) located at [Street Address, City, State] on [Month DD, 20YY]. [Employee Name] and [Employer Name] may also be referred to as “Party” or together as the “Parties”.  This Agreement will become effective on [Month DD, 20YY] (“Effective Date”).

                The Parties agree to the following: 
                
                1.  Intellectual Property
                
                The Employee agrees to assign to the Employer all present and future right, title, and interest to all intellectual property (“Intellectual Property”) created or discovered during the course of their employment.  Intellectual Property includes, but is not limited to, algorithms, code, concepts, developments, designs, discoveries, ideas, formulas, improvements, inventions, processes, software, trademarks, and trade secrets.  Intellectual Property also includes the tangible embodiments (e.g. – drawings, notes) of any intangible items.
                
                2.  Prior Inventions
                
                Intellectual Property that existed prior to the Employee’s employment, for which the Employee has a right, title, or interest (collectively the “Prior Inventions”) will remain the exclusive property of the Employee.  The Employee agrees that all Prior Inventions are included in this Section 2.  If no Prior Inventions are listed in this Section 2, the Employee represents that no Prior Inventions exist.
                
                a.  Prior Inventions
                
                i. [List Prior Invention here]"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function FormDialog({ msg, ws }) {
  const [open, setOpen] = React.useState(false);
  const [pk, setPk] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const message = {
      message: msg.message,
      type: "ACCEPT",
      sign: pk,
    };
    ws.send(JSON.stringify(message));
    setOpen(false);
  };

  return (
    <div>
      <IconButton edge="end" aria-label="delete">
        <CheckCircleIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Confirm Smart License Creation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input Private Key to sign smart license creation.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Private Key"
            type="password"
            fullWidth
            onChange={(e) => {
              e.preventDefault();
              setPk(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function generate(arr, ws) {
  if (arr.length === 0) {
    return (
      <ListItem key={0}>
        <ListItemText primary={"No Smart Licenses needing approval"} />
      </ListItem>
    );
  }
  return arr.map((msg, index) => (
    //   React.cloneElement(element, {
    //     key: index,
    //   }),
    <>
      <ListItem key={index}>
        <ListItemText
          primary={msg.message}
          secondary={"Licensee: " + msg.licensee}
        ></ListItemText>
        <SLDetails></SLDetails>
        <FormDialog msg={msg} ws={ws} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <CancelIcon
              onClick={(e) => {
                e.preventDefault();
                const message = {
                  message: msg.message,
                  type: "REJECT",
                };
                ws.send(JSON.stringify(message));
              }}
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
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
    let verifiableSLs = Array.from(this.props.messages.values())
      .map((msg) => {
        if (msg.type === "CREATE") {
          return msg;
        }
      })
      .filter((e) => e !== undefined);

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
                  <List dense={false}>
                    {generate(verifiableSLs, this.props.ws)}
                  </List>
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
