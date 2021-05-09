/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import DevicesTable from "components/table/DevicesTable";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter,
} from "react-router-dom";

import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.getTableData = this.getTableData.bind(this);
    this.getDeviceNo = this.getDeviceNo.bind(this);
    this.getDevicePrice = this.getDevicePrice.bind(this);
    this.state = { id: "", keysArr: [], oracleArr: [], oracleArrPrice: [] };
  }
  componentDidMount() {
    const { drizzle } = this.props;
    console.log("DEVICES PROPS", this.props);
    const { deviceManagers, deviceIds } = this.props;

    // get Device ID/contract addr from a prev computed data structure
    const oracle = drizzle.contracts.OracleDemo;
    let orArr = [];
    let oracleArrPrice = [];
    try {
      let oracleMapKey1 = oracle.methods["deviceIdToNumber"].cacheCall(1000);
      orArr.push(oracleMapKey1);
      let oracleMapKey2 = oracle.methods["deviceIdToNumber"].cacheCall(2000);
      orArr.push(oracleMapKey2);
    } catch (e) {
      console.log(e);
    }
    for (let id of deviceIds.values()) {
      try {
        let priceKey = oracle.methods["deviceIdToPrice"].cacheCall(id);
        oracleArrPrice.push([id, priceKey]);
      } catch (e) {
        console.log(e);
      }
    }

    let auxArr = [];
    for (let contract of drizzle.contractList) {
      if (deviceManagers.has(contract.contractName)) {
        try {
          let ipMapKey1 = contract.methods["ipContractsMap"].cacheCall(1111);
          let ipMapKey2 = contract.methods["ipContractsMap"].cacheCall(2222);
          let ipMapKey3;
          try {
            ipMapKey3 = contract.methods["ipContractsMap"].cacheCall(3333);
          } catch (e) {
            console.log(e);
          }
          let licenseeKey = contract.methods["licensee"].cacheCall();
          let nameKey = contract.methods["deviceName"].cacheCall();
          auxArr.push([
            contract.contractName,
            licenseeKey,
            ipMapKey1,
            ipMapKey2,
            ipMapKey3,
            nameKey,
          ]);
        } catch (e) {
          console.log(e);
        }
      }
    }
    this.setState({
      keysArr: [...this.state.keysArr, auxArr],
      oracleArr: [...this.state.oracleArr, ...orArr],
      oracleArrPrice: [...this.state.oracleArrPrice, ...oracleArrPrice],
    });
    //let contract1Map = this.getContractMap(contract1);
    // let contracts = drizzle.contracts;
    // for (var key of Object.keys(drizzle.contracts)) {
    //   console.log(key + " -> " + drizzle.contracts[key]);
    //   let licenseeKey = contracts[key].methods["licensee"].cacheCall();
    //   let licensorKey = contracts[key].methods["licensor"].cacheCall();
    //   keysM.set(contracts[key], [licenseeKey, licensorKey]);
    // }
    this.setState({
      contracts: JSON.parse(localStorage.getItem("contracts")),
    });
  }

  getTableData() {
    let newData = [];
    let i = 0;
    let ipArr = [];

    let { OracleDemo } = this.props.drizzleState.contracts;
    console.log("ORACLE", OracleDemo, this.state.oracleArr);
    for (let a of this.state.keysArr) {
      for (let instance of a) {
        if (instance.length >= 2) {
          let contractName = instance[0];
          let currentContract = this.props.drizzleState.contracts[contractName];
          let licensee = currentContract.licensee[instance[1]];
          let name = currentContract.deviceName[instance[5]];
          let ipMap1 = currentContract.ipContractsMap[instance[2]];
          let ipMap2 = currentContract.ipContractsMap[instance[3]];
          let ipMap3;
          try {
            ipMap3 = currentContract.ipContractsMap[instance[4]];
          } catch (e) {
            console.log(e);
          }
          console.log(
            "IPMAP value:",
            ipMap1 && ipMap1.value,
            ipMap2 && ipMap2.value,
            ipMap3 && ipMap3.value
          );
          let deviceNo = OracleDemo.deviceIdToNumber[this.state.oracleArr[0]];
          ipArr.push(
            [
              ipMap1 && ["1111", ipMap1.value],
              ipMap2 && ipMap2.value !== ""
                ? ["2222", ipMap2.value]
                : undefined,
              ipMap3 && ipMap3.value !== ""
                ? ["3333", ipMap3.value]
                : undefined,
            ].filter((x) => x !== undefined)
          );
          newData.push([
            i,
            name && name.value,
            contractName,
            licensee && licensee.value,
            //deviceNo && deviceNo.value,
            //Math.floor(Math.random() * 500) + 1,
          ]);
          i++;
        }
      }
    }
    newData.push(ipArr);
    // console.log("EXAMPLE:", this.props.drizzleState.contracts["0xb4715De57a52921a165BeAB9bDA33bc66204CC69"].licensee["0x0"]);

    return newData;
  }

  getDeviceNo() {
    let { OracleDemo } = this.props.drizzleState.contracts;
    let data = [];
    for (let key of this.state.oracleArr) {
      let deviceNo = OracleDemo.deviceIdToNumber[key];
      data.push(deviceNo && deviceNo.value);
    }
    return data;
  }

  getDevicePrice() {
    let { OracleDemo } = this.props.drizzleState.contracts;
    let data = [];
    for (let arr of this.state.oracleArrPrice) {
      let id = arr[0];
      let key = arr[1];
      let price = OracleDemo.deviceIdToPrice[key];
      // data.push([id, price && price.value]);
      data.push(price && price.value);
    }
    return data;
  }

  render() {
    let tableData = this.getTableData();
    let deviceNoData = this.getDeviceNo();
    let devicePrice = this.getDevicePrice();
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <DevicesTable
                data={tableData}
                deviceNo={deviceNoData}
                devicePrice={devicePrice}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(Devices);
