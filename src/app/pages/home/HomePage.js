import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Users from './Users';
import Students from "./Students";
import UniversityClasses from "./UniversityClasses";
import CourseClasses from "./CourseClasses";
import Courses from "./Courses";
import Teachers from "./Teachers";
import Scores from "./Scores";
import StudentScores from "./StudentScores";

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
        <Route path="/users" component={Users} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/students" component={Students} />
        <Route path="/university-classes" component={UniversityClasses} />
        <Route path="/courses" component={Courses} />
        <Route path="/course-classes" component={CourseClasses} />
        <Route path="/course-class-scores" component={Scores} />
        <Route path="/student-scores" component={StudentScores} />
        <Redirect to="/error/404" />
      </Switch>
    </Suspense>
  );
}
