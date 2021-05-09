/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable, { ExpandButton } from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ActiveLicenseExpansion from "components/table/ActiveLicenseExpansion";
import mockData from "assets/mock-data/activeLicensesTable-data";
import DevicesTableExpansion from "./DevicesTableExpansion";

class LicensorDetailsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  getTableData() {
    let licensorsMap = this.props.data;
    let data = [];
    let i = 0;
    let r = 3;
    for (let [licensor, occurances] of licensorsMap.entries()) {
      data.push([i, licensor, r, occurances.length]);
      r = r*7;
      i++;
    }
    return data;
  }
  getExtensionsData() {
    let tableData = this.props.data;
    return tableData[tableData.length - 1];
  }
  render() {
    const columns = [
      {
        name: "ID",
        options: {
          filter: false,
        },
      },
      {
        name: "Licensor",
        options: {
          filter: true,
        },
      },
      {
        name: "Website",
        options: {
          filter: true,
        },
      },
      {
        name: "No. Devices",
        options: {
          filter: true,
        },
      },
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "standard",
      selectableRowsHeader: false,
      selectableRows: "none",
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      isRowExpandable: (dataIndex, expandedRows) => {
        //if (dataIndex === 3 || dataIndex === 4) return false;

        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (
          expandedRows.data.length > 4 &&
          expandedRows.data.filter((d) => d.dataIndex === dataIndex).length ===
            0
        )
          return false;
        return true;
      },
      // Rows that are expanded sinces loading the table. Would probably never want to start with a Row expanded in this view
      // rowsExpanded: [0, 1],
      renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;

        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <DevicesTableExpansion
                data={[]}
                dataIndex={rowMeta["dataIndex"]}
              />
            </TableCell>
          </TableRow>
        );
      },
      onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) =>
        console.log(curExpanded, allExpanded, rowsExpanded),
    };

    const theme = createMuiTheme({
      overrides: {
        MUIDataTableSelectCell: {
          expandDisabled: {
            // Soft hide the button.
            visibility: "hidden",
          },
        },
      },
    });

    const components = {
      ExpandButton: function (props) {
        // If needed, remove the expand "arrow" from the table rows
        //if (props.dataIndex === 3 || props.dataIndex === 4) return <div style={{width:'24px'}} />;
        return <ExpandButton {...props} />;
      },
    };

    return (
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          data={this.getTableData()}
          // eslint-disable-next-line react/prop-types
          //data={this.props.data}
          columns={columns}
          options={options}
          components={components}
        />
      </MuiThemeProvider>
    );
  }
}

export default LicensorDetailsTable;
