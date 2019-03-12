import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Bar from "./Bar";
import Home from "./Home";
import Loading from "./Loading";
import Auth from "./Auth";
import history from "./history";

const auth = new Auth();

const hash = nextState =>
  /access_token|id_token|error/.test(nextState.location.hash) &&
  auth.handleAuthentication();

export default () => {
  return (
    <Router history={history} component={Bar}>
      <>
        <Route render={props => <Bar auth={auth} {...props} />} />
        <Switch>
          <Route path="/bye" exact render={props => <p>Bye.</p>} />
          <Route render={props => <Home auth={auth} {...props} />} />
        </Switch>

        <Route
          path="/callback"
          render={props => {
            hash(props);
            return <Loading {...props} />;
          }}
        />
      </>
    </Router>
  );
};
