import React from "react";
import ReactDOM from "react-dom";
import Giftable from "./components/giftable";
import ConfigureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.getItem("guestLoggedIn")) {
    const guestInfo = JSON.parse(localStorage.getItem("guestLoggedIn"));
    console.log(guestInfo);
    const preloadedState = {
      session: {
        isAuthenticated: true,
        currentUser: guestInfo
      }
    };

    store = ConfigureStore(preloadedState);
  } else if (localStorage.getItem("authtoken")) {
    let token = localStorage.getItem("authtoken");

    const decodedUser = jwt_decode(token);
    let formattedUser = {
      email: decodedUser.email,
      googleId: decodedUser.sub,
      googleImg: decodedUser.picture,
      name: decodedUser.name
    };
    console.log(formattedUser);
    const preloadedState = {
      session: { isAuthenticated: true, currentUser: formattedUser }
    };

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedUser.exp < currentTime) {
      localStorage.removeItem("authtoken");
      store.dispatch(logout());
      window.location.href = "/";
    }

    store = ConfigureStore(preloadedState);
  } else {
    store = ConfigureStore();
  }

  const root = document.querySelector("#root");
  ReactDOM.render(<Giftable store={store} />, root);
});
