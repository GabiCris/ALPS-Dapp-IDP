/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { DevicesBarChart } from "components/charts/DevicesBarChart";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  CardTitle,
  Col,
} from "reactstrap";

import dataBarCh from "components/charts/data.json";
import "components/charts/chart.scss";
import { DevicesLineChart } from "components/charts/DevicesLineChart";
import dataLineCh from "components/charts/data-line.json";
import SearchBar from "material-ui-search-bar";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function RowF(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Card>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * 0.2 * 100) /
                            100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
              
              </Box>
              <div className="content">
                <Row>
                  <Col >
                    <Card>
                      <CardHeader></CardHeader>
                      <CardBody>
                        <div className="chart">
                          <DevicesBarChart data={dataBarCh} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                      </CardHeader>
                      <CardBody>
                        <div className="chart">
                          <DevicesLineChart data={dataLineCh} />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

RowF.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rowss = [
  createData("Device 1", 159, 6.0, 24),
  createData("Device 234", 237, 9.0, 37),
  createData("Device 123", 262, 16.0, 24),
  createData("Device 57", 305, 3.7, 67),
  createData("Device 4", 356, 16.0, 49),
];

export default function CollapsibleTable() {
  const [rows, setRows] = useState(rowss);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


  return (
    <Paper>
    <SearchBar
    value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
    />
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Device</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Price Per Unit ($)</TableCell>
            <TableCell align="right">No. Active Devices</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <RowF key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
