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

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import CardSubtitle from "reactstrap/lib/CardSubtitle";

class LicensorDetails extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
              <CardHeader>
            <CardTitle tag="h4">Licensor Name</CardTitle>
            <CardSubtitle tag="h5">@licensor-name</CardSubtitle>
           </CardHeader>
                <CardBody>

                  <p className="description text-center">
                    Some info about licensor <br />
                    Other info <br />Other info 2
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          2 <br />
                          <small>IPs</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          12/02/2020 <br />
                          <small>First Contract Date</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          254,6$ <br />
                          <small>Royalty Payments to Date</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Contact Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          Susan Weissman <br />
                          <span className="text-muted">

                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          Timothy Tim <br />
                          <span className="text-success">

                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            
                          </div>
                        </Col>
                        <Col className="col-ms-7" xs="7">
                          ALex ALexander <br />
                          <span className="text-danger">

                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            defaultValue="Manufacturer Code Inc."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Ip Name</label>
                          <Input
                            defaultValue="Cool Gadget #3"
                            placeholder="Ip Name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="main-contact">
                            Main Contact
                          </label>
                          <Input placeholder="Email" type="email" defaultValue="company@bing.com" disabled />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Melbourne"
                            placeholder="City"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Australia"
                            placeholder="Country"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" disabled />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Contract Details</label>
                          <Input
                            type="textarea"
                            defaultValue="Phasellus condimentum ipsum et leo vulputate, quis congue ex vehicula. Pellentesque vitae nunc nulla. Aliquam sem dui, aliquet eu condimentum pulvinar, posuere id dolor. "
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default LicensorDetails;
