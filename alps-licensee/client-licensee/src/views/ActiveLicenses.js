/* eslint-disable no-unused-vars */
import React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  Row,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Col,
} from "reactstrap";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import { ActLineChart } from "components/charts/ActLicLineChart";
import dataActLine from "components/charts/data-actLic-line.json";
import dataActLine2 from "components/charts/data-actLic-line2.json";
import { Link } from "react-router-dom";
import ActiveLicensesTable from "components/table/ActiveLicensesTable";

class ActiveLicenses extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <ActiveLicensesTable/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ActiveLicenses;
