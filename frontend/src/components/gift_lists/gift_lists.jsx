import React from "react";
import { withRouter } from "react-router-dom";

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
            <li key={`gift_list_${idx}`}>{list.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(GiftLists);
