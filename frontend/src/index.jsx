import React from "react";
import ReactDOM from "react-dom";
import Giftable from "./components/giftable";
import ConfigureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store = ConfigureStore();
  const root = document.querySelector("#root");

  ReactDOM.render(<Giftable store={store} />, root);
});
