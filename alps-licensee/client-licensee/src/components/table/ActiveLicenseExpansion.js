import React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  Row,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Col,
} from "reactstrap";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import { ActLineChart } from "components/charts/ActLicLineChart";
import dataActLine from "components/charts/data-actLic-line.json";
import { Link } from "react-router-dom";

class ActiveLicensesExpansion extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <div className="card-simple">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Flat Payment Agreeement </CardTitle>
                <CardSubtitle tag="h6">E-Corp Ltd.</CardSubtitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4">
                    <Card className="card-simple">
                      <CardBody>
                        <ListGroup className="list-group-flush">
                          <ListGroupItemHeading>Summary</ListGroupItemHeading>
                          <ListGroupItem>Cras justo odio</ListGroupItem>
                          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                          <ListGroupItem>Vestibulum at eros</ListGroupItem>
                        </ListGroup>
                      </CardBody>
                    </Card>
                    <Row>
                      <Col md="6">
                        <Link to="/licensee/payments">
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
                                    <p className="card-category">
                                      Related Payments
                                    </p>
                                    <CardTitle tag="p"></CardTitle>
                                    <p />
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                            <CardFooter></CardFooter>
                          </Card>
                        </Link>
                      </Col>
                      <Col md="6">
                        <Link to={"/licensee/devices"}>
                          <Card className="card-stats">
                            <CardBody>
                              <Row>
                                <Col md="4" xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon nc-tile-56" />
                                  </div>
                                </Col>
                                <Col md="8" xs="7">
                                  <div className="numbers">
                                    <p className="card-category">
                                      Related Devices
                                    </p>
                                    <CardTitle tag="p"></CardTitle>
                                    <p />
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                            <CardFooter></CardFooter>
                          </Card>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="8">
                    <Card className="chart">
                      <ActLineChart data={dataActLine}></ActLineChart>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        125 <br />
                        <small>Related Devices</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        12/02/2020 <br />
                        <small>Contract Starting Date</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        254,6$ <br />
                        <small>Last Months Payments</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default ActiveLicensesExpansion;
