import React from "react";
import PageLoader from "../common/PageLoader";
import moment from "moment";
import { range } from "lodash/util";
import classnames from "classnames";
import MainContent from "../common/MainContent";
import * as RecordApi from "./RecordApi";
import { Link } from "react-router-dom";
import TextField from "../common/TextField";
import "./Record.scss";
import Notification from "../common/Notification";
import { redirect } from "../common/helper";

class RecordList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPage: 1,
      isPageLoading: false,
      isLoading: true,
      records: [],
      error: "",
      searchValue: "",
      searchError: "",
    };
  }

  async componentDidMount() {
    await this.fetchRecordByPage(1);
  }

  async componentWillReceiveProps() {
    await this.fetchRecordByPage(1);
    // Set searchValue to empty so that when
    // click Records on the SideBar, the pages of records works corretly.
    this.setState({ searchValue: "" });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchValue === "") {
      this.setState({
        searchError: "Please enter something",
      });
    } else {
      // redirect(`search/${this.state.searchValue}`);
      redirect(`search?q=${this.state.searchValue}`);
    }
  };

  handleFieldChange = (e) => {
    const {
      target,
      target: { name },
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
      searchError: "",
    });
  };

  fetchRecordByPage = async (pageNumber) => {
    this.setState({ currentPage: pageNumber, isLoading: true });
    try {
      const data = await RecordApi.getRecords(pageNumber);
      this.setState({
        records: data.records,
        totalPage: data.totalPage,
        isPageLoading: false,
        isLoading: false,
        error: "",
        searchError: "",
      });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading records",
        isLoading: false,
        isPageLoading: false,
        searchError: "",
      });
    }
  };

  async handlePageNumberClick(pageNumber, e) {
    e.preventDefault();
    this.setState({ isPageLoading: true });
    const data = await RecordApi.getRecords(pageNumber);
    this.setState({
      isPageLoading: false,
      records: data.records,
      currentPage: pageNumber,
      totalPage: data.totalPage,
    });
  }

  renderRecords() {
    if (this.setState.isPageLoading) {
      return <PageLoader />;
    }
    if (!this.state.isPageLoading && !this.state.records.length) {
      return <h3>No records :(</h3>;
    }
    if (!this.state.isPageLoading && this.state.records.length) {
      return (
        <div className="table-scrollable">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Model</th>
                <th>Location</th>
                <th>Version</th>
                <th>Date</th>
                <th>IsTPG</th>
                <th>IsNZ</th>
                <th>Quantity</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.records.map((record) => (
                <tr key={record.id}>
                  <td>{record.model}</td>
                  <td>{record.location}</td>
                  <td>{record.version}</td>
                  <td>{moment(record.date).format("DD-MM-YYYY")}</td>
                  <td>{String(record.isTPG)}</td>
                  <td>{String(record.isNZ)}</td>
                  <td>{record.quantity}</td>
                  <td>
                    <Link to={`/record/${record.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>{this.renderPages()}</div>
        </div>
      );
    }
  }

  renderPages() {
    const { totalPage, currentPage } = this.state;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;
    let pageNumbers = [];
    // totoalPage < 3
    if (totalPage < 5) {
      pageNumbers = range(1, totalPage + 1);
    } else {
      // currentPage === 1
      if (currentPage === 1 || currentPage === 2) {
        // [1, 2, 3]
        pageNumbers = [1, 2, 3, 4, 5];
      } else if (currentPage === totalPage) {
        // [totalPage - 2, totalPage - 1, totalPage]
        pageNumbers = [
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        ];
      }
      // new added
      else if (currentPage === totalPage - 1) {
        pageNumbers = [
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
        ];
      } else {
        // [currentPage - 1, currentPage, currentPage + 1]
        pageNumbers = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
    }
    return (
      <nav className="pagination is-centered">
        {hasPrev && (
          <a
            className="pagination-previous"
            onClick={
              this.state.searchValue !== ""
                ? this.fetchSearchResultByPage.bind(this, currentPage - 1)
                : this.fetchRecordByPage.bind(this, currentPage - 1)
            }
          >
            Previous
          </a>
        )}
        {hasNext && (
          <a
            className="pagination-next"
            onClick={this.fetchRecordByPage.bind(this, currentPage + 1)}
          >
            Next
          </a>
        )}
        <ul className="pagination-list">
          {" "}
          {pageNumbers.map((pageNumber) => (
            <a
              key={pageNumber}
              className={classnames("pagination-link", {
                "is-current": currentPage === pageNumber,
              })}
              onClick={
                currentPage === pageNumber
                  ? undefined
                  : this.fetchRecordByPage.bind(this, pageNumber)
              }
            >
              {" "}
              {pageNumber}{" "}
            </a>
          ))}{" "}
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title sl-record__title has-text-grey">Records</h1>
        <div className="new-and-search clearfix">
          <div className="to-left">
            <Link
              className="button is-link newRecord_button"
              to="/record/createrecord"
            >
              New Record
            </Link>
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="field has-addons to-right"
          >
            <div className="control">
              <TextField
                name="searchValue"
                placeholder="Search Model/Location"
                value={this.state.searchValue}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="control">
              <input type="submit" value="Search" className="button is-link" />
            </div>
          </form>
        </div>
        {this.state.searchError && (
          <Notification type="warning">{this.state.searchError}</Notification>
        )}
        {this.state.isLoading && <PageLoader />}
        {!this.state.isLoading && this.renderRecords()}
      </MainContent>
    );
  }
}

export default RecordList;

/*
class RecordList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPage: 1,
      isPageLoading: false,
      isLoading: true,
      records: [],
      error: "",
      searchValue: "",
      searchError: "",
    };
  }

  async componentDidMount() {
    await this.fetchRecordByPage(1);
  }

  async componentWillReceiveProps() {
    await this.fetchRecordByPage(1);
    // Set searchValue to empty so that when
    // click Records on the SideBar, the pages of records works corretly.
    this.setState({ searchValue: "" });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.searchValue === "") {
      this.setState({ searchError: "Please enter something" });
    } else {
      await this.fetchSearchResultByPage(1);
    }
  };

  handleFieldChange = (e) => {
    const {
      target,
      target: { name },
    } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  fetchSearchResultByPage = async (pageNumber) => {
    this.setState({ currentPage: pageNumber, isLoading: true });
    try {
      const data = await RecordApi.searchRecords(
        this.state.searchValue.toLowerCase(),
        pageNumber
      );
      this.setState({
        records: data.records,
        totalPage: data.totalPage,
        isPageLoading: false,
        isLoading: false,
        error: "",
        searchError: "",
      });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading records",
        isLoading: false,
        isPageLoading: false,
      });
    }
  };

  fetchRecordByPage = async (pageNumber) => {
    this.setState({ currentPage: pageNumber, isLoading: true });
    try {
      const data = await RecordApi.getRecords(pageNumber);
      this.setState({
        records: data.records,
        totalPage: data.totalPage,
        isPageLoading: false,
        isLoading: false,
        error: "",
        searchError: "",
      });
    } catch (e) {
      this.setState({
        error: "Sorry, error occurred while loading records",
        isLoading: false,
        isPageLoading: false,
      });
    }
  };

  async handlePageNumberClick(pageNumber, e) {
    e.preventDefault();
    this.setState({ isPageLoading: true });
    const data = await RecordApi.getRecords(pageNumber);
    this.setState({
      isPageLoading: false,
      records: data.records,
      currentPage: pageNumber,
      totalPage: data.totalPage,
    });
  }

  renderRecords() {
    if (this.setState.isPageLoading) {
      return <PageLoader />;
    }
    if (!this.state.isPageLoading && !this.state.records.length) {
      return <h3>No records :(</h3>;
    }
    if (!this.state.isPageLoading && this.state.records.length) {
      return (
        <div className="table-scrollable">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Model</th>
                <th>Location</th>
                <th>Version</th>
                <th>Date</th>
                <th>IsTPG</th>
                <th>IsNZ</th>
                <th>Quantity</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.records.map((record) => (
                <tr key={record.id}>
                  <td>{record.model}</td>
                  <td>{record.location}</td>
                  <td>{record.version}</td>
                  <td>{moment(record.date).format("DD-MM-YYYY")}</td>
                  <td>{String(record.isTPG)}</td>
                  <td>{String(record.isNZ)}</td>
                  <td>{record.quantity}</td>
                  <td>
                    <Link to={`/record/${record.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>{this.renderPages()}</div>
        </div>
      );
    }
  }

  renderPages() {
    const { totalPage, currentPage } = this.state;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;
    let pageNumbers = [];
    // totoalPage < 3
    if (totalPage < 5) {
      pageNumbers = range(1, totalPage + 1);
    } else {
      // currentPage === 1
      if (currentPage === 1 || currentPage === 2) {
        // [1, 2, 3]
        pageNumbers = [1, 2, 3, 4, 5];
      } else if (currentPage === totalPage) {
        // [totalPage - 2, totalPage - 1, totalPage]
        pageNumbers = [
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        ];
      }
      // new added
      else if (currentPage === totalPage - 1) {
        pageNumbers = [
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
        ];
      } else {
        // [currentPage - 1, currentPage, currentPage + 1]
        pageNumbers = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
    }
    return (
      <nav className="pagination is-centered">
        {hasPrev && (
          <a
            className="pagination-previous"
            onClick={
              this.state.searchValue !== ""
                ? this.fetchSearchResultByPage.bind(this, currentPage - 1)
                : this.fetchRecordByPage.bind(this, currentPage - 1)
            }
          >
            Previous
          </a>
        )}
        {hasNext && (
          <a
            className="pagination-next"
            onClick={
              this.state.searchValue !== ""
                ? this.fetchSearchResultByPage.bind(this, currentPage + 1)
                : this.fetchRecordByPage.bind(this, currentPage + 1)
            }
          >
            Next
          </a>
        )}
        <ul className="pagination-list">
          {" "}
          {pageNumbers.map((pageNumber) => (
            <a
              key={pageNumber}
              className={classnames("pagination-link", {
                "is-current": currentPage === pageNumber,
              })}
              onClick={
                currentPage === pageNumber
                  ? undefined
                  : this.state.searchValue !== ""
                  ? this.fetchSearchResultByPage.bind(this, pageNumber)
                  : this.fetchRecordByPage.bind(this, pageNumber)
              }
            >
              {" "}
              {pageNumber}{" "}
            </a>
          ))}{" "}
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title sl-record__title has-text-grey">Records</h1>
        <div className="new-and-search clearfix">
          <div className="to-left">
            <Link
              className="button is-link newRecord_button"
              to="/record/createrecord"
            >
              New Record
            </Link>
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="field has-addons to-right"
          >
            <div className="control">
              <TextField
                name="searchValue"
                placeholder="Find a Model/Location"
                value={this.state.searchValue}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="control">
              <input type="submit" value="Search" className="button is-link" />
            </div>
          </form>
        </div>
        {this.state.searchError && (
          <Notification type="warning" closable>
            {this.state.searchError}
          </Notification>
        )}
        {this.state.isLoading && <PageLoader />}
        {!this.state.isLoading && this.renderRecords()}
      </MainContent>
    );
  }
}

export default RecordList;
*/
