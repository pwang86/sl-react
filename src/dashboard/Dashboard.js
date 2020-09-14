import React from "react";
// import * as yup from "yup";
import MainContent from "../common/MainContent";
import "./Dashboard.scss";
import * as XLSX from "xlsx";
import Notification from "../common/Notification";
import * as RecordApi from "../record/RecordApi";
// import { getValidationErrors } from "../common/helper";
/*
const schema = yup.object().shape({
  model: yup.string().label("Model").required(),
  location: yup.string().label("Location").required(),
  version: yup.number().positive().label("Version").required(),
  date: yup.string().label("Date of creation").required(),
  quantity: yup.number().positive().label("Quantity").required(),
});
*/
class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      file: "No file chosen",
      records: [],
      validationErrors: {},
      error: "",
      isProcessing: false,
      isSuccess: false,
      showSuccess: "",
    };
  }

  handleImport = (e) => {
    e.preventDefault();
    this.setState({ error: "", isSuccess: false, showSuccess: "" });

    let fileImport = e.target.files[0];
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileImport.name.toLowerCase())) {
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            const workbook = XLSX.read(reader.result, { type: "binary" });
            const firstSheet = workbook.SheetNames[0];
            const excelRows = XLSX.utils.sheet_to_json(
              workbook.Sheets[firstSheet],
              { raw: false, dateNF: "yyyy-mm-dd" }
            );
            this.setState({
              records: [...excelRows],
            });
            console.log(excelRows);
          };
          reader.readAsBinaryString(fileImport);
          this.setState({ file: fileImport.name });
        }
      } else {
        this.setState({ error: "This browser does not support HTML5." });
        console.log("This browser does not support HTML5.");
      }
    } else {
      this.setState({ error: "Please upload a valid Excel file." });
      console.log("Please upload a valid Excel file.");
    }
  };

  handleProcess = (e) => {
    e.preventDefault();
    this.setState({
      error: "",
      isProcessing: true,
      isSuccess: false,
      showSuccess: "",
    });

    this.state.records.map(async (record) => {
      /*
      try {
        await schema.validate(record, {
          abortEarly: false,
        });
      } catch (err) {
        this.setState({ validationErrors: getValidationErrors(err) });
        return;
      }
      */

      let recordClone = Object.assign({ IsNZ: false, IsTPG: false }, record);
      recordClone.Date += "T00:00:00";
      recordClone.Version = parseFloat(recordClone.Version);
      recordClone.Quantity = parseInt(recordClone.Quantity);

      try {
        this.setState({ validationErrors: {}, isSuccess: true });
        await RecordApi.createRecord(recordClone);
        this.setState({
          showSuccess:
            "Congratulations! Records from excel file have been added.",
        });
      } catch (e) {
        this.setState({
          error: e.data,
          isProcessing: false,
          isSuccess: false,
          showSuccess: "",
        });
      }
    });
  };

  render() {
    return (
      <MainContent>
        {this.state.error && (
          <Notification type="danger">{this.state.error}</Notification>
        )}
        {this.state.isSuccess && (
          <Notification type="warning">{this.state.showSuccess}</Notification>
        )}
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
                <button
                  className="button is-primary dashboard-btn"
                  is-loading={this.setState.isProcessing}
                  onClick={this.handleProcess}
                >
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
