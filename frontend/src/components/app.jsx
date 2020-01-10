import React from "react";
import { Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    };
  }

  componentDidMount() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "1026168862240-it3jpjrqpt0ac6h1toovjkfu540qlt6h.apps.googleusercontent.com"
      });

      window.gapi.load("signin2", function() {
        // render a sign in button
        // using this method will show Signed In if the user is already signed in
        let opts = {
          width: 200,
          height: 50
          // onSuccess: this.onSuccess.bind(this)
        };
        window.gapi.signin2.render("login-button", opts);
      });
    });
  }

  getLoginMessage() {
    if (this.state.signedIn) {
      return <p>Hey, you're signed in.</p>;
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

        {this.getLoginMessage()}
      </div>
    );
  }
}

export default App;
