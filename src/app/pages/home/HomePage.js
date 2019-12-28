import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";
import Users from './Users';
import User_Add from './user_action/AddUser';
import User_Edit from './user_action/EditUser';
import Students from "./Students";
import UniversityClasses from "./UniversityClasses";
import CourseClasses from "./CourseClasses";
import Courses from "./Courses";
import Teachers from "./Teachers";
import CourseClasses_Add from './CourseClasses_action/Add'
import CourseClasses_Edit from './CourseClasses_action/Edit'
import Scores from "./Scores";
import StudentScores from "./StudentScores";
import UniversityClasses_Add from "./UniversityClasses_action/Add";
import UniversityClasses_Edit from "./UniversityClasses_action/Edit";

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
        <Route path="/users" component={Users} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/students" component={Students} />
        <Route exact path="/university-classes/:universityclass_id/edit" component={UniversityClasses_Edit} />
        <Route exact path="/university-classes/new" component={UniversityClasses_Add} />
        <Route path="/university-classes" component={UniversityClasses} />
        <Route path="/courses" component={Courses} />
        <Route exact path="/course-classes" component={CourseClasses} />
        <Route exact path="/course-classes/new" component={CourseClasses_Add} />
        <Route exact path="/course-classes/:courseclass_id/edit" component={CourseClasses_Edit} />
        <Route path="/course-class-scores" component={Scores} />
        <Route path="/student-scores" component={StudentScores} />
        <Redirect to="/error/404" />
      </Switch>
    </Suspense>
  );
}
