import React from "react";
import { withRouter, Redirect } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        this.props.logout();
        return <Redirect to="/" />;
      });
  }

  render() {
    return (
      <div className="nav-bar">
        <img
          src={this.props.currentUser.googleImg}
          alt={this.props.currentUser.name}
        />
        <p>Hello, {this.props.currentUser.name}</p>
        <button onClick={this.signOut}>Log out</button>
      </div>
    );
  }
}

export default withRouter(NavBar);
