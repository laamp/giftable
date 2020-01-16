import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

// components
import HomeContainer from "./home/home_container";

const App = () => (
  <>
    <div className="content">
      <ProtectedRoute path="/" component={() => <p>nav bar</p>} />
      <Switch>
        <AuthRoute exact path="/" component={HomeContainer} />
      </Switch>
    </div>
  </>
);

export default App;
