import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Users from './Users';
import User_Add from './user_action/AddUser';
import User_Edit from './user_action/EditUser';

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />

        <Route exact path="/users" component={Users} />
        <Route exact path="/users/new" component={User_Add} />
        <Route exact path="/users/:user_id/edit" component={User_Edit} />

        <Redirect to="/error/404" />
      </Switch>
    </Suspense>
  );
}
