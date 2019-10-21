import React from "react";
import MainContent from "../common/MainContent";
import Loader from "../common/PageLoader";
import Notification from "../common/Notification";
import * as CountResultApi from "./CountResultApi";
import "./CountResultList.scss";

class CountResultList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      results: [],
      error: ""
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const results = await CountResultApi.getResults();
      this.setState({ results, isLoading: false, error: "" });
    } catch (e) {
      this.setState({
        error: "Sorry, error occured while loading results",
        isLoading: false
      });
    }
  }

  renderHead() {
    return (
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Total Quantity</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.state.isLoading && (
          <tr>
            <td colSpan="6">
              <Loader />
            </td>
          </tr>
        )}
        {!this.state.isLoading &&
          this.state.results.map(result => (
            <tr key={result.modelName}>
              <td>{result.modelName}</td>
              <td>{result.totalQuantity}</td>
            </tr>
          ))}
      </tbody>
    );
  }

  render() {
    return (
      <MainContent>
        <h1 className="title has-text-grey sl-count__title">
          Stock Taking Results
        </h1>
        {this.state.error && (
          <Notification type="danger" closable>
            {this.state.error}
          </Notification>
        )}
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && !this.state.error && (
          <div>
            <table className="table table-style">
              {this.renderHead()}
              {this.renderBody()}
            </table>
          </div>
        )}
      </MainContent>
    );
  }
}

export default CountResultList;
