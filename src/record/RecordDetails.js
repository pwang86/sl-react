import React from "react";
import * as yup from "yup";
import * as RecordApi from "./RecordApi";
import { getValidationErrors, redirect } from "../common/helper";
import { pick } from "lodash/object";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import classnames from "classnames";
import PageLoader from "../common/PageLoader";
import Button from "../common/Button";
import TextField from "../common/TextField";
import Notification from "../common/Notification";
import "./Record.scss";

const schema = yup.object().shape({
  model: yup.string().label("Model").required(),
  location: yup.string().label("Location").required(),
  version: yup.number().positive().label("Version").required(),
  date: yup.string().label("Date of creation").required(),
  isTPG: yup.boolean().label("IsTPG").required(),
  isNZ: yup.boolean().label("IsNZ").required(),
  quantity: yup.number().positive().label("Quantity").required(),
});

class RecordDetails extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      record: {
        model: "",
        location: "",
        version: "",
        date: "",
        isTPG: false,
        isNZ: false,
        quantity: "",
      },
      isLoading: false,
      error: "",
      validationErrors: {},
      showDeleteModal: false,
      showSuccessUpdated: false,
      isSaving: false,
    };
  }

  async componentDidMount() {
    if (!this.isCreatingNewRecord()) {
      this.setState({ isLoading: true });
      const record = await RecordApi.getRecordById(this.props.match.params.id);
      this.setState({ isLoading: false, record: record });
    }
  }

  isCreatingNewRecord() {
    return this.getRecordId() === "createrecord";
  }

  getRecordId() {
    return this.props.match.params.id;
  }

  handleDelete = () => {
    this.setState({ showDeleteModal: true });
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false });
  };

  handleContinueDelete = async () => {
    try {
      await RecordApi.deleteRecord(this.getRecordId());
      this.setState({ showDeleteModal: false });
      redirect("/record");
    } catch (err) {
      this.setState({
        error: "error occured while deleting",
        showDeleteModal: false,
      });
    }
  };

  handleSuccessUpdated = () => {
    this.setState({ showSuccessUpdated: false });
  };

  handleFieldChange = (e) => {
    const {
      target,
      target: { name },
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      record: {
        ...this.state.record,
        [name]: value,
      },
      validationErrors: {},
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = pick(this.state.record, [
      "model",
      "location",
      "version",
      "date",
      "isTPG",
      "isNZ",
      "quantity",
    ]);
    try {
      await schema.validate(userInput, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors, isSaving: false });
      return;
    }
    const { record } = this.state;

    if (record.isTPG) {
      if (!record.model.includes("TPG")) {
        record.model += "(TPG)";
      }
    } else {
      if (record.model.includes("TPG")) {
        record.model = record.model.replace(/ *\([^)]*\) */g, "");
      }
    }

    if (record.isNZ) {
      if (!record.model.includes("NZ")) {
        record.model += "(NZ)";
      }
    } else {
      if (record.model.includes("NZ")) {
        record.model = record.model.replace(/ *\([^)]*\) */g, "");
      }
    }

    if (!record.date.includes("T00:00:00")) {
      record.date += "T00:00:00";
    }

    try {
      this.setState({ validationErrors: {}, error: "" });
      if (this.isCreatingNewRecord()) {
        await RecordApi.createRecord(record);
        redirect("/record");
      } else {
        await RecordApi.updateRecord(record.id, record);
        this.setState({ showSuccessUpdated: true });
      }
    } catch (e) {
      this.setState({ isSaving: false, error: e.message });
    }
  };

  renderForm() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Model</label>
            <TextField
              name="model"
              placeholder="Model"
              value={this.state.record.model}
              onChange={this.handleFieldChange}
              error={this.state.validationErrors["model"]}
            />
          </div>
          <div className="field">
            <label className="label">Location</label>
            <TextField
              name="location"
              placeholder="Location"
              value={this.state.record.location}
              onChange={this.handleFieldChange}
              error={this.state.validationErrors["location"]}
            />
          </div>
          <div className="field">
            <label className="label">Version</label>
            <TextField
              name="version"
              placeholder="Version"
              value={this.state.record.version}
              onChange={this.handleFieldChange}
              error={this.state.validationErrors["version"]}
            />
          </div>
          <div className="field">
            <label className="label">Date(YYYY-MM-DD)</label>
            <TextField
              name="date"
              placeholder="Date"
              value={this.state.record.date.substring(0, 10)}
              onChange={this.handleFieldChange}
              error={this.state.validationErrors["date"]}
            />
          </div>
          <div className="field">
            <label className="checkbox">
              Is TPG:
              <input
                className="sl-TPG__left"
                name="isTPG"
                type="checkbox"
                checked={this.state.record.isTPG}
                onChange={this.handleFieldChange}
              />
            </label>
            {this.state.validationErrors["isTPG"] && (
              <p className="help is-danger">
                {this.state.validationErrors["isTPG"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="checkbox">
              Is NZ:
              <input
                className="sl-NZ__left"
                name="isNZ"
                type="checkbox"
                checked={this.state.record.isNZ}
                onChange={this.handleFieldChange}
              />
            </label>
            {this.state.validationErrors["isNZ"] && (
              <p className="help is-danger">
                {this.state.validationErrors["isNZ"]}
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Quantity</label>
            <TextField
              name="quantity"
              placeholder="Quantity"
              value={this.state.record.quantity}
              onChange={this.handleFieldChange}
              error={this.state.validationErrors["quantity"]}
            />
          </div>
          <div className="field is-grouped">
            <div className="control">
              <Button
                buttonType="link"
                type="submit"
                loading={this.state.isSaving}
              >
                {this.isCreatingNewRecord() ? "Create" : "Save"}
              </Button>
            </div>
            <div className="control">
              <Link className="button" to="/record">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <MainContent>
        {this.state.isLoading && <PageLoader />}
        <h1 className="title">
          {this.isCreatingNewRecord() ? "New Record" : "Record Details"}
        </h1>
        {this.state.showSuccessUpdated && (
          <Notification type="success">Successfully saved record</Notification>
        )}
        {!this.isCreatingNewRecord() && (
          <Button
            buttonType="danger"
            style={{ marginBottom: 20 }}
            onClick={this.handleDelete}
          >
            Delete record
          </Button>
        )}
        {!this.state.isLoading && this.state.record && this.renderForm()}
        {!this.state.isLoading && !this.state.record && (
          <h3>Record Not Found</h3>
        )}
        <div
          className={classnames("modal", {
            "is-active": this.state.showDeleteModal,
          })}
        >
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Are you sure to continue?</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this.handleCancelDelete}
              />
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete this record? </p>
            </section>
            <footer className="modal-card-foot">
              <Button buttonType="success" onClick={this.handleContinueDelete}>
                Yes
              </Button>
              <Button onClick={this.handleCancelDelete}>Cancel</Button>
            </footer>
          </div>
        </div>
      </MainContent>
    );
  }
}

export default RecordDetails;
