/* eslint-disable react/prop-types */
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
import { useParams } from 'react-router';

class ActiveLicenses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
          {console.log("LOADING ACTIVE Active lic:" + this.props.loading)} {console.log( " DRIZZLESTATE ACTI LIC: ")} {console.log(  this.props.drizzleState )}
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
