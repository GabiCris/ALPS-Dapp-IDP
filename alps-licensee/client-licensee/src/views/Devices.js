import React from "react";
import CollapsibleTable from "components/DevicesTable";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class Devices extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Active Devices</CardTitle>
                </CardHeader>
                <CardBody>
                  <CollapsibleTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Devices;
