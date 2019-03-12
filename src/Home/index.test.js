import React from "react";
import ReactDOM from "react-dom";
import Component from "./";

const auth = {
  isAuthenticated: () => false
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Component auth={auth} />, div);
});
