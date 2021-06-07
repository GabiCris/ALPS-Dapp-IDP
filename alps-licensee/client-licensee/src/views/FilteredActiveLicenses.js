/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const columns = ["ID", "Licensee", "State", "Message", "Licensor"];

const data = [
  ["01241", "License co.1", "10/09/2020", "Pending"],
  ["91236", "License Demo", "05/02/2021", "Failed"],
  ["87142", "E-Device sl-integrated", "20/11/2020", "Accepted"],
  ["00132", "SL Demo Mock", "13/03/2021", "Failed"],
];

const options = {
  filterType: "checkbox",
};

export default function FilteredActiveLicenses(props) {
  let { id } = useParams();
  let [licenseeKey, setLicenseeKey] = useState(0);
  let [licensorKey, setLicensorKey] = useState(0);
  let [dateKey, setDateKey] = useState(0);
  let [dueAmountKey, setDueAmountKey] = useState(0);

  useEffect(() => {
    const { drizzle } = props;
    let contract = drizzle.contracts[id];
    if (contract !== undefined) {
      try {
        setLicenseeKey(contract.methods["licensee"].cacheCall());
        setLicensorKey(contract.methods["licensor"].cacheCall());
        setDateKey(contract.methods["startDate"].cacheCall());
        setDueAmountKey(contract.methods["dueAmount"].cacheCall());
      } catch (e) {
        console.log(
          "Could not retrieve Contract data for single filtering: ",
          e
        );
      }
    }
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  function getLicenseData() {
    let { drizzleState } = props;
    let currentContract = drizzleState.contracts[id];
    let licensee, licensor, date, dueAmount;
    try {
      licensee = currentContract.licensee[licenseeKey];
      licensor = currentContract.licensor[licensorKey];
      date = currentContract.startDate[dateKey];
      dueAmount = currentContract.dueAmount[dueAmountKey];
    } catch (e) {
      console.log(
        "Error while attempting to fetch fresh data from DRIZZLE: ",
        e
      );
    }
    let data = [
      [
        0,
        id,
        licensee && licensee.value,
        licensor && licensor.value,
        dueAmount && dueAmount.value,
        date && date.value,
      ],
    ];
    return data;
  }

  return (
    <>
      <div className="content">
        {/* <h2>ID: {id}</h2> */}
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={"License " + id}
            data={getLicenseData()}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
