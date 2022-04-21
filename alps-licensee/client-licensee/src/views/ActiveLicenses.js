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
        let dateKey = contract.methods["startDate"].cacheCall();
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
          dateKey,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({
      keysArr: [...this.state.keysArr, auxArr],
    });

    this.setState({
      contracts: JSON.parse(localStorage.getItem("contracts")),
    });
  }

  getTableData() {
    let newData = [];
    let i = 0;
    for (let a of this.state.keysArr) {
      for (let instance of a) {
        if (instance.length >= 3) {
          let contractName = instance[0];
          let currentContract = this.props.drizzleState.contracts[contractName];
        
          const licensee = currentContract.licensee[instance[1]];
          const licensor = currentContract.licensor[instance[2]];
          const date = currentContract.startDate[instance[4]];
          let dueAmount;
          try {
            dueAmount = currentContract.dueAmount[instance[3]];
          } catch (e) {
            console.log(e);
          }

          newData.push([
            i,
            contractName,
            licensee && licensee.value,
            licensor && licensor.value,
            dueAmount && dueAmount.value,
            date && date.value,
          ]);
          i++;
        }
      }
    }

    return newData;
  }

  getRoyaltyLicensesData() {
    let tableData = [];
    let i = 0;
    for (let [adr, val] of this.props.slIpMap) {
      tableData.push([i++, adr, val[0], val[1], 0]);
    }
    return tableData;
  }

  render() {
    // let tableData = this.getTableData();
    let tableData = this.getRoyaltyLicensesData();
    console.log("table data", tableData)
    return (
      <>
        <div className="content">
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
