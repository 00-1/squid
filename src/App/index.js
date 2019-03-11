import React, { useState, useEffect } from "react";
import "./index.css";

export default ({ auth: { login, logout, isAuthenticated, renewSession } }) => {
  // goTo(route) {
  //   this.props.history.replace(`/${route}`);
  // }

  useEffect(() => {
    consoole.log("login", renewSession);

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  });

  return (
    <>
      {/*<button onClick={this.goTo.bind(this, "/")}>SQUID</button>*/}
      {!isAuthenticated() ? (
        <button onClick={login}>Log In</button>
      ) : (
        <button onClick={logout}>Log Out</button>
      )}
    </>
  );
};
