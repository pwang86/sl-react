import React from "react";
import MainContent from "../common/MainContent";
import "./Dashboard.scss";
import * as XLSX from "xlsx";

class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      file: "No file chosen",
      showSuccess: false,
      importedData: "",
      error: "",
    };
  }

  handleImport = (e) => {
    e.preventDefault();
    let fileImport = e.target.files[0];
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileImport.name.toLowerCase())) {
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            const workbook = XLSX.read(reader.result, { type: "binary" });
            const firstSheet = workbook.SheetNames[0];
            const excelRows = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[firstSheet]
            );

            console.log(excelRows);
          };
          reader.readAsBinaryString(fileImport);
          this.setState({ file: fileImport.name });
        }
      } else {
        console.log("This browser does not support HTML5.");
      }
    } else {
      console.log("Please upload a valid Excel file.");
    }
  };

  render() {
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
            <div className="tile is-child box notification is-primary">
              <p className="title">VR1600V?</p>
              <div className="content">import from excel template</div>
              <div className="content file has-name">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    id="fileImport"
                    onChange={this.handleImport}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  <span className="file-name">{this.state.file}</span>
                </label>
              </div>
              <div className="content">
                <button className="button is-primary dashboard-btn">
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
              All locations   //Note: text length matters, if only one world (e.g. Proceed), then button not aligned
            </Link>
          </div>
*/
