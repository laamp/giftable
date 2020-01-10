import React from "react";
import ReactDOM from "react-dom";
import Giftable from "./components/giftable";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();
  const root = document.querySelector("#root");

  ReactDOM.render(<Giftable store={store} />, root);
});
