import { Component } from "react"
import { Button, Grid, TextField as _TextField, InputAdornment, IconButton, useMediaQuery } from "@mui/material"
import { Visibility, VisibilityOff, Email, AccountCircle } from "@mui/icons-material"

class TextField extends Component {
  constructor(props) {
    super()
    this.props = props
    this.onSetValue = props.onSetValue === undefined ? () => { } : props.onSetValue
  }

  render() {
    return <_TextField onChange={(event) => this.onSetValue(event.target.value)} {...this.props} />
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
    username: "",
    password: "",
    errors: [],
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
        <IconTextField label="Email or Username" variant="outlined" icon={<AccountCircle />} />
      </Grid>
      <Grid item xs={3}>
        <PasswordField onSetValue={console.log} />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
        >
          Sign In
        </Button>
      </Grid>
    </Grid >
  }
}

class SingUp extends Component {
  render() {
    return <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <IconTextField label="Email" variant="outlined" icon={<Email />} />
      </Grid>
      <Grid item xs={12}>
        <IconTextField label="Username" variant="outlined" icon={<AccountCircle />} />
      </Grid>
      <Grid item xs={12}>
        <PasswordField />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" >Sing Up</Button>
      </Grid>
    </Grid>
  }
}

export default function HomePage() {
  const desktop = useMediaQuery('(min-width:600px)')

  return <Grid
    container
    spacing={4}
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
    <Grid item xs={6}>
      <SingUp />
    </Grid>
    <Grid item xs={6}>
      <SingIn />
    </Grid>
  </Grid>
}
