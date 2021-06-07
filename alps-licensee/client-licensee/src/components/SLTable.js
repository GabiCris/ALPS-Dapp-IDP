/* eslint-disable react/prop-types */
import React from "react";
import MUIDataTable from "mui-datatables";
import theme from "ColorTheme";
import { ThemeProvider } from "@material-ui/styles";

const columns = [
  {
    name: "message",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "licensee",
    label: "Licensee",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "licensor",
    label: "Licensor",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "type",
    label: "State",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "address",
    label: "Created SL adr.",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const options = {
  filterType: "checkbox",
};

// eslint-disable-next-line no-unused-vars
export default function SLTable({ messages }) {
 let data = [];
//  let messagesLocalStorage = new Map(JSON.parse(localStorage.messageMap));
 for (let msg of messages.values()) {
   data.push(msg);
 }

  return (
    <div>
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
