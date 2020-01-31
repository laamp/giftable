import React from "react";
import { withRouter } from "react-router-dom";

class GiftListNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  submit = () => {
    console.log(this.state.title);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter a title"
          value={this.state.title}
          onChange={this.update("title")}
        />
        <button onClick={this.submit}>Create list</button>
      </div>
    );
  }
}

export default withRouter(GiftListNew);
