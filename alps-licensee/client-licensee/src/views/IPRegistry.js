/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  "No. of Associated Devices",
  "Associated License",
];

const options = {
  filterType: "checkbox",
};

export default function IPRegistry(props) {
  const [deviceKeys, setDeviceKeys] = useState([]);

  // useEffect(() => {
  //   let {drizzle, deviceIds} = props;

  //   const oracle = drizzle.contracts.OracleDemo;
  //   for (let [contract, id] of deviceIds) {
  //     try {
  //       let priceKey = oracle.methods["deviceIdToNumber"].cacheCall(id);
  //       deviceKeys.push([contract, priceKey]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  // });

  function getDeviceNo() {
    let { OracleDemo } = props.drizzleState.contracts;
    let deviceNoMap = new Map();
    let devicesTotal = 0;

    for (let arr of deviceKeys) {
      let deviceNo = OracleDemo.deviceIdToNumber[arr[1]];
      if (deviceNo) {
        devicesTotal = devicesTotal + parseInt(deviceNo.value);
        deviceNoMap.set(arr[0], deviceNo.value);
      }
    }
    console.log("IP REG DEVICES MAP:", props.deviceNo, deviceNoMap);
  }

  function getTableData() {
    let { ipDeviceMap, slIpMap } = props;
    let data = [];
    let index = 1;

    let ipMap = new Map();
    for (let [sl, ip] of slIpMap) {
      ipMap.set(ip, sl);
    }
    // Iterate through all IPS
    for (let ip of ipDeviceMap.keys()) {
      data.push([index++, ip, ipDeviceMap.get(ip).length, ipMap.get(ip)]);
    }
    return data;
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <MUIDataTable
              data={getTableData()}
              columns={columns}
              options={options}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
