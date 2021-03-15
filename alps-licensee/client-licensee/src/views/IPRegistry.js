/* eslint-disable no-unused-vars */
import React from "react";
import MUIDataTable from "mui-datatables";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import Box from "@material-ui/core/Box";

const columns = [
  "ID",
  "Name",
  "No. of Associated Models",
  "No. of Associated Devices",
];

const data = [
  ["01241", "Bluetooth v21.4", "25", "150.000"],
  ["91236", "Wi-Free 2", "570", "1.7b"],
  ["87142", "15G - Wave", "5", "800"],
  ["00132", "Tunnel Cable", "13", "93.750"],
];

const options = {
  filterType: "checkbox",
};

export default function IPRegistry() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Browse IP Data</CardTitle>
              </CardHeader>
              <CardBody>
                <MUIDataTable
                  data={data}
                  columns={columns}
                  options={options}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
