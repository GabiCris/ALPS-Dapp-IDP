/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import themecol from "ColorTheme";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const useStylesTextArea = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function getSteps() {
  return ["Create Smart License", "Verify With Licensor", "Confirm Creation"];
}

function getStepContent(
  step,
  onSubmitMessage,
  setActiveStep,
  handleComplete,
  isSLConfirmed,
  setLicensor,
  setSign,
  setDetails,
  licensor,
  sign,
  details,
  isSLRejected,
  setSLState,
  messages
) {
  let confirmed = false;
  const classes = useStylesTextArea();
  switch (step) {
    case 0:
      return (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Submit Smart License Data</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <TextField
                label="Smart License Title"
                id="filled-margin-none"
                placeholder="Title"
                style={{ margin: 8 }}
                className={classes.textField}
                variant="filled"
                onChange={(e) => setDetails(e.target.value)}
              />
            </Row>
            <Row>
              <TextField
                label="Licensor"
                id="filled-margin-none"
                placeholder="Licensor ID"
                className={classes.textField}
                variant="filled"
                onChange={(e) => setLicensor(e.target.value)}
              />

              {/* <TextField
                id="filled-full-width"
                label="Private Signature"
                style={{ margin: 8 }}
                placeholder="Signature"
                fullWidth
                variant="filled"
                onChange={(e) => setSign(e.target.value)}
              /> */}
            </Row>
            <Row>
              <Col md="6">
                <Button
                  color="primary"
                  block
                  className="btn-round"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitMessage(details, "CREATE", licensor, sign);
                    // this.setState({ message: "" });
                    handleComplete();
                    setActiveStep(1);
                  }}
                >
                  Submit License Data
                </Button>
              </Col>

              <Col md="6">
                <Link to="/licensee/filter">
                  <Button color="primary" block className="btn-round">
                    Download Smart Contract
                  </Button>
                </Link>
              </Col>
            </Row>

            <Row>
              <Col md="12" xs="12">
                <FormGroup>
                  <label>Contract Details</label>
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
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    case 1:
      return (
        <Card>
          {
            (confirmed = conditionalRender(
              isSLConfirmed,
              isSLRejected,
              handleComplete,
              setActiveStep,
              setSLState
            ))
          }
        </Card>
      );

    case 2:
      return conditionalRenderStep2(
        messages,
        details,
        isSLConfirmed,
        isSLRejected,
        handleComplete,
        setActiveStep,
        setSLState
      );
    default:
      return "Unknown step";
  }
}

function conditionalRender(
  isSLConfirmed,
  isSLRejected,
  handleComplete,
  setActiveStep,
  setSLState
) {
  if (isSLConfirmed || isSLRejected) {
    handleComplete();
    setActiveStep(2);
    // setSLState();
    return true;
  } else {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
        Awaiting Licensor Confirmation
      </Box>
    );
  }
}

function conditionalRenderStep2(
  messages,
  details,
  isSLConfirmed,
  isSLRejected,
  handleComplete,
  setActiveStep,
  setSLState
) {
  if (isSLConfirmed || isSLRejected) {
    setSLState();
  }
  let msg = messages.get(details);

  let confirmed = msg.type === "DEPLOYED";
  return (
    <Box display="flex" justifyContent="center" bgcolor="background.paper">
      <Box>
        {" "}
        {confirmed
          ? "SL confirmed. Deploying to blockchain..."
          : "Smart License deployment rejected."}{" "}
      </Box>
    </Box>
  );
}

export default function SLStepperLicensee({
  onSubmitMessage,
  appState,
  isSLConfirmed,
  isSLRejected,
  step,
  messages,
  setSLState,
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(step);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [licensor, setLicensor] = React.useState("");
  const [sign, setSign] = React.useState("");
  const [details, setDetails] = React.useState("");

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  // eslint-disable-next-line no-unused-vars
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => {
      prevActiveStep + 1;
    });
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={themecol}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const buttonProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(
                  activeStep,
                  onSubmitMessage,
                  setActiveStep,
                  handleComplete,
                  isSLConfirmed,
                  setLicensor,
                  setSign,
                  setDetails,
                  licensor,
                  sign,
                  details,
                  isSLRejected,
                  setSLState,
                  messages
                )}
              </Typography>
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}
