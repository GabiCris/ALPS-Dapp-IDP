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
import PaymentsHistoryTable from "components/table/PaymentsHistoryTable";

function timeConverter(UNIX_timestamp) {
  return new Date(UNIX_timestamp * 1000).toLocaleDateString("en-US");
}

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueAmountKey: null,
      formAmount: "",
      historyData: [],
      billingData: [],
    };
  }
  async componentDidMount() {
    const { smartLicenses } = this.props;
    let eventsHistory = [];
    let eventsBilling = [];
    const eventOptions = {
      fromBlock: 2,
      //   toBlock: 'latest'
    };
    for (let [key, value] of smartLicenses) {
      let pastEvents = await value.getPastEvents("allEvents", eventOptions);
      // value.events.RoyaltyComputed({})
      // .on('data', async function(event){
      //   console.log(event.log("payment EVENT HAPPENED", event.returnValues))
      // })
      // .on('error', console.error);
      for (let e of pastEvents) {
        if (e.event === "PaymentAcknowledged") {
          eventsHistory.push([
            e.address,
            e.event,
            e.blockNumber,
            e.returnValues._amount,
            e.returnValues._dueAmount - e.returnValues._amount,
            e.returnValues._dueAmount,
            timeConverter(e.returnValues._timestamp),
          ]);
        }
        if (e.event === "RoyaltyComputed") {
          eventsBilling.push([
            e.address,
            e.event,
            e.blockNumber,
            e.returnValues._amount,
            e.returnValues._dueAmount - e.returnValues._amount,
            e.returnValues._dueAmount,
            timeConverter(e.returnValues._timestamp),
          ]);
        }
      }
    }
    this.setState({
      historyData: [...this.state.historyData, ...[eventsHistory]],
      billingData: [...this.state.billingData, ...[eventsBilling]],
    });
    this.props.updateTransactionHistory(this.state.historyData);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <PaymentsHistoryTable
                historyData={this.state.historyData}
                billingData={this.state.billingData}
              />
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
        </div>
      </>
    );
  }
}

export default Payments;
