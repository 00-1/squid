import React from "react";

export default ({ auth: { isAuthenticated, login } }) => (
  <div className="container">
    {isAuthenticated() && <h4>You are logged in!</h4>}
    {!isAuthenticated() && (
      <h4>
        You are not logged in! Please{" "}
        <a style={{ cursor: "pointer" }} onClick={login}>
          Log In
        </a>{" "}
        to continue.
      </h4>
    )}
  </div>
);
