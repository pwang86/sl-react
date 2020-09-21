import React from "react";
import "./MainContent.scss";
import PropTypes from "prop-types";
import classnames from "classnames";
import NavBar from "./NavBar";
import SideNav from "./SideNav";

function MainContent({ children, className, ...other }) {
  return (
    <React.Fragment>
      <NavBar />
      <SideNav />
      <div className={classnames("sl-main-content", className)} {...other}>
        {children}
      </div>
    </React.Fragment>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MainContent;
