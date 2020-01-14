import { RECEIVE_TEST_INFO } from "../actions/session_actions";

const initialState = {
  message: "This is the default state"
};

const SessionReducer = (prevState = initialState, action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_TEST_INFO:
      return action.serverResponse;
    default:
      return prevState;
  }
};

export default SessionReducer;
