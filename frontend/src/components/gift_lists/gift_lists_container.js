import { connect } from "react-redux";
import { createList, getAllLists } from "../../actions/gift_list_actions";
import GiftLists from "./gift_lists";

const mSTP = state => ({
  currentUser: state.session.currentUser,
  giftLists: state.giftLists
});

const mDTP = dispatch => ({
  createList: (title, id) => dispatch(createList(title, id)),
  getAllLists: id => dispatch(getAllLists(id))
});

export default connect(mSTP, mDTP)(GiftLists);
