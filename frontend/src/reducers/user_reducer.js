import { RECEIVE_LOGIN } from "../actions/session_actions";

const UserReducer = (prevState = {}, action = null) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_LOGIN:
      return Object.assign({}, prevState, action.currentUser);
    default:
      return prevState;
  }
};

export default UserReducer;
