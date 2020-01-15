import React from "react";
import MainContent from "../common/MainContent";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <MainContent>
      <h1 className="title sl-dashboard__title has-text-grey">
        {" "}
        Welcome to Stock Location System
      </h1>
      <div className="tile is-ancestor">
        <div className="tile is-6 is-parent">
          <div className="tile is-child box notification is-info">
            <p className="title">Stock Location</p>
            <div className="content">All locations in the warehouse</div>
            <Link
              to="/record"
              className="button is-info dashboard-btn"
            >
              <svg>
                <rect className="svg-rect" x="0" y="0" />
              </svg>
              All locations
            </Link>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box notification is-success">
            <p className="title">Stock Taking</p>
            <div className="content">One click to get all results</div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}

export default Dashboard;
