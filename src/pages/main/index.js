import React from "react";
import { Route, Switch } from "react-router-dom";
import Elegant from "./elegant";
import ClassNav from "./class";
import Smile from "./smile";
import "./main.less";

const Main = () => (
  <div className="main-style">
    <Switch>
      <Route path="/elegant" component={Elegant} />
      <Route path="/smile" exact component={Smile} />
      <Route path="/classNav" exact component={ClassNav} />
    </Switch>
  </div>
);

export default Main;
