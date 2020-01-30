import React from "react";
import { withRouter } from "react-router-dom";
import GiftList from "./gift_list/gift_list";

class GiftLists extends React.Component {
  componentDidMount() {
    this.props.getAllLists(this.props.currentUser.id);
  }

  render() {
    return (
      <div>
        <h3>Gift Lists</h3>
        <ul>
          {Object.values(this.props.giftLists).map((list, idx) => (
            <GiftList list={list} key={`gift_list_${idx}`} />
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(GiftLists);
