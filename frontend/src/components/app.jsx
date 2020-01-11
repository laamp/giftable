import React from "react";
import { Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    };

    this.toggleAuthStatus = this.toggleAuthStatus.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "1026168862240-it3jpjrqpt0ac6h1toovjkfu540qlt6h.apps.googleusercontent.com"
      });

      this.renderGoogleButton();

      this.auth2.isSignedIn.listen(this.toggleAuthStatus);
    });
  }

  getProfileInfo(user) {
    const profile = user.getBasicProfile();
    console.log(`Name: ${profile.getName()}, Email: ${profile.getEmail()}`);
    console.log(`ID token: ${user.getAuthResponse().id_token}`);
  }

  renderGoogleButton() {
    window.gapi.load("signin2", () => {
      window.gapi.signin2.render("login-button", {
        longtitle: true,
        theme: "dark",
        onsuccess: this.getProfileInfo
      });
    });
  }

  toggleAuthStatus(signedIn) {
    this.setState({ signedIn });

    if (!signedIn) this.renderGoogleButton();
  }

  signOut() {
    let currAuthInstance = window.gapi.auth2.getAuthInstance();
    currAuthInstance.signOut();
  }

  renderAuthButton() {
    if (this.state.signedIn) {
      return (
        <>
          <p>Hey, you're signed in.</p>
          <button onClick={this.signOut}>Log out</button>
        </>
      );
    } else {
      return (
        <>
          <p>You ain't signed in. Click the button to do that.</p>
          <button id="login-button">Login with Google</button>
        </>
      );
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Title goes here</h1>

        {this.renderAuthButton()}
      </div>
    );
  }
}

export default App;
