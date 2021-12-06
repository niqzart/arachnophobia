import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material"

import HomePage from "./home"
import MainPage from "./main"

render(
  <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/main/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
)
