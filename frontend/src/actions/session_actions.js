import * as APIUtil from "../util/session_api_util";

export const RECEIVE_TEST_INFO = "RECEIVE_TEST_INFO";

const receiveTestInfo = testInfo => ({
  type: RECEIVE_TEST_INFO,
  incomingData: testInfo
});

export const testAction = () => dispatch =>
  APIUtil.foo()
    .then(response => dispatch(receiveTestInfo(response)))
    .catch(err => console.log(err));
