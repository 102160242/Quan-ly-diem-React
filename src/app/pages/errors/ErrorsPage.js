import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Error404 } from "./Error404";
import { Error403 } from "./Error403";

export default function ErrorsPage() {
  return (
      <Switch>
        <Redirect from="/error" exact={true} to="/error/404" />
        <Route path="/error/404" component={Error404} />
        <Route path="/error/403" component={Error403} />
      </Switch>
  );
}
