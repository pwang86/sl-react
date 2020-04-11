import React from "react";
import PageLoader from "../common/PageLoader";
import moment from "moment";
import { range } from "lodash/util";
import classnames from "classnames";
import MainContent from "../common/MainContent";
import * as RecordApi from "./RecordApi";
import { Link } from "react-router-dom";
import "./Record.scss";

class RecordSearchList extends React.PureComponent {
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
    };
  }

  async componentDidMount() {
    this.setState({ searchValue: this.props.match.params.searchValue });
    await this.fetchSearchResultByPage(1);
  }

  fetchSearchResultByPage = async (pageNumber) => {
    this.setState({ currentPage: pageNumber, isLoading: true });

    try {
      const data = await RecordApi.searchRecords(
        this.props.match.params.searchValue,
        pageNumber
      );
      this.setState({
        records: data.records,
        totalPage: data.totalPage,
        isPageLoading: false,
        isLoading: false,
        error: "",
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
            onClick={this.fetchSearchResultByPage.bind(this, currentPage - 1)}
          >
            Previous
          </a>
        )}
        {hasNext && (
          <a
            className="pagination-next"
            onClick={this.fetchSearchResultByPage.bind(this, currentPage + 1)}
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
                  : this.fetchSearchResultByPage.bind(this, pageNumber)
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
        <h1 className="title sl-record__title has-text-grey">
          Records of {this.state.searchValue}
        </h1>
        {this.state.isLoading && <PageLoader />}
        {!this.state.isLoading && this.renderRecords()}
      </MainContent>
    );
  }
}

export default RecordSearchList;
