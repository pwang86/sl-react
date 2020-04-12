import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import RecordList from "../record/RecordList";
import RecordDetails from "../record/RecordDetails";
import RecordSearchList from "../record/RecordSearchList";
import RecordSearchDetails from "../record/RecordSearchDetails";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../error/NotFound";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";
import CountResultList from "../count/CountResultList";
import Logout from "../common/Logout";

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/record" component={RecordList} />
        <PrivateRoute
          path="/record/:id(\d+|createrecord)"
          component={RecordDetails}
        />
        <PrivateRoute
          exact
          path="/search/:searchValue"
          component={RecordSearchList}
        />
        <PrivateRoute
          path="/search/:searchValue/:id"
          component={RecordSearchDetails}
        />
        <PrivateRoute exact path="/count" component={CountResultList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
/* must contain ":" in search/:searchValue, otherwise it goes to not found */
