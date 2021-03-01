/* eslint-disable no-unused-vars */
import React from "react";
import CollapsibleTable from "components/DevicesTable";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter,
} from "react-router-dom";

import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: ""};
  }
  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/prop-types
      id: this.props.match.params.id
    });
    // eslint-disable-next-line react/prop-types
    console.log("id in devices:::   " + this.props.match.params.id);
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Active Devices</CardTitle>
                </CardHeader>
                <CardBody>
                  <CollapsibleTable id={this.state.id}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(Devices);
