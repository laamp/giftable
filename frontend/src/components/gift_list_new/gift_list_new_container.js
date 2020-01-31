import { connect } from "react-redux";
import { createList } from "../../actions/gift_list_actions";
import GiftListNew from "./gift_list_new";

const mSTP = state => ({});

const mDTP = dispatch => ({
  createList: (title, id) => dispatch(createList(title, id))
});

export default connect(mSTP, mDTP)(GiftListNew);
