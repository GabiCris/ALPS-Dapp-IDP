/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";
import { useParams } from "react-router";

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

export default function FilteredActiveLicenses() {
  let {id} = useParams();
  return (
    <div>
      <h2>ID: {id}</h2>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Smart Licenses"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}