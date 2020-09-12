import React from "react";
import MainContent from "../common/MainContent";
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
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box notification is-success">
            <p className="title">Stock Taking</p>
            <div className="content">One click to get all results</div>
          </div>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child box notification is-danger">
            <p className="title">VR1600V?</p>
            <div className="content">import from excel template</div>
            <div className="content file has-name">
              <label className="file-label">
                <input className="file-input" type="file" name="excel" />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                <span className="file-name">No file chosen</span>
              </label>
            </div>
            <div className="content">
              <button className="button is-danger dashboard-btn">
                <svg>
                  <rect className="svg-rect" x="0" y="0" />
                </svg>
                Start process
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}

export default Dashboard;
/*
<div className="tile is-child box notification is-danger">
            <p className="title">VR1600V?</p>
            <div className="content">import from excel template</div>
            <Link to="/record" className="button is-danger dashboard-btn">
              <svg>
                <rect className="svg-rect" x="0" y="0" />
              </svg>
              All locations
            </Link>
          </div>
*/
