import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider, CssBaseline, Grid, createTheme } from "@mui/material"

import HomePage from "./home"
import MainPage from "./main"

render(
  <ThemeProvider theme={createTheme({palette: {mode: "dark", primary: {main: "#6495ed", contrastText: "#fff"}}})}>
    <CssBaseline />
    
    <Grid
      container
      style={{
        width: "100%",
        backgroundColor: "cornflowerblue",
        padding: "10px 10px 10px 10px",
        borderBottom: "1px solid black"
      }}
    >
      <Grid item xs={4} style={{textAlign: "left"}}>
        Нестеров Николай
      </Grid>
      <Grid item xs={4} style={{textAlign: "center"}}>
        P3230
      </Grid>
      <Grid item xs={4} style={{textAlign: "right"}}>
        Вариант: 30811
      </Grid>
    </Grid>

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/main/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
)
