/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import { CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const columns = ["IP", "Name", "Associated Smart License"];

// const data = [
//   ["01241", "Bluetooth v21.4", "SL1"],
//   ["91236", "Wi-Free 2", "SL2"],
// ];

const options = {
  filterType: "checkbox",
};

export default function DeviceIpTableExpansion(props) {

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <CardHeader>
              <CardTitle tag="h4">Associated Ips</CardTitle>
            </CardHeader>
            <CardBody>
              <MUIDataTable data={props.data} columns={columns} options={options} />
            </CardBody>
          </Col>
        </Row>
      </div>
    </>
  );
}
