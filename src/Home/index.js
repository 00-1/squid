import React, { useEffect } from "react";
import Content from "../Content";

export default ({
  history,
  auth: { isAuthenticated, login, startSession }
}) => {
  useEffect(startSession, []);

  return (
    <div className="home">
      {isAuthenticated() && localStorage.getItem("isLoggedIn") === "true" && (
        <Content />
      )}
    </div>
  );
};
