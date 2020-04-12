import React from "react";
import axios from "axios";
import * as yup from "yup";
import * as LoginApi from "./LoginApi";
import { pick } from "lodash/object";
import { getValidationErrors, redirect } from "../common/helper";
import { Link } from "react-router-dom";
import TextField from "../common/TextField";
import Button from "../common/Button";
import "./Login.scss";
import Notification from "../common/Notification";

const schema = yup.object().shape({
  username: yup.string().label("Username").required(),
  password: yup.string().label("Password").required(),
});

class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLogin: false,
      validationErrors: {},
      loginError: "",
    };
  }

  handleFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      validationErrors: {},
      loginError: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = pick(this.state, ["username", "password"]);
    try {
      await schema.validate(userInput, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors });
      return;
    }

    try {
      this.setState({ validationErrors: {}, isLogin: true });
      const response = await LoginApi.getAccessToken(
        userInput.username,
        userInput.password
      );
      this.setState({ loginError: "", isLogin: false });

      // Update bearer token
      axios.defaults.headers.common.Authorization = `Bearer ${response.access_token}`;
      localStorage.setItem("access_token", response.access_token);
      redirect("/dashboard");
    } catch (err) {
      this.setState({
        loginError:
          err.error_description || "Sorry, error occured when logging in",
        isLogin: false,
      });
    }
  };

  render() {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4">
              <nav className="level">
                <div className="level-item has-text-centered">
                  <p className="image is-64x64">
                    <img src={require("./logo.jpg")} />
                  </p>
                  <h3 className="title login_title">Stock Location</h3>
                </div>
              </nav>

              {this.state.loginError && (
                <Notification type="danger">
                  {this.state.loginError}
                </Notification>
              )}

              <div className="clearfix">
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    name="username"
                    value={this.state.username}
                    placeholder="Please Enter Username"
                    error={this.state.validationErrors["username"]}
                    leftIcon="user"
                    onChange={this.handleFieldChange}
                  />
                  <TextField
                    name="password"
                    value={this.state.password}
                    type="password"
                    leftIcon="lock"
                    placeholder="Please Enter Password"
                    error={this.state.validationErrors["password"]}
                    onChange={this.handleFieldChange}
                  />
                  <div className="field field-margin is-pulled-left">
                    <div className="control">
                      <Link className="button is-text" to="/NotFound">
                        Sign up?
                      </Link>
                    </div>
                  </div>
                  <div className="field field-margin is-pulled-right">
                    <div className="control">
                      <Button
                        buttonType="link"
                        fullWidth
                        size="medium"
                        type="submit"
                        loading={this.state.isLogin}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <nav className="level level-margin">
                <p className="level-item has-text-centered">
                  <a className="button is-text is-size-7">Help</a>
                </p>
                <p className="level-item has-text-centered">
                  <a className="button is-text is-size-7">Privacy policy</a>
                </p>
                <p className="level-item has-text-centered">
                  <a className="button is-text is-size-7">
                    Acceptable Use Policy
                  </a>
                </p>
                <p className="level-item has-text-centered">
                  <a className="button is-text is-size-7">Facebook</a>
                </p>
                <p className="level-item has-text-centered">
                  <a className="button is-text is-size-7">Twitter</a>
                </p>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

/* remove closable so that every time when error appears,
notification appears.             
{this.state.loginError && (
    <Notification type="danger" closable>
      {this.state.loginError}
    </Notification>
)}
*/
