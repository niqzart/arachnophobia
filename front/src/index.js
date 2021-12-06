import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import HomePage from "./home"
import MainPage from "./main"

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/main/" component={MainPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)
