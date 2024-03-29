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

class ActiveLicensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  fitDataTest(data) {
    let transformedData = [];
    let i = 1;


    for (let item of data) {
      if (item != null) {
        // transformedData = [
        //   ...transformedData,
        //   ...[i, item, undefined, undefined, undefined, undefined]
        // ];
        transformedData.push([
          i,
          item,
          undefined,
          undefined,
          undefined,
          undefined,
        ]);
        i++;
      }
    }
    return transformedData;
  }


  componentDidMount() {
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
        name: "Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Licensee",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "Licensor",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "Due Amount",
        options: {
          filter: true,
          sort: false,
        },
      },
    ];
    const data = [
      [
        1,
        "keys[0]",
        undefined,
        undefined,
        "licenseeData && licenseeData.value",
        "licensorData && licensorData.value",
      ],
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
        console.log("ROW DATA", rowData, rowMeta);
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <ActiveLicenseExpansion data={rowData} fullData={this.props.data[rowMeta.rowIndex]} licensors={this.props.licensors}/>
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

          data={this.props.data}
          columns={columns}
          options={options}
          components={components}
        />
      </MuiThemeProvider>
    );
  }
}

export default ActiveLicensesTable;
