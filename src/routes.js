import React from "react";
import { Route, Router } from "react-router-dom";
import Bar from "./Bar";
import Home from "./Home";
import Loading from "./Loading";
import Landing from "./Landing";
import Auth from "./Auth";
import history from "./history";

const auth = new Auth();

export default () => {
  return (
    <Router history={history} component={Bar}>
      <>
        <Route render={props => <Bar auth={auth} {...props} />} />
        <Route path="/hi" exact render={props => <Landing auth={auth} />} />
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />

        <Route
          path="/callback"
          render={props => <Loading auth={auth} {...props} />}
        />
      </>
    </Router>
  );
};
