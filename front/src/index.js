import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider, CssBaseline, Grid, Alert, Snackbar, createTheme } from "@mui/material"
import { Provider, connect } from "react-redux"

import store from "./stores"
import { catchError } from "./stores"

import HomePage from "./home"
import MainPage from "./main"

class App extends React.Component {
  render() {
    console.log(this.props)
    return <ThemeProvider theme={createTheme({ palette: { mode: "dark", primary: { main: "#6495ed", contrastText: "#fff" } } })}>
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
        <Grid item xs={4} style={{ textAlign: "left" }}>
          Нестеров Николай
        </Grid>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          P3230
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          Вариант: 30811
        </Grid>
      </Grid>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/main/" component={MainPage} />
        </Switch>
      </BrowserRouter>

      <Snackbar
        open={this.props.serverError}
        autoHideDuration={3000}
        onClose={this.props.catchError}
      >
        <Alert severity="error">
          Server Error Occurred
        </Alert>
      </Snackbar>
    </ThemeProvider>
  }
}

const Application = connect(state => state.dialogReducer, { catchError })(App)

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
)
