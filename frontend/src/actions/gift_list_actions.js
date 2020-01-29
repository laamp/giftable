import * as APIUtil from "../util/gift_list_api_util";

export const RECEIVE_GIFT_LIST = "RECEIVE_GIFT_LIST";
export const RECEIVE_GIFT_LISTS = "RECEIVE_GIFT_LISTS";

// get a list
const receiveGiftList = newList => ({
  type: RECEIVE_GIFT_LIST,
  newList
});

// get all of a user's lists
const receiveGiftLists = allLists => ({
  type: RECEIVE_GIFT_LISTS,
  allLists
});

// export const getAllLists = id => dispatch =>
//     APIUtil.getGiftLists(id)
//     .then(response => dispatch(receiveGiftLists(response.data)))
//     .catch
