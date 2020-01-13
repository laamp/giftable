import { connect } from "react-redux";
import { testAction } from "../actions/session_actions";
import App from "./app";

const mapStateToProps = state => ({
  currentState: state
});

const mapDispatchToProps = dispatch => ({
  testAction: () => dispatch(testAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
