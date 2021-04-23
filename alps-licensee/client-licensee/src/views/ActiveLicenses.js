/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { Button, Row, Col } from "reactstrap";
import ActiveLicensesTable from "components/table/ActiveLicensesTable";

class ActiveLicenses extends React.Component {
  constructor(props) {
    super(props);
    this.getTableData = this.getTableData.bind(this);
    // TODO: for 1 contract: convert state keys to dictionary w key: dataName; value: cacheCallValue
    // For n contracts: dict of key: contractName; value: dictionary of 1 contract
    this.state = {
      contract1Map: null,
      aux: null,
      contracts: [],
      keysArr: [],
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

    let auxArr = [];
    for (let contract of drizzle.contractList) {
      try {
        let licenseeKey = contract.methods["licensee"].cacheCall();
        let licensorKey = contract.methods["licensor"].cacheCall();
        auxArr.push([contract.contractName, licenseeKey, licensorKey]);
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({
      keysArr: [...this.state.keysArr, auxArr],
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

  // componentDidUpdate() {
  //   let auxArr = [];
  //   for (let contract of this.props.drizzle.contractList) {
  //     try {
  //       let licenseeKey = contract.methods["licensee"].cacheCall();
  //       let licensorKey = contract.methods["licensor"].cacheCall();
  //       console.log("1 entry:", contract, licenseeKey, licensorKey);
  //       //keysM.set(contract, [licenseeKey, licensorKey]);
  //       auxArr.push([contract.contractName, licenseeKey, licensorKey]);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   console.log("aux", auxArr);
  //   this.setState({
  //     keysArr: [...this.state.keysArr, auxArr],
  //   });
  // }

  getTableData() {
    let newData = [];
    let i = 0;
    // console.log("state map", this.state.keysMap);
    // for (let contract of contracts) {
    //   const licensee = contract.licensee[this.state.keysArr[i][0]];
    //   const licensor = contract.licensor[this.state.keysArr[i][1]];
    //   newData.push([i, licensee && licensee.value, licensor && licensor.value]);
    //   i++;
    // }
    console.log("state", this.props.drizzleState);
    console.log("array of keys:", this.state.keysArr);
    for (let a of this.state.keysArr) {
      for (let instance of a) {
        if (instance.length === 3) {
          let contractName = instance[0];
          let currentContract = this.props.drizzleState.contracts[contractName];
          console.log("Contract name, contract", contractName, currentContract, instance[1], instance[2]);
          const licensee = currentContract.licensee[instance[1]];
          const licensor = currentContract.licensor[instance[2]];
          let dueAmount = null;
          if (contractName === "SmartLicense1") {
            let dueAm = currentContract.dueAmount[instance[1]];
          }
          newData.push([
            i,
            contractName,
            licensee && licensee.value,
            licensor && licensor.value,
            dueAmount && dueAmount.value,
          ]);
          i++;
        }
      }
    }
    console.log("data ACT LIC GET FUNC:", newData);
    // console.log("EXAMPLE:", this.props.drizzleState.contracts["0xb4715De57a52921a165BeAB9bDA33bc66204CC69"].licensee["0x0"]);

    return newData;
  }

  render() {
    let tableData = this.getTableData();
    return (
      <>
        <div className="content">
          <Row>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.onRefresh}
            >
              Refresh
            </Button>
          </Row>
          <Row>
            <Col md="12">
              <ActiveLicensesTable {...this.props} data={tableData} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ActiveLicenses;
