/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import Box from "@material-ui/core/Box";
import { DevicesBarChart } from "components/charts/DevicesBarChart";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import dataBarCh from "components/charts/data.json";
import "components/charts/chart.scss";
import { DevicesLineChart } from "components/charts/DevicesLineChart";
import dataLineCh from "components/charts/data-line.json";
import DeviceIpTableExpansion from "./DeviceIpTableExtension";

// const data1 = [
//   ["1111", "Bluetooth v21.4", "Contract 1"],
//   ["2222", "Wi-Free 2", "Contract 2"],
//   ["3333", "15G - Wave", "Contract 3"],
// ];
// const data2 = [
//   ["1111", "Bluetooth v21.4", "Contract 1"],
//   ["5555", "Tunnel Cable", "Contract 5"],
// ];

class DevicesTableExpansion extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <>
    
        <Box margin={1}>
          <Card>
            {console.log("INDEX: "+ this.props.dataIndex)}
            {console.log("DATA FOR ROW:", this.props.data[this.props.dataIndex])}
            <DeviceIpTableExpansion data={this.props.data[this.props.dataIndex]}/>
            {/* data={this.props.dataIndex == 0 ? data1 : data2}/> */}
          </Card>
        </Box>
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="chart">
                    <DevicesBarChart data={dataBarCh} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className="chart">
                    <DevicesLineChart data={dataLineCh} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default DevicesTableExpansion;
