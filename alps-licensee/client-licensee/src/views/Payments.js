/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { PaymentsPie } from "components/charts/PaymentsPie";
import dataPie from "components/charts/data-pay-pie.json";
import { ActLineChart } from "components/charts/ActLicLineChart";
import dataActLine from "components/charts/data-actLic-line.json";
import { Button, TextField } from "@material-ui/core";

class Payments extends React.Component {
  constructor(props) {
    super(props);
    // TODO: for 1 contract: convert state keys to dictionary w key: dataName; value: cacheCallValue
    // For n contracts: dict of key: contractName; value: dictionary of 1 contract
    this.state = {
      dueAmountKey: null,
      formAmount: "",
    };
  }
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract1 = drizzle.contracts.SmartLicense1;

    let dueAmountKey = contract1.methods["dueAmount"].cacheCall();

    //let contract1Map = this.getContractMap(contract1);
    this.setState({
      dueAmountKey: dueAmountKey,
    });
  }

  getPaymentData() {
    const { SmartLicense1 } = this.props.drizzleState.contracts;
    const dueAmount = SmartLicense1.dueAmount[this.state.dueAmountKey];
    let payment = dueAmount && dueAmount.value;
    return payment;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let paymentVal = this.getPaymentData();
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Due Amount</CardTitle>
                </CardHeader>
                <CardBody>
                  {/* <form noValidate autoComplete="off">
                    <TextField
                      id="standard-basic"
                      label="Standard"
                      onChange={(e) => {
                        this.setState({ formAmount: e.target.value });
                      }}
                    />
                  </form>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const {
                        SmartLicense1,
                      } = this.props.drizzleState.contracts;
                      SmartLicense1.methods.acknowledgePayment(10).send();
                    }}
                  >
                    Submit Payment
                  </Button> */}
                  <p>
                    <strong>Due Payment: </strong>
                    <ContractData
                      drizzle={this.props.drizzle}
                      drizzleState={this.props.drizzleState}
                      contract="SmartLicense1"
                      method="dueAmount"
                    />
                  </p>
                  <ContractForm
                    drizzle={this.props.drizzle}
                    contract="SmartLicense1"
                    method="acknowledgePayment"
                    labels={["Amount to subtract"]}
                  />
                  <ContractForm
                    drizzle={this.props.drizzle}
                    contract="SmartLicense1"
                    method="computeRoyalty"
                    labels={["Amount to add"]}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Outstanding Payments </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Payment Id</th>
                        <th>IP</th>
                        <th>Issue Date</th>
                        <th className="text-right">Sum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>012645</td>
                        <td>IP 3</td>
                        <td>2021-07-10</td>
                        <td className="text-right">$38,735</td>
                      </tr>
                      <tr>
                        <td>098612</td>
                        <td>IP 2</td>

                        <td>2021-09-26</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>013145</td>
                        <td>IP 7</td>
                        <td>2021-07-10</td>

                        <td className="text-right">$78,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card className="chart">
                <CardHeader>
                  <CardTitle tag="h5">Monthly Payments Breakdown</CardTitle>
                  <p className="card-category">February 2021</p>
                </CardHeader>
                <CardBody>
                  <PaymentsPie data={dataPie} />
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="chart">
                <CardHeader>
                  <CardTitle tag="h5">Annual Payments</CardTitle>
                </CardHeader>
                <CardBody>
                  <ActLineChart data={dataActLine} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Payments History</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Payment Id</th>
                        <th>IP</th>
                        <th>Issue Date</th>
                        <th>Payment Date</th>
                        <th className="text-right">Sum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>012836</td>
                        <td>IP 1</td>
                        <td>2021-02-10</td>
                        <td>2021-02-22</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>312362</td>
                        <td>IP 2</td>
                        <td>2021-07-10</td>
                        <td>2021-09-26</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>0126345</td>
                        <td>IP 4</td>
                        <td>2021-03-10</td>
                        <td>2021-05-26</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>012645</td>
                        <td>IP 3</td>
                        <td>2021-07-10</td>
                        <td>2021-09-26</td>
                        <td className="text-right">$38,735</td>
                      </tr>
                      <tr>
                        <td>098612</td>
                        <td>IP 2</td>
                        <td>2021-07-10</td>
                        <td>2021-09-26</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>013145</td>
                        <td>IP 7</td>
                        <td>2021-07-10</td>
                        <td>2021-09-26</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                      <tr>
                        <td>0129561</td>
                        <td>IP 2</td>
                        <td>2021-07-10</td>
                        <td>2021-09-26</td>
                        <td className="text-right">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Payments;
