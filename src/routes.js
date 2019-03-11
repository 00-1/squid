import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Callback from "./Callback";
import Auth from "./Auth";
import history from "./history";

const auth = new Auth();

const hash = nextState =>
  /access_token|id_token|error/.test(nextState.location.hash) &&
  auth.handleAuthentication();

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route path="/" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            hash(props);
            return <Callback {...props} />;
          }}
        />
      </>
    </Router>
  );
};
