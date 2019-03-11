import React from "react";

export default ({ auth: { isAuthenticated, login } }) => (
  <p>
    {isAuthenticated() ? (
      "You are logged in!"
    ) : (
      <>
        {"You are not logged in! Please "}
        <button onClick={login}>Log In</button>
        {" to continue."}
      </>
    )}
  </p>
);
