import * as APIUtil from "../util/session_api_util";

export const RECEIVE_LOGIN = "RECEIVE_LOGIN";

const receiveLogin = currentUser => ({
  type: RECEIVE_LOGIN,
  currentUser
});

export const login = user => dispatch =>
  APIUtil.login(user)
    .then(response => dispatch(receiveLogin(response.data)))
    .catch(err => console.log(err.response.data));
