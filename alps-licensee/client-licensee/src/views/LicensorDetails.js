/* eslint-disable react/prop-types */

import React from "react";

import { Row, Col } from "reactstrap";
import LicensorDetailsTable from "components/table/LicensorDetailsTable";

class LicensorDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <LicensorDetailsTable data={this.props.licensors} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default LicensorDetails;
