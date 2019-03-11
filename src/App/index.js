import React, { useEffect } from "react";
import "./index.css";

export default ({
  history,
  auth: { login, logout, isAuthenticated, renewSession }
}) => {
  const goTo = route => history.replace(`/${route}`);

  useEffect(() => {
    localStorage.getItem("isLoggedIn") === "true" && renewSession();
  });

  return (
    <>
      <button onClick={() => goTo("")}>SQUID</button>
      {!isAuthenticated() ? (
        <button onClick={login}>Log In</button>
      ) : (
        <button onClick={logout}>Log Out</button>
      )}
    </>
  );
};
