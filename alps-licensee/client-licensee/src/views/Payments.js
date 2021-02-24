import React from "react";

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

class Payments extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Outstanding Payments</CardTitle>
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
