import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Login, Calculator, Signup } from "./components";
import axios from "axios";
function App() {
  const history = useHistory();
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      const link = "/" + userDetails.user.id + "/calculator";
      history.push(link);
    }
  }, [history]);
  return (
    <div className="">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/:id/calculator" component={Calculator} />
        <Route exact path="/signup" component={Signup} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;
