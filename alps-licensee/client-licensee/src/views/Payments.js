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
      for (let e of pastEvents) {
        if (e.event === "PaymentAcknowledged") {
          eventsHistory.push([
            e.address,
            e.event,
            e.blockNumber,
            e.returnValues._amount,
            e.returnValues._dueAmount,
            parseInt(e.returnValues._dueAmount) - parseInt(e.returnValues._amount),
            timeConverter(e.returnValues._timestamp),
          ]);
        }
        if (e.event === "RoyaltyComputed") {
          eventsBilling.push([
            e.address,
            e.event,
            e.blockNumber,
            e.returnValues._amount,
            e.returnValues._dueAmount,
            parseInt(e.returnValues._dueAmount) + parseInt(e.returnValues._amount),
            timeConverter(e.returnValues._timestamp),
            timeConverter(e.returnValues._deadline),
          ]);
          console.log("EVENT EMITTER DEADLINE:" ,timeConverter(e.returnValues._deadline));
        }
      }
    }
    this.setState({
      historyData: [...this.state.historyData, ...[eventsHistory]],
      billingData: [...this.state.billingData, ...[eventsBilling]],
    });
    this.props.updateTransactionHistory(this.state.billingData);
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
          
        </div>
      </>
    );
  }
}

export default Payments;
