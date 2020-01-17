import React from "react";
import { withRouter } from "react-router-dom";
import { setAuthToken } from "../../util/session_api_util";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.signInCallback = this.signInCallback.bind(this);
    this.getProfileInfo = this.getProfileInfo.bind(this);
  }

  componentDidMount() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "1026168862240-it3jpjrqpt0ac6h1toovjkfu540qlt6h.apps.googleusercontent.com"
      });

      this.renderGoogleButton();

      this.auth2.isSignedIn.listen(this.signInCallback);
    });
  }

  getProfileInfo(user) {
    const profile = user.getBasicProfile();
    let userInfo = {
      id: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      photo: profile.getImageUrl(),
      idToken: user.getAuthResponse().id_token
    };

    setAuthToken(userInfo.idToken);
    localStorage.setItem("authtoken", userInfo.idToken);

    this.props.login(userInfo);
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

  signInCallback(signedIn) {
    if (!signedIn) this.renderGoogleButton();
  }

  renderAuthButton() {
    return (
      <>
        <p>You ain't signed in. Click the button to do that.</p>
        <button id="login-button">Login with Google</button>
      </>
    );
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

export default withRouter(Home);
