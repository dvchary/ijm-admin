import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn, getInitialData } from "./actions";
import Units from "./pages/Units";
import Masters from "./pages/Masters";
import Projects from "./pages/Projects";
import Properties from "./pages/Properties";
import Blocks from "./pages/Blocks";
import Wings from "./pages/Wings";
import Floors from "./pages/Floors";
import Orders from "./pages/Orders";
import Enquiryform from "./pages/Enquiryform";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // dispatch(getInitialData());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/units" component={Units} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/projects" component={Projects} />
        <PrivateRoute path="/properties" component={Properties} />
        <PrivateRoute path="/masters" component={Masters} />
        <PrivateRoute path="/blocks" component={Blocks} />
        <PrivateRoute path="/wings" component={Wings} />
        <PrivateRoute path="/floors" component={Floors} />
        <PrivateRoute path="/enquiryform" component={Enquiryform} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
