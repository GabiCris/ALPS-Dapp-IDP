/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { ActLineChart } from "components/charts/ActLicLineChart";

const columns = [
  "Contract",
  "Event Type",
  "Block",
  "Transaction Value",
  "Previous Balance",
  "New Total Due",
  "Creation Date",
];

const columnsBilling = [
  "Contract",
  "Event Type",
  "Block",
  "Transaction Value",
  "Previous Balance",
  "New Total Due",
  "Creation Date",
  "Due Date",
];
// let data = [
//     ["1", "random", 21312],
//     ["", "1231", 124]
// ];
const options = {
  count: 5,
};

export default function PaymentsHistoryTable(props) {
  function getTableData() {
    let trHistory = props.billingData;
    console.log("tr hist", trHistory, props);
    let data = [{ id: "Due Payments Breakdown", data: [] }];
    let contr;
    for (let a of trHistory) {
      for (let tr of a) {
        contr = tr[0];
      }}
    for (let a of trHistory) {
      for (let tr of a) {
        if (tr[0] === contr){
        data[0].data.push({
          x: tr[7],
          y: parseInt(tr[3]),
        });
      }}
    }
    console.log("data", data)
    return data;
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <MUIDataTable
              title="New Billing Details"
              data={props.billingData[0]}
              columns={columnsBilling}
              // options={options}
            />
          </Col>
        </Row>
        <Row></Row>
        <Row>
        <Col md="12">
        <Card>
                <CardHeader>
                  <CardTitle tag="h5">Current Due Payments Breakdown</CardTitle>
                  {/* <p className="card-category">2021</p> */}
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <ActLineChart data={getTableData()} />
                  </div>
                </CardBody>
              </Card>
              </Col>
        </Row>

        <Row>
          <Col md="12">
            <MUIDataTable
              title="Payments History"
              data={props.historyData[0]}
              columns={columns}
              // options={options}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
