import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
// import { Switch } from "react-router-dom";

// components
import HomeContainer from "./home/home_container";
import NavBarContainer from "./nav_bar/nav_bar_container";
import GiftListsContainer from "./gift_lists/gift_lists_container";
import GiftListNewContainer from "./gift_list_new/gift_list_new_container";

const App = () => (
  <>
    <div className="content">
      <ProtectedRoute path="/home" component={NavBarContainer} />
      <ProtectedRoute path="/home" component={GiftListNewContainer} />
      <ProtectedRoute path="/home" component={GiftListsContainer} />
      <AuthRoute exact path="/" component={HomeContainer} />
    </div>
  </>
);

export default App;
