import React from "react";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.guestLogin = this.guestLogin.bind(this);
    this.googleLoginSuccess = this.googleLoginSuccess.bind(this);
  }

  componentDidMount() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "1026168862240-it3jpjrqpt0ac6h1toovjkfu540qlt6h.apps.googleusercontent.com"
      });

      this.renderGoogleButton();
    });
  }

  googleLoginSuccess(user) {
    const profile = user.getBasicProfile();
    let userInfo = {
      id: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      photo: profile.getImageUrl(),
      idToken: user.getAuthResponse().id_token
    };

    localStorage.setItem("authtoken", userInfo.idToken);

    this.props.login(userInfo);
  }

  guestLogin() {
    this.props.guestLogin();
    localStorage.setItem(
      "guestLoggedIn",
      JSON.stringify({
        email: "guest@giftable.com",
        name: "Guest",
        google_id: "Not a Google account",
        google_img: "Not applicable"
      })
    );
  }

  renderGoogleButton() {
    window.gapi.load("signin2", () => {
      window.gapi.signin2.render("login-button", {
        longtitle: true,
        theme: "dark",
        onsuccess: this.googleLoginSuccess
      });
    });
  }

  renderAuthButton() {
    return (
      <>
        <p>You ain't signed in. Click the button to do that.</p>
        <div id="login-button">Login with Google</div>
      </>
    );
  }

  render() {
    return (
      <div className="app">
        <h1>Title goes here</h1>

        {this.renderAuthButton()}

        <button onClick={this.guestLogin}>Guest</button>
      </div>
    );
  }
}

export default withRouter(Home);
