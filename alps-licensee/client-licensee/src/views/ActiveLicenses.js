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
        let dueAmountKey;
        try {
          dueAmountKey = contract.methods["dueAmount"].cacheCall();
        } catch (e) {
          console.log(e);
        }
        auxArr.push([
          contract.contractName,
          licenseeKey,
          licensorKey,
          dueAmountKey,
        ]);
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

  getTableData() {
    let newData = [];
    let i = 0;
    console.log("state", this.props.drizzleState);
    console.log("array of keys:", this.state.keysArr);
    for (let a of this.state.keysArr) {
      for (let instance of a) {
        if (instance.length >= 3) {
          let contractName = instance[0];
          let currentContract = this.props.drizzleState.contracts[contractName];
          console.log(
            "Contract name, contract",
            contractName,
            currentContract,
            instance[1],
            instance[2]
          );
          const licensee = currentContract.licensee[instance[1]];
          const licensor = currentContract.licensor[instance[2]];
          let dueAmount;
          try {
            dueAmount = currentContract.dueAmount[instance[3]];
          } catch (e) {
            console.log(e);
          }
          if (contractName === "SmartLicense1") {
            dueAmount = currentContract.dueAmount[instance[3]];
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
