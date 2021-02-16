import React from "react";
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

class SmartLicense extends React.Component {
  state = {
    visible: true,
  };
  notificationAlert = React.createRef();
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Paper Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    this.notificationAlert.current.notificationAlert(options);
  }
  render() {
    return (
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Submit Smart License Data</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <Button color="primary" block className="btn-round">
                  Submit License Data
                </Button>
              </Col>

              <Col md ="6">
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
      </div>
    );
  }
}

export default SmartLicense;
