import React from "react";
import "./index.css";

export default ({ auth: { login, logoutRedirect, isAuthenticated } }) => (
  <div className="bar">
    <button onClick={() => history.replace("/")}>SQUID</button>
    <button onClick={isAuthenticated() ? logoutRedirect : login}>
      Log {isAuthenticated() ? "Out" : "In"}
    </button>
  </div>
);
