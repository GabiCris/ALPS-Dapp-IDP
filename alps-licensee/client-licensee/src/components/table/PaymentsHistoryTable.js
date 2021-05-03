/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const columns = [
  "Contract",
  "Event Type",
  "Block",
  "Transaction Value",
  "Previous Balance",
  "New Balance",
  "Date",
];
// let data = [
//     ["1", "random", 21312],
//     ["", "1231", 124]
// ];

export default function PaymentsHistoryTable(props) {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <MUIDataTable
                  title="Payments History"
                  data={props.historyData[0]}
                  columns={columns}
                />
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card>
              <CardBody>
                <MUIDataTable
                  title="New Billing Details"
                  data={props.billingData[0]}
                  columns={columns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
