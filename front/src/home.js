import { Component, useState } from "react"
import { Button, Box, Grid, TextField as BaseTextField, Tab, InputAdornment, IconButton, useMediaQuery } from "@mui/material"
import { TabContext, TabPanel, TabList } from "@mui/lab"
import { Visibility, VisibilityOff, Email, AccountCircle } from "@mui/icons-material"
import { Redirect } from "react-router"

function validateEmail(email) {
  if (String(email).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    return null
  return "Email is invalid"
}

class TextField extends Component {
  constructor(props) {
    super()
    this.props = props
    this.onSetValue = props.onSetValue === undefined ? () => { } : props.onSetValue
  }

  render() {
    return <BaseTextField onChange={(event) => this.onSetValue(event.target.value)} {...this.props} />
  }
}

class PasswordField extends Component {
  constructor({ onSetValue }) {
    super()
    this.onSetValue = onSetValue
  }

  state = {
    passwordVisible: false,
  }

  render() {
    return <TextField
      label="Password"
      variant="outlined"
      type={this.state.passwordVisible ? 'text' : 'password'}
      onSetValue={this.onSetValue}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <IconButton onClick={() => this.setState({ passwordVisible: !this.state.passwordVisible })}>
            {this.state.passwordVisible ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }}
      {...this.props}
    />
  }
}

function IconTextField(props) {
  return <TextField
    InputProps={{
      endAdornment: <InputAdornment position="end">
        <IconButton disabled style={{ color: "white" }}>
          {props.icon}
        </IconButton>
      </InputAdornment>
    }}
    {...props}
  />
}

class SingIn extends Component {
  state = {
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
    serverError: false,
  }

  render() {
    return <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <IconTextField
          label="Email"
          variant="outlined"
          icon={<Email />}
          helperText={this.state.emailError}
          error={this.state.emailError !== null}
          onSetValue={value => { this.setState({ email: value, emailError: null }) }}
        />
      </Grid>
      <Grid item xs={3}>
        <PasswordField
          helperText={this.state.passwordError}
          error={this.state.passwordError !== null}
          onSetValue={value => { this.setState({ password: value, passwordError: null }) }}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          onClick={() => {
            if (this.state.email === "" || this.state.password === "") this.setState({
              emailError: this.state.email === "" ? "Email can't be empty" : null,
              passwordError: this.state.password === "" ? "Password can't be empty" : null,
            })
            else fetch("/api/users/signin/", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: this.state.email, password: this.state.password }),
            }).then(response => response.status === 200 ? response.json() : null)
              .then(data => {
                if (data === null) this.setState({ serverError: true })
                else if (data.message === "User not found") this.setState({ emailError: "User doesn't exist" })
                else if (data.message === "Wrong password") this.setState({ passwordError: "Wrong password" })
                else if (data.message === "OK") this.props.setLoggedIn(true)
                else console.error(data.message)
              }).catch(e => console.log("lol", e))
          }}
        >
          Sign In
        </Button>
      </Grid>
    </Grid >
  }
}

class SingUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    emailError: null,
    usernameError: null,
    passwordError: null,
    serverError: false,
  }

  render() {
    return <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <IconTextField
          label="Email"
          variant="outlined"
          icon={<Email />}
          helperText={this.state.emailError}
          error={this.state.emailError !== null}
          onSetValue={value => { this.setState({ email: value, emailError: null }) }}
        />
      </Grid>
      <Grid item xs={12}>
        <IconTextField
          label="Username"
          variant="outlined"
          icon={<AccountCircle />}
          helperText={this.state.usernameError}
          error={this.state.usernameError !== null}
          onSetValue={value => { this.setState({ username: value, usernameError: null }) }}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordField
          helperText={this.state.passwordError}
          error={this.state.passwordError !== null}
          onSetValue={value => { this.setState({ password: value, passwordError: null }) }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => {
            const errors = {
              emailError: this.state.email === "" ? "Email can't be empty" : validateEmail(this.state.email),
              usernameError: this.state.username === "" ? "Username can't be empty" : null,
              passwordError: this.state.password === "" ? "Password can't be empty" : null,
            }
            console.log(errors)
            if (errors.emailError || errors.usernameError || errors.passwordError) this.setState(errors)
            else fetch("/api/users/signup/", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: this.state.email, username: this.state.username, password: this.state.password }),
            }).then(response => response.status === 200 ? response.json() : null).then(data => {
              if (data === null) this.setState({ serverError: true })
              else if (data.message === "Email in use") this.setState({ emailError: "Email already in use" })
              else if (data.message === "OK") this.props.setLoggedIn(true)
              else console.error(data.message)
            }).catch(e => console.log("lol", e.json()))
          }}
        >Sing Up</Button>
      </Grid>
    </Grid>
  }
}

function DesktopHomePage({ desktop, setLoggedIn }) {
  const style = desktop ? { width: "1042px", marginRight: "auto", marginLeft: "auto" } : {}
  return <Grid
    container
    spacing={4}
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "90vh", ...style }}
  >
    <Grid item xs={6}>
      <SingUp setLoggedIn={setLoggedIn} />
    </Grid>
    <Grid item xs={6}>
      <SingIn setLoggedIn={setLoggedIn} />
    </Grid>
  </Grid>
}

function MobileHomePage({ setLoggedIn }) {
  const [value, setValue] = useState('1')

  const handleChange = (_, newValue) => {
    setValue(newValue);
  }

  return <TabContext value={value}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={handleChange}>
        <Tab label="Sign Up" value="1" />
        <Tab label="Sign In" value="2" />
      </TabList>
    </Box>
    <TabPanel value="1">
      <div style={{ display: "flex", alignItems: "center", minHeight: "70vh" }} >
        <SingUp setLoggedIn={setLoggedIn} />
      </div>
    </TabPanel>
    <TabPanel value="2">
      <div style={{ display: "flex", alignItems: "center", minHeight: "70vh" }} >
        <SingIn setLoggedIn={setLoggedIn} />
      </div>
    </TabPanel>
  </TabContext>
}

export default function HomePage() {
  const [loggedIn, setLoggedIn ] = useState(false)
  const desktop = useMediaQuery('(min-width:1043px)')
  const tablet = useMediaQuery('(min-width:750px)')
  if (loggedIn) return <Redirect to="/main" />
  return tablet ? <DesktopHomePage desktop={desktop} setLoggedIn={setLoggedIn} /> : <MobileHomePage setLoggedIn={setLoggedIn} />
}
