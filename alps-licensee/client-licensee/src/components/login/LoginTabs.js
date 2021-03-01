/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";

import { Row, Col, Container } from "reactstrap";
import { Class } from "@material-ui/icons";

class LoginTabs extends React.Component {
    constructor(props) {
        super(props);
        // this.tabs = $('.tabs');
        // this.selector = $('.tabs').find('a').length;
        // this.activeItem = tabs.find('.active');
        // this.activeWidth = activeItem.innerWidth();
    }

    //     $(".selector").css({
    //     "left": activeItem.position.left + "px", 
    //     "width": activeWidth + "px"
    //     });

    //     $(".tabs").on("click","a",function(e){
    //         e.preventDefault();
    //         $('.tabs a').removeClass("active");
    //         $(this).addClass('active');
    //         var activeWidth = $(this).innerWidth();
    //         var itemPos = $(this).position();
    //         $(".selector").css({
    //             "left":itemPos.left + "px", 
    //             "width": activeWidth + "px"
    //         });
    //     });
    // function onTabClick(e) {
    //     e.preventDefault();
    // }
  render() {
    return (
      <div className="wrapper">
        <h2>Elastic Tabs</h2>
        <h6>Click on tabs to see them in action</h6>
        <nav className="tabs">
          <div className="selector"></div>
          <a href="#" className="active">
            <i className="fab fa-superpowers"></i>Avengers
          </a>
          <a href="#">
            <i className="fas fa-hand-rock"></i>Hulk
          </a>
          <a href="#">
            <i className="fas fa-bolt"></i>Thor
          </a>
          <a href="#">
            <i className="fas fa-burn"></i>Marvel
          </a>
        </nav>
      </div>
    );
  }
}

LoginTabs.propTypes = {};

export default LoginTabs;
