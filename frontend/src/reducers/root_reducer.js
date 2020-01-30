import { combineReducers } from "redux";
import SessionReducer from "./session_reducer";
import UserReducer from "./user_reducer";
import GiftListsReducer from "./gift_list_reducer";

const RootReducer = combineReducers({
  session: SessionReducer,
  users: UserReducer,
  giftLists: GiftListsReducer
});

export default RootReducer;
