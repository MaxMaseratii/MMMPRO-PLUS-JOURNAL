import React from "react";
import { Switch, Route } from "wouter";
import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/login-page";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default App;
