/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Row, Col, Card } from "reactstrap";
import themecol from "ColorTheme";
import LoginTabs from "components/login/LoginTabs";

import logoAlps from "ALPSlogo.png";
import logoca from "assets/logos/ca-logo.png";
import logoifm from "assets/logos/ifm-logo.png";
import logopitch from "assets/logos/pitchin-logo.svg";
import backgr1 from "assets/backgrounds/background1.jpg";

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        ALPS
        {" " + new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: logoAlps,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#A9C47F",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide({ setToken }) {
  const classes = useStyles();
  const [userToken, setUserToken] = useState();

  return (
    <ThemeProvider theme={themecol}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.image}>
          <div className="hover08 img-background">
          <figure><img className="img-background" src={backgr1} /></figure>
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Box mb={10}>
              <Grid item>
                <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Licensee" />
                  <Tab label="Licensor" />
                  <Tab label="Financial" />
                </Tabs>
              </Grid>
            </Box>
            <Avatar className={classes.avatar}>
              <img src={logoAlps} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user-address"
                label="ID"
                name="ID"
                autoComplete="Address"
                autoFocus
                onChange={(e) => {
                  setUserToken(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => setToken(userToken)}
              >
                Sign In
              </Button>
              <Grid container></Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
              <Box mt={18} px={10}>
                <div className="logo">
                  <Row>
                    <Col>
                      <div className="img-logo">
                        <img src={logoca} alt="react-logo" align="bottom" />
                      </div>
                    </Col>
                    <Col>
                      <div className="img-logo">
                        <img src={logoifm} alt="react-logo" />
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <img src={logopitch} alt="react-logo" />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

SignInSide.propTypes = {
  setToken: PropTypes.func,
};
