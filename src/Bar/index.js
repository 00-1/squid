import React from "react";
import "./index.css";

export default ({
  history,
  auth: { login, logoutRedirect, isAuthenticated, getUser }
}) => (
  <div className="bar">
    <button onClick={() => history.replace("/")}>SQUID</button>
    <button onClick={isAuthenticated() ? logoutRedirect : login}>
      Log {isAuthenticated() ? `Out (${getUser().nickname})` : "In"}
    </button>
  </div>
);
