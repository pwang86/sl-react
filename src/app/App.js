import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import RecordList from "../record/RecordList";
import RecordDetails from "../record/RecordDetails";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../error/NotFound";
import Login from "../login/Login";
import PrivateRoute from "./PrivateRoute";
import CountResultList from "../count/CountResultList";

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
        <PrivateRoute exact path="/count" component={CountResultList} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
