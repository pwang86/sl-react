import React from "react";
import { Route, Redirect } from "react-router-dom";

function checkAuth() {
  return (
    localStorage.length !== 0 && localStorage.getItem("access_token") !== null
  );
}
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
