import React, { useEffect } from "react";
import Content from "../Content";

export default ({
  history,
  auth: { isAuthenticated, login, renewSession }
}) => {
  useEffect(() => {
    history.replace("/callback");
    renewSession();
  }, []);

  return (
    <div className="home">
      {isAuthenticated() && localStorage.getItem("isLoggedIn") === "true" ? (
        <Content />
      ) : (
        <p>
          {"You are not logged in! Please "}
          <button onClick={login}>Log In</button>
          {" to continue."}
        </p>
      )}
    </div>
  );
};
