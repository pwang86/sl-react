import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { redirect } from "./helper";
import axios from "axios";

function handleLogout() {
  axios.defaults.headers.common.Authorization = null;
  localStorage.clear();
  redirect("/login");
}

function NavBar() {
  return (
    <nav className="navbar navbar__container">
      <div className="navbar-brand navbar__logo">
        <Link to="/dashboard" className="is-size-3 has-text-black">
          Stock Location System
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <a className="navbar-item" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
