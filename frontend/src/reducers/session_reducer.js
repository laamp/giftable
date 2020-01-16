import { RECEIVE_LOGIN, RECEIVE_LOGOUT } from "../actions/session_actions";

const initialState = {
  currentUser: null,
  isAuthenticated: false
};

const SessionReducer = (prevState = initialState, action = null) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_LOGIN:
      return {
        currentUser: action.currentUser,
        isAuthenticated: !!action.currentUser
      };
    case RECEIVE_LOGOUT:
      return initialState;
    default:
      return prevState;
  }
};

export default SessionReducer;
