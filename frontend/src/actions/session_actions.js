import * as APIUtil from "../util/session_api_util";

export const RECEIVE_TEST_INFO = "RECEIVE_TEST_INFO";

const receiveTestInfo = response => ({
  type: RECEIVE_TEST_INFO,
  serverResponse: response
});

export const sendGoogleToken = token => dispatch =>
  APIUtil.sendGoogleToken(token)
    .then(response => dispatch(receiveTestInfo(response.data)))
    .catch(err => console.log(err));
