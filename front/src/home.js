import { Component, useState } from "react"
import { Button, Box, Grid, TextField as _TextField, Tab, InputAdornment, IconButton, useMediaQuery } from "@mui/material"
import { TabContext, TabPanel, TabList } from "@mui/lab"
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
    console.log(0)
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

function DesktopHomePage() {
  return <Grid
    container
    spacing={4}
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "90vh", width: "1042px", marginRight: "auto", marginLeft: "auto" }}
  >
    <Grid item xs={6}>
      <SingUp />
    </Grid>
    <Grid item xs={6}>
      <SingIn />
    </Grid>
  </Grid>
}

function TabletHomePage() {
  return <Grid
    container
    spacing={4}
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "90vh" }}
  >
    <Grid item xs={6}>
      <SingUp />
    </Grid>
    <Grid item xs={6}>
      <SingIn />
    </Grid>
  </Grid>
}

function MobileHomePage() {
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
        <SingUp />
      </div>
    </TabPanel>
    <TabPanel value="2">
      <div style={{ display: "flex", alignItems: "center", minHeight: "70vh" }} >
        <SingIn />
      </div>
    </TabPanel>
  </TabContext>
}

export default function HomePage() {
  const desktop = useMediaQuery('(min-width:1043px)')
  const tablet = useMediaQuery('(min-width:750px)')
  if (desktop) {
    return <DesktopHomePage />
  } else if (tablet) {
    return <TabletHomePage />
  } else {
    return <MobileHomePage />
  }
}
