/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import dataActLine2 from "components/charts/data-actLic-line2.json";
import { Link } from "react-router-dom";
import ActiveLicensesTable from "components/table/ActiveLicensesTable";
import { useParams } from "react-router";

class ActiveLicenses extends React.Component {
  constructor(props) {
    super(props);
    // TODO: for 1 contract: convert state keys to dictionary w key: dataName; value: cacheCallValue
    // For n contracts: dict of key: contractName; value: dictionary of 1 contract
    this.state = {
      contract1Map: null,
      licenseeKey: null,
      licensorKey: null,
      devicesKey: null,
      licenseeKey2: null,
      licensorKey2: null,
      devicesKey2: null,
      licenseeKey3: null,
      licensorKey3: null,
      devicesKey3: null,
    };
  }

  getContractMap(contract) {
    let dict = {};
    dict["licensee"] = contract.methods["licensee"].cacheCall();
    dict["licensor"] = contract.methods["licensor"].cacheCall();
    dict["devices"] = contract.methods["devices"].cacheCall();
    dict["startDate"] = contract.methods["startDate"].cacheCall();
    return dict;
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract1 = drizzle.contracts.SmartLicense1;
    const contract2 = drizzle.contracts.SmartLicense2;
    const contract3 = drizzle.contracts.SmartLicense3;
    console.log(contract1);
    let licenseeKeyA = contract1.methods["licensee"].cacheCall();
    let licensorKeyA = contract1.methods["licensor"].cacheCall();
    let devicesKeyA = contract1.methods["devices"].cacheCall();
    let licenseeKey2 = contract2.methods["licensee"].cacheCall();
    let licensorKey2 = contract2.methods["licensor"].cacheCall();
    let devicesKey2 = contract2.methods["devices"].cacheCall();
    let licenseeKey3 = contract3.methods["licensee"].cacheCall();
    let licensorKey3 = contract3.methods["licensor"].cacheCall();
    let devicesKey3 = contract3.methods["devices"].cacheCall();
    //let contract1Map = this.getContractMap(contract1);
    this.setState({
      licenseeKey: licenseeKeyA,
      licensorKey: licensorKeyA,
      devicesKey: devicesKeyA,
      licenseeKey2: licenseeKey2,
      licensorKey2: licensorKey2,
      devicesKey2: devicesKey2,
      licenseeKey3: licenseeKey3,
      licensorKey3: licensorKey3,
      devicesKey3: devicesKey3,
    });
  }

  getTableData() {
    const { SmartLicense1 } = this.props.drizzleState.contracts;
    const { SmartLicense2 } = this.props.drizzleState.contracts;
    const { SmartLicense3 } = this.props.drizzleState.contracts;
    const licensorData = SmartLicense1.licensor[this.state.licensorKey];
    const licenseeData = SmartLicense1.licensee[this.state.licenseeKey];
    const devicesData = SmartLicense1.devices[this.state.devicesKey];
    const licensorData2 = SmartLicense2.licensor[this.state.licensorKey2];
    const licenseeData2 = SmartLicense2.licensee[this.state.licenseeKey2];
    const devicesData2 = SmartLicense2.devices[this.state.devicesKey2];
    const licensorData3 = SmartLicense3.licensor[this.state.licensorKey3];
    const licenseeData3 = SmartLicense3.licensee[this.state.licenseeKey3];
    const devicesData3 = SmartLicense3.devices[this.state.devicesKey3];

    let keys = Object.keys(this.props.drizzle.contracts);
    let data = [
      [
        1,
        keys[1],
        undefined,
        devicesData && devicesData.value,
        licenseeData && licenseeData.value,
        licensorData && licensorData.value,
      ],
      [
        2,
        keys[2],
        undefined,
        devicesData2 && devicesData2.value,
        licenseeData2 && licenseeData2.value,
        licensorData2 && licensorData2.value,
      ],
      [
        3,
        keys[3],
        undefined,
        devicesData3 && devicesData3.value,
        licenseeData3 && licenseeData3.value,
        licensorData3 && licensorData3.value,
      ],
    ];
    return data;
  }

  render() {
    // DICT. keys are the contract names
    console.log(this.props.drizzle.contracts);
    console.log(this.state.contract1Map);
    let tableData = this.getTableData();
    return (
      <>
        {console.log(" DRIZZLESTATE ACTI LIC: ")}{" "}
        {console.log(this.props.drizzle)}
        <div className="content">
          <Row>
            <Col md="12">
              <ActiveLicensesTable data={tableData} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ActiveLicenses;
