/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

import SettingsInputAntennaOutlinedIcon from "@material-ui/icons/SettingsInputAntennaOutlined";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";

import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import SignInSide from "components/login/SignInSlide";
import { PaymentsPie } from "components/charts/PaymentsPie";
import dataPie from "components/charts/data-pay-pie.json";
import { ActLineChart } from "components/charts/ActLicLineChart";
import dataActLine from "components/charts/data-actLic-line.json";
import dataLineCh from "components/charts/data-line.json";
import { DevicesLineChart } from "components/charts/DevicesLineChart";
import { DashboardBarGraph } from "components/charts/DashboardBarGraph";

function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  }

  return text.substr(0, length) + "\u2026";
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.getDueAmount = this.getDueAmount.bind(this);
    this.getDeviceNo = this.getDeviceNo.bind(this);
    this.state = {
      keysArr: [],
      dueAmount: 0,
      activeLicensesNo: 0,
      noIps: 0,
      deviceNo: [],
    };
  }

  componentDidMount() {
    let { drizzle, smartLicenses, ips, deviceIds } = this.props;
    let licensesNo = smartLicenses.size;
    let noIps = ips.get(0).size;
    this.setState({
      activeLicensesNo: licensesNo,
      noIps: noIps,
    });
    let auxArr = [];
    for (let [address, value] of smartLicenses) {
      try {
        let dueAmountKey = drizzle.contracts[address].methods[
          "dueAmount"
        ].cacheCall();
        let licensorKey = drizzle.contracts[address].methods[
          "licensor"
        ].cacheCall();
        auxArr.push([address, dueAmountKey, licensorKey]);
      } catch (e) {
        console.log("dashboard err", e);
      }
    }

    const oracle = drizzle.contracts.OracleDemo;
    let oracleArr = [];
    for (let [contract, id] of deviceIds) {
      try {
        let priceKey = oracle.methods["deviceIdToNumber"].cacheCall(id);
        oracleArr.push([contract, priceKey]);
      } catch (e) {
        console.log(e);
      }
    }

    if (auxArr.length !== 0) {
      this.setState({
        keysArr: [...this.state.keysArr, auxArr],
        deviceNo: [...this.state.deviceNo, ...oracleArr],
      });
    }
  }

  getDueAmount() {
    let totalDueAmount = 0;
    let dueAmountData = [];
    for (let a of this.state.keysArr) {
      for (let instance of a) {
        let contractName = instance[0];
        let currentContract = this.props.drizzleState.contracts[contractName];
        const dueAmount = currentContract.dueAmount[instance[1]];
        const licensor = currentContract.licensor[instance[2]];
        dueAmountData.push([
          contractName,
          licensor && truncateText(licensor.value, 15),
          dueAmount && dueAmount.value,
        ]);
        if (dueAmount) {
          totalDueAmount = totalDueAmount + parseInt(dueAmount.value);
        }
      }
    }

    return [totalDueAmount, dueAmountData];
  }

  getDeviceNo() {
    let { OracleDemo } = this.props.drizzleState.contracts;
    let { ips } = this.props;
    let deviceNoMap = new Map();
    let devicesTotal = 0;
    for (let arr of this.state.deviceNo) {
      let deviceNo = OracleDemo.deviceIdToNumber[arr[1]];
      if (deviceNo) {
        devicesTotal = devicesTotal + parseInt(deviceNo.value);
        deviceNoMap.set(arr[0], deviceNo.value);
      }
    }

    let ipMap = new Map();
    for (let ip of ips.get(0)) {
      ipMap.set(ip.toString(), []);
    }
    for (let [key, value] of ips) {
      if (key !== 0) {
        for (let ip of value) {
          ipMap.get(ip.toString()).push(key);
        }
      }
    }
    console.log("GET DEVICE NO MAP", ipMap);
    let ipBarData = [];
    for (let [_ip, deviceList] of ipMap) {
      if (deviceList.length === 1) {
        const d = deviceList[0];
        let aux = {};
        aux["ip"] = _ip;
        aux[d] = deviceNoMap.get(d);
        ipBarData.push(aux);
      }
      if (deviceList.length === 2) {
        const d1 = deviceList[0];
        const d2 = deviceList[1];
        let aux = {};
        aux["ip"] = _ip;
        aux[d1] = deviceNoMap.get(d1);
        aux[d2] = deviceNoMap.get(d2);
        ipBarData.push(aux);
      }
    }
    console.log("BAR CHART DATA", ipBarData)
    return [devicesTotal, ipBarData];
  }

  transformGraphData(data) {
    let trData = [];
    let id = 0;
    for (let instance of data) {
      trData.push({
        id: instance[1],
        value: parseInt(instance[2]),
        // "label": instance[1],
      });
      id++;
    }
    return trData;
  }

  getDeviceUsageGraphData() {
    let trData = [];
    let { slIpMap, ips } = this.props;

    //init map with ip => transactions list
    let ipMap = new Map();
    for (let ip of ips.get(0)) {
      ipMap.set(ip.toString(), []);
    }
    console.log("SLIPMAP", slIpMap);
    console.log("ipMap b4", ipMap);
    console.log("DEVICE USAGE DATA", this.props.transactionHistory);
    // iterate through transactions -> add to ipMap

    for (let a of this.props.transactionHistory) {
      let rDate = randomDate(new Date(2021, 0, 1), new Date());
      for (let instance of a) {
        let trIp = slIpMap.get(instance[0]);
        console.log("instance", trIp);
        if (ipMap.has(trIp)) {
          // ipMap.get(trIp).push({ x: instance[6], y: parseInt(instance[5]) });

          ipMap.get(trIp).push({
            x: rDate.toISOString().split("T")[0],
            y: parseInt(instance[5]),
          });
          rDate = randomDate(rDate, new Date());
        }
      }
    }
    console.log("Device Usage ipMap", ipMap);
    for (let [key, value] of ips) {
      if (key !== 0) {
        let a = [];
        for (let ip of value) {
          a = a.concat(ipMap.get(ip.toString()));
          console.log(ip, ipMap.get(ip.toString()));
        }
        trData.push({
          id: key,
          data: a,
        });
      }
    }
    console.log("FINAL TR DATA", trData);
    return trData;
  }

  render() {
    let data = this.getDueAmount();
    let dueAmount = data[0];
    let paymentGraphData = this.transformGraphData(data[1]);
    let deviceUsageData = this.getDeviceUsageGraphData();

    let aux_data = this.getDeviceNo();
    let deviceNo = aux_data[0];
    let barGraphData = aux_data[1];
    console.log("DASHBOARD PROPS TR HIST", paymentGraphData);
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Link to={"/licensee/payments"}>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <AccountBalanceWalletIcon
                            fontSize="large"
                            style={{ color: "#51cbce" }}
                          />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Total Amount Due</p>
                          <CardTitle tag="p">$ {dueAmount}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="fas fa-sync-alt" /> See Transaction History
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Link to={"/licensee/ip"}>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <AccountBalanceIcon
                            fontSize="large"
                            style={{ color: "#51cbce" }}
                          />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">IPs</p>
                          <CardTitle tag="p"> {this.state.noIps}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="far fa-clock" /> Averaging {(this.state.noIps/this.props.deviceManagers.size).toFixed(1)} IPs per active Device
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Link to={"/licensee/licenses"}>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <GraphicEqIcon
                            fontSize="large"
                            style={{ color: "#51cbce" }}
                          />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Active Licenses</p>
                          <CardTitle tag="p">
                            {this.state.activeLicensesNo}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="far fa-calendar" /> Last day
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Link to={"/licensee/devices"}>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <SettingsInputAntennaOutlinedIcon
                            fontSize="large"
                            style={{ color: "#51cbce" }}
                          />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <p className="card-category">Device Instances</p>
                          <CardTitle tag="p">{deviceNo}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="far fa-calendar" /> Total of {this.props.deviceManagers.size} devices
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <Card className="chart">
                <CardHeader>
                  <CardTitle tag="h5">Payments Breakdown</CardTitle>
                  <p className="card-category">March 2021</p>
                </CardHeader>
                <CardBody>
                  <PaymentsPie
                    data={paymentGraphData}
                    paymentData={paymentGraphData}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="chart">
                {/* <CardHeader>
                  <CardTitle tag="h5">Annual Payments</CardTitle>
                </CardHeader>
                <CardBody>
                  <ActLineChart data={dataActLine} />
                </CardBody> */}
                <CardHeader>
                  <CardTitle tag="h5">Ip-Device Distribution</CardTitle>
                </CardHeader>
                <CardBody>
                  <DashboardBarGraph data={barGraphData} devices={Array.from(this.props.deviceManagers.keys())}/>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Device Payments Statistics</CardTitle>
                  <p className="card-category">2021</p>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <DevicesLineChart data={deviceUsageData} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
// }

export default Dashboard;
