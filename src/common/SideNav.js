import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.scss";
import classNames from "classnames";
import axios from "axios";

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isLogout: false,
      logoutError: ""
    };
  }

  clickMobileBurgerMenu = () => {
    this.setState(state => ({
      isClicked: !state.isClicked
    }));
  };

  handleLogout = () => {
    try {
      axios.defaults.headers.common.Authorization = null;
      localStorage.clear();
      this.setState({ isLogout: true });
      // redirect("/login");
    } catch (err) {
      this.setState({
        logoutError:
          err.err_description || "Sorry, error occured when logging out",
        isLogout: false
      });
    }
  };

  renderMobileFirst() {
    return (
      <span className="mobile btn-mobile-menu">
        <a target="_blank" onClick={this.clickMobileBurgerMenu}>
          <i className="fas fa-list btn-mobile-menu__icon" />
        </a>
      </span>
    );
  }

  renderSideNav() {
    var sideNavWrapperClass = classNames({
      "sidenav-wrapper": true,
      visible: this.state.isClicked
    });

    return (
      <div className={sideNavWrapperClass}>
        <aside className="cover-sidenav">
          <ul className="sidenav__menu">
            <li className="sidenav__menu-list dash-margin">
              <NavLink className="sidenav__menu-list--white" to="/dashboard">
                <div>
                  <div>
                    <span className="icon">
                      <i className="fas fa-home fa-2x" />
                    </span>
                  </div>
                </div>
                <div>Dashboard</div>
              </NavLink>
            </li>
            <li className="sidenav__menu-list">
              <NavLink
                className="sidenav__menu-list--white"
                to="/record"
                // onClick={() => window.location.reload()}
              >
                <div>
                  <div>
                    <span className="icon">
                      <i className="fas fa-book fa-2x" />
                    </span>
                  </div>
                </div>
                <div>Records</div>
              </NavLink>
            </li>
            <li className="sidenav__menu-list">
              <NavLink className="sidenav__menu-list--white" to="/count">
                <div>
                  <div>
                    <span className="icon">
                      <i className="fas fa-feather-alt fa-2x" />
                    </span>
                  </div>
                </div>
                <div>Counts</div>
              </NavLink>
            </li>
            <li className="sidenav__menu-list">
              <NavLink
                className="sidenav__menu-list--white"
                to="/logout"
                onClick={this.handleLogout}
              >
                <div>
                  <div>
                    <span className="icon">
                      <i className="fas fa-sign-out-alt fa-2x" />
                    </span>
                  </div>
                  <div>Logout</div>
                </div>
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderMobileFirst()}
        {this.renderSideNav()}
      </div>
    );
  }
}
/*
function SideNav() {
  return (
    <aside className="sidenav">
      <ul className="sidenav__menu">
        <li className="sidenav__menu-list">
          <NavLink className="sidenav__menu-list--white" to="/dashboard">
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-home fa-2x" />
                </span>
              </div>
            </div>
            <div>Dashboard</div>
          </NavLink>
        </li>
        <li className="sidenav__menu-list">
          <NavLink
            className="sidenav__menu-list--white"
            to="/record"
            // onClick={() => window.location.reload()}
          >
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-book fa-2x" />
                </span>
              </div>
            </div>
            <div>Records</div>
          </NavLink>
        </li>
        <li className="sidenav__menu-list">
          <NavLink className="sidenav__menu-list--white" to="/count">
            <div>
              <div>
                <span className="icon">
                  <i className="fas fa-feather-alt fa-2x" />
                </span>
              </div>
            </div>
            <div>Counts</div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
*/
export default SideNav;
