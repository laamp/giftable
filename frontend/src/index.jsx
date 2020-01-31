import React from "react";
import ReactDOM from "react-dom";
import Giftable from "./components/giftable";
import ConfigureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.getItem("guestLoggedIn")) {
    // preload state with guest if they're logged in
    const guestInfo = JSON.parse(localStorage.getItem("guestLoggedIn"));
    const guestObj = Object.values(guestInfo)[0];
    const preloadedState = {
      session: {
        isAuthenticated: true,
        currentUser: {
          email: guestObj.email,
          googleId: guestObj.googleId,
          googleImage: guestObj.googleImage,
          username: guestObj.username,
          id: guestObj.id
        }
      },
      users: guestObj
    };

    store = ConfigureStore(preloadedState);
  } else if (localStorage.getItem("userLoggedIn")) {
    // preload with logged in user
    const savedUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const userInfo = Object.values(savedUser)[0];

    let formattedUser = {
      email: userInfo.email,
      googleId: userInfo.googleId,
      googleImage: userInfo.googleImage,
      username: userInfo.username,
      id: userInfo.id
    };

    const preloadedState = {
      users: savedUser,
      session: { isAuthenticated: true, currentUser: formattedUser }
    };

    // check if user token has expired
    let token = localStorage.getItem("authtoken");

    const decodedUser = jwt_decode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    store = ConfigureStore(preloadedState);

    if (decodedUser.exp < currentTime) {
      localStorage.clear();
      store.dispatch(logout());
      window.location.href = "/";
    }
  } else {
    store = ConfigureStore();
  }

  const root = document.querySelector("#root");
  ReactDOM.render(<Giftable store={store} />, root);
});
