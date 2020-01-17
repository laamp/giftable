import React from "react";
import { withRouter, Redirect } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "1026168862240-it3jpjrqpt0ac6h1toovjkfu540qlt6h.apps.googleusercontent.com"
      });
    });
  }

  signOut() {
    let authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
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
