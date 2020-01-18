import { connect } from "react-redux";
import { login, guest } from "../../actions/session_actions";
import Home from "./home";

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  guestLogin: () => dispatch(guest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
