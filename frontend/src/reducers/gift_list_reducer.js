import {
  RECEIVE_GIFT_LIST,
  RECEIVE_GIFT_LISTS
} from "../actions/gift_list_actions";

const GiftListReducer = (prevState = {}, action = null) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_GIFT_LIST:
      return Object.assign({}, prevState, action.newList);
    case RECEIVE_GIFT_LISTS:
      return action.allLists;
    default:
      return prevState;
  }
};

export default GiftListReducer;
