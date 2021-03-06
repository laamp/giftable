import * as APIUtil from "../util/session_api_util";

export const RECEIVE_LOGIN = "RECEIVE_LOGIN";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";

// log in
const receiveLogin = currentUser => ({
  type: RECEIVE_LOGIN,
  currentUser
});

export const login = user => dispatch =>
  APIUtil.login(user)
    .then(response => {
      dispatch(receiveLogin(response.data));
      localStorage.setItem("userLoggedIn", JSON.stringify(response.data));
    })
    .catch(err => console.log(err.response.data));

// log out
const receiveLogout = () => ({
  type: RECEIVE_LOGOUT
});

export const logout = () => dispatch =>
  APIUtil.logout()
    .then(() => {
      localStorage.clear();
      dispatch(receiveLogout());
    })
    .catch(err => console.log(err.response.data));

// guest log in
export const guest = () => dispatch =>
  APIUtil.guestLogin()
    .then(response => {
      dispatch(receiveLogin(response.data));
      localStorage.setItem("guestLoggedIn", JSON.stringify(response.data));
    })
    .catch(err => console.log(err.response.data));
