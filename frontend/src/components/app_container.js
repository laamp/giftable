import { connect } from "react-redux";
import { sendGoogleToken } from "../actions/session_actions";
import App from "./app";

const mapStateToProps = state => ({
  currentState: state
});

const mapDispatchToProps = dispatch => ({
  sendUserInfo: userInfo => dispatch(sendGoogleToken(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
