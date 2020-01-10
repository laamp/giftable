import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector("#root");
  ReactDOM.render(<Root />, rootElement);
});
