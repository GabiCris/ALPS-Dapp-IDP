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

class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     token: "",
  //   };
  // }

  render() {
    // if (!this.state.token) {
    //   return <SignInSide setToken={this.setState()}></SignInSide>;
    // } else {
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
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Monthly Fees</p>
                        <CardTitle tag="p">$ 350</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
              </Link>
            </Col>
            <Col lg="3" md="6" sm="6">
            <Link to={"/licensee/payments"}>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Balance</p>
                        <CardTitle tag="p">$ 1,245</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> In the last hour
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
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Active Licenses</p>
                        <CardTitle tag="p">6</CardTitle>
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
                        <SettingsInputAntennaOutlinedIcon fontSize="large" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Active Devices</p>
                        <CardTitle tag="p">225</CardTitle>
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
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Device Usage Statistics</CardTitle>
                  <p className="card-category">February 2021</p>
                </CardHeader>
                <CardBody>
                        <div className="chart">
                          <DevicesLineChart data={dataLineCh} />
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
