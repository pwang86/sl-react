import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.scss";

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

export default SideNav;
