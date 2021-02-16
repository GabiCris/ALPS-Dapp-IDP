import React from "react";
import CollapsibleTable from "components/DevicesTable";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
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
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Device Id</th>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th className="text-right">No. of Active Devices</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>012645</td>
                        <td>Device 3</td>
                        <td>Man No.1</td>
                        <td className="text-right">120</td>
                      </tr>
                      <tr>
                        <td>098612</td>
                        <td>Device 2</td>

                        <td>Manuf 2</td>
                        <td className="text-right">15</td>
                      </tr>
                      <tr>
                        <td>013145</td>
                        <td>Device 7</td>
                        <td>Manufacturer 4</td>

                        <td className="text-right">73</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col md="12">
                <CollapsibleTable/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Devices;
