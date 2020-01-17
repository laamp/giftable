import React from "react";
import ReactDOM from "react-dom";
import Giftable from "./components/giftable";
import ConfigureStore from "./store/store";
import { setAuthToken } from "./util/session_api_util";
import jwt_decode from "jwt-decode";
import { logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.getItem("authtoken")) {
    let token = localStorage.getItem("authtoken");
    setAuthToken(token);

    const decodedUser = jwt_decode(token);
    let formattedUser = {
      email: decodedUser.email,
      googleId: decodedUser.sub,
      googleImg: decodedUser.picture,
      name: decodedUser.name
    };

    const preloadedState = {
      session: { isAuthenticated: true, currentUser: formattedUser }
    };

    store = ConfigureStore(preloadedState);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedUser.exp < currentTime) {
      localStorage.removeItem("authtoken");
      store.dispatch(logout());
      window.location.href = "/";
    }
  } else {
    store = ConfigureStore();
  }

  const root = document.querySelector("#root");
  ReactDOM.render(<Giftable store={store} />, root);
});
