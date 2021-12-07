import { Component } from "react"
import { Grid, TextField, Button, useMediaQuery } from "@mui/material"

class DesktopMainPage extends Component {
  treatAsEmpty = ["", "-", "+", "."]

  state = {
    x: "",
    y: "",
    r: "",
    xError: true,
    yError: false,
    rError: false,
    points: [],
  }

  createNumberField(coordName, minValue, maxValue) {
    return <TextField
      label={coordName.toUpperCase()}
      value={this.state[coordName]}
      error={this.state[coordName + "Error"]}
      variant="outlined"
      onClick={() => { this.setState({ xError: false, yError: false, rError: false }) }}
      onInput={(event) => {
        let value = event.target.value.replace(/^-\+\.0-9/gi, "")
        if (this.treatAsEmpty.includes(value)) {
          let floatValue = parseFloat(value)
          if (floatValue > maxValue) value = maxValue.toString()
          else if (floatValue < minValue) value = minValue.toString()
        }
        const state = this.state
        state[coordName] = value
        this.setState(state)
      }}
    />
  }

  addPoint(x, y) {
  }

  addPointFromState() {
    this.addPoint(this.state.x, this.state.y)
  }

  render() {

    return <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            {this.createNumberField("x", -3, 3)}
          </Grid>
          <Grid item xs={3}>
            {this.createNumberField("y", -5, 3)}
          </Grid>
          <Grid item xs={3}>
            {this.createNumberField("r", 0, 3)}
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => this.addPointFromState()}
            >
              Add Point
            </Button>
          </Grid>
        </Grid >
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <canvas />
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        Results
      </Grid>
    </Grid>
  }
}

export default function MainPage() {
  const desktop = useMediaQuery('(min-width:1043px)')
  const tablet = useMediaQuery('(min-width:750px)')
  return <DesktopMainPage />
}
