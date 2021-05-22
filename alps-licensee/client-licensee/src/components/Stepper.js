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
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
}));


function getSteps() {
  return ["Create Smart License", "Verify With Licensor", "Confirm Creation"];
}

function getStepsLicensor() {
  return ["Confirm Smart License", "Confirm Creation"];
}

function getStepContent(step, onSubmitMessage, setActiveStep, handleComplete, isSLConfirmed) {
  let o = 0;
  switch (step) {
    case 0:
      return (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Submit Smart License Data</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <Button
                  color="primary"
                  block
                  className="btn-round"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitMessage("New Smart License " + o, "SUBMIT");
                    o++;
                    // this.setState({ message: "" });
                    handleComplete();
                    setActiveStep(1);
                  }}
                >
                  Submit License Data
                </Button>
              </Col>

              <Col md="6">
                <Button color="primary" block className="btn-round">
                  Download Smart Contract
                </Button>
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
      return ( <Card>
        {conditionalRender(isSLConfirmed, handleComplete, setActiveStep)}
        </Card>);
      
    case 2:
      return "Step 3: Both parties have confirmed - Card where you can see that the SL was succesfully uploaded onto the chain.";
    default:
      return "Unknown step";
  }
}

function conditionalRender(isSLConfirmed, handleComplete, setActiveStep) {
  if (isSLConfirmed) {
    handleComplete();
    setActiveStep(2);
  }
  else {
    return (<Box display="flex" justifyContent="center">
     <CircularProgress />
     Awaiting Licensor Confirmation
  </Box>)
  }
}
// "Step 2: Card with Licensee-Licensee Interaction"
function getStepContentLicensor(
  step,
  onSubmitMessage,
  setActiveStep,
  handleComplete
) {
  let o = 0;
  switch (step) {
    case 0:
      return (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Smart Licenses Awaiting Confirmation</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Card>
                <Col>Smart License 1</Col>
                <Col>
                  <Button
                    color="primary"
                    block
                    className="btn-round"
                    onClick={(e) => {
                      e.preventDefault();
                      onSubmitMessage("Confirm Smart License " + o, "CONFIRM");
                      o++;
                      handleComplete();
                      setActiveStep(1);
                    }}
                  >
                    Confirm Smart License
                  </Button>
                </Col>
              </Card>
            </Row>
          </CardBody>
        </Card>
      );
    case 1:
      return "Smart License Confirmed, Deploying...";
    default:
      return "Unknown step";
  }
}

export default function HorizontalNonLinearAlternativeLabelStepper({
  onSubmitMessage,
  appState,
  isSLConfirmed,
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = appState === "1" ? getStepsLicensor() : getSteps();

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

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                {appState === "1"
                  ? getStepContentLicensor(
                      activeStep,
                      onSubmitMessage,
                      setActiveStep,
                      handleComplete,
                    )
                  : getStepContent(
                      activeStep,
                      onSubmitMessage,
                      setActiveStep,
                      handleComplete,
                      isSLConfirmed
                    )}
              </Typography>
              {/* <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>

                {activeStep !== steps.length &&
                  (completed.has(activeStep) ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </div> */}
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}
