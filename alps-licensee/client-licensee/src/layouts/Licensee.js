/* eslint-disable react/prop-types */
import React from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import Footer from "components/Footer.js";
import Sidebar from "components/Sidebar";
import DemoNavbar from "components/DemoNavbar";

import routes from "routes.js";
import FilteredActiveLicenses from "views/FilteredActiveLicenses";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    let addedRoutes = [...routes];
    addedRoutes.push({
      path: "/filter/:id",
      name: "Single View",
      component: FilteredActiveLicenses,
      layout: "/licensee",
    })
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {addedRoutes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  // component={prop.component}
                  render={() => <prop.component {...this.props} />}
                  key={key}
                />
              );
            })}
            {/* <Route
              path="/licensee/filter"
              render={() => (
                <>
                  <div className="content">
                    ID: {this.props.match.params}
                    <SLTable messages={[]} />
                  </div>{" "}
                </>
              )}
              key={150}
            ></Route> */}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
