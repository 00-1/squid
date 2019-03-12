import React, { useEffect } from "react";

export default ({ auth: { isAuthenticated, login, renewSession } }) => {
  useEffect(renewSession, []);

  return (
    <div className="landing">
      {!isAuthenticated() && (
        <p>
          {"You are not logged in! Please "}
          <button onClick={login}>Log In</button>
          {" to continue."}
        </p>
      )}
    </div>
  );
};
