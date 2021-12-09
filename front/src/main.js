import { Component, useState } from "react"
import { Grid, TextField, Button, Box, useMediaQuery, Tab } from "@mui/material"
import { TabContext, TabPanel, TabList } from "@mui/lab"
import { DataGrid } from '@mui/x-data-grid'
import { Redirect } from "react-router"
import { connect } from "react-redux"

import { raiseError } from "./stores"

function isInside(x, y, r) {
  [ x, y, r ] = [x, y, r].map(parseFloat)
  if (x <= 0) return y <= x + r && y >= 0
  else if (y >= 0) return y * y + x * x <= (r * r) / 4
  else return y >= -r && x < r / 2
}

class MainPageLayout2 extends Component {
  constructor() {
    super()
    fetch("/api/points/", {
      method: "GET", mode: "cors", credentials: "include",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => {
        if (data !== null) this.setState({ points: data })
        else this.setState({ serverError: true })
      })
  }

  treatAsEmpty = ["", "-", "+", "."]

  state = {
    x: "",
    y: "",
    r: "",
    xError: false,
    yError: false,
    rError: false,
    points: [],
    mobileTab: "1",
    serverError: false,
  }

  createNumberField(coordName, minValue, maxValue) {
    return <TextField
      label={coordName.toUpperCase()}
      value={this.state[coordName]}
      error={this.state[coordName + "Error"]}
      variant="outlined"
      onClick={() => { this.setState({ xError: false, yError: false, rError: false }) }}
      onInput={(event) => {
        let value = event.target.value.replace(/[^0-9-+.]/gi, "").substring(0, 4)
        if (value.search(/^[+-]?\d*(\.\d*)?$/) === -1) value = ""
        else if (!this.treatAsEmpty.includes(value)) {
          let floatValue = parseFloat(value)
          if (floatValue > maxValue) value = maxValue.toString()
          else if (floatValue < minValue) value = minValue.toString()
        }
        if (coordName === "r" && value !== this.state.r) this.redrawPoints(value)
        const state = this.state
        state[coordName] = value
        this.setState(state)
      }}
    />
  }

  pushPoint(point) {
    let points = this.state.points.slice()
    points.push(point)
    this.setState({ points })
  }

  addPoint(x, y) {
    const point = { x: parseFloat(x), y: parseFloat(y), r: parseFloat(this.state.r), result: isInside(x, y, this.state.r) }
    fetch("/api/points/", {
      method: "POST", mode: "cors", credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(point),
    })
      .then(response => response.status === 200 ? response.json() : null)
      .then(data => {
        if (data !== null && data.message === "OK") {
          this.drawPoint({ x, y })
          this.pushPoint(point)
        }
      })
  }

  createForm() {
    return <Grid
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
        {this.createNumberField("y", -3, 3)}
      </Grid>
      <Grid item xs={3}>
        {this.createNumberField("r", 0, 3)}
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          onClick={() => {
            const xError = this.treatAsEmpty.includes(this.state.x)
            const yError = this.treatAsEmpty.includes(this.state.y)
            const rError = this.treatAsEmpty.includes(this.state.r) || parseFloat(this.state.r) === 0
            if (xError || yError || rError) this.setState({ xError, yError, rError })
            else this.addPoint(this.state.x, this.state.y)
          }}
        >
          Add Point
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            fetch("/api/users/signout/", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: { 'Content-Type': 'application/json' },
            }).then(response => response.status === 200 ? response.json() : null)
              .then(data => {
                if (data !== null && data.message === "OK") this.props.setLoggedIn(false)
                else this.props.raiseError()
              })
          }}
          style={{ marginLeft: "20px" }}
        >
          Quit
        </Button>
      </Grid>
    </Grid >
  }

  createCanvas() {
    return <canvas
      id="point-area"
      onClick={(event) => {
        if (this.treatAsEmpty.includes(this.state.r) || parseFloat(this.state.r) === 0) {
          this.setState({ rError: true })
        } else {
          const canvas = document.getElementById("point-area")
          const br = canvas.getBoundingClientRect();
          const x = (event.clientX - br.left - canvas.width / 2) / 130 * parseFloat(this.state.r)
          const y = (-event.clientY + br.top + canvas.height / 2) / 130 * parseFloat(this.state.r)
          this.addPoint(x.toFixed(2), y.toFixed(2))
        }
      }}
    />
  }

  createColumn(field, width) {
    return { field, width, headerName: field.charAt(0).toUpperCase() + field.slice(1), editable: true }
  }

  render() {
    console.log(this.state.points)
    const { desktop, tablet } = this.props
    if (tablet) {
      const style = desktop ? { width: "1042px", marginRight: "auto", marginLeft: "auto" } : { width: "100%" }
      return <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh", marginTop: "12px", ...style }}
      >
        <Grid item xs={6}>
          {this.createForm()}
        </Grid>
        <Grid item xs={6}>
          {this.createCanvas()}
        </Grid>
        <Grid item xs={12} style={{ margin: "20px", height: "420px", width: "100%" }}>
          <DataGrid
            columns={["x", "y", "r", "result"].map((value) => this.createColumn(value, 150))}
            rows={this.state.points.map((point, i) => { return { id: i, ...point } })}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
      </Grid>
    } else {
      return <TabContext value={this.state.mobileTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, mobileTab) => {
            this.setState({ mobileTab }, () => {
              if (mobileTab === "1") this.drawPicture(this.state.r)
            })
          }}>
            <Tab label="Inputs" value="1" />
            <Tab label="Results" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "70vh", marginTop: "12px" }}
          >
            <Grid item style={{ marginBottom: "30px" }}>
              {this.createForm()}
            </Grid>
            <Grid item>
              {this.createCanvas()}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <div style={{ display: "flex", alignItems: "center", height: "80vh" }} >
            <DataGrid
              columns={["x", "y", "r", "result"].map((value) => this.createColumn(value, 90))}
              rows={this.state.points.slice().reverse().map((point, i) => { return { id: i, ...point } })}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </TabPanel>
      </TabContext>
    }
  }

  drawPoint({ x, y, R }) {
    if (R === undefined) R = this.state.r
    R = parseFloat(R)
    console.log("drawPoint", x, y, R)

    const canvas = document.getElementById("point-area")
    if (canvas === undefined || canvas === null) return
    const context = canvas.getContext("2d")
    const point_size = 10

    context.beginPath()
    context.rect(
      canvas.width / 2 + (x / R * 130) - point_size / 2,
      canvas.height / 2 - (y / R * 130) - point_size / 2,
      point_size, point_size
    )
    context.closePath()

    const inside = isInside(x, y, R)
    context.strokeStyle = inside ? "lime" : "red"
    context.fillStyle = inside ? "lime" : "red"
    context.fill()
    context.stroke()
  }

  redrawPoints(R) {
    console.log("redrawPoints", R)
    for (let point of this.state.points) this.drawPoint({ R, ...point })
  }

  drawPicture(r) {
    console.log("fill")

    // Radius-helpers for marks on axes
    var full_tag = "R"
    var half_tag = "R/2"
    var half_shift = true
    if (!this.treatAsEmpty.includes(r) && parseFloat(r) !== 0) {
      r = parseFloat(r)
      full_tag = r
      half_tag = r / 2
      half_shift = half_tag % 1
    }

    const canvas = document.getElementById("point-area")
    if (canvas === undefined || canvas === null) return
    const size = 300
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext("2d")

    context.clearRect(0, 0, size, size);

    console.log(size)

    if (full_tag !== "R") {
      // rectangle
      context.beginPath()
      context.rect(size / 2, size / 2, 65, size / 2 - 20)
      context.closePath()
      context.strokeStyle = "#2f9aff"
      context.fillStyle = "#2f9aff"
      context.fill()
      context.stroke()

      // sector
      context.beginPath()
      context.moveTo(size / 2, size / 2)
      context.arc(size / 2, size / 2, 65, Math.PI, 0, false)
      context.closePath()
      context.strokeStyle = "#2f9aff"
      context.fillStyle = "#2f9aff"
      context.fill()
      context.stroke()

      // triangle
      context.beginPath()

      context.moveTo(size / 2, size / 2)
      context.lineTo(20, size / 2)
      context.lineTo(size / 2, 20)
      context.lineTo(size / 2, size / 2)

      context.closePath()
      context.strokeStyle = "#2f9aff"
      context.fillStyle = "#2f9aff"
      context.fill()
      context.stroke()
    }

    // axes
    context.beginPath()
    context.font = "10px Verdana"
    context.strokeStyle = "white"
    context.fillStyle = "white"

    context.moveTo(size / 2, 0)
    context.lineTo(size / 2, size)

    context.moveTo(size / 2, 0)
    context.lineTo(145, 10)
    context.moveTo(size / 2, 0)
    context.lineTo(155, 10)

    context.fillText("Y", 160, 8)

    context.moveTo(0, size / 2)
    context.lineTo(size, size / 2)

    context.moveTo(size, size / 2)
    context.lineTo(290, 145)
    context.moveTo(size, size / 2)
    context.lineTo(290, 155)

    context.fillText("X", 292, 140)

    // Y marks on axes
    context.moveTo(145, 20)
    context.lineTo(155, 20)
    context.fillText(full_tag, 160, 23)

    context.moveTo(145, 85)
    context.lineTo(155, 85)
    context.fillText(half_tag, 160, 87)

    context.moveTo(145, 215)
    context.lineTo(155, 215)
    context.fillText("-" + half_tag, 160, 218)

    context.moveTo(145, 280)
    context.lineTo(155, 280)
    context.fillText("-" + full_tag, 160, 283)

    // X marks on axes
    context.moveTo(20, 145)
    context.lineTo(20, 155)
    context.fillText("-" + full_tag, 15, 142)

    context.moveTo(85, 145)
    context.lineTo(85, 155)
    context.fillText("-" + half_tag, half_shift ? 72 : 78, 142)

    context.moveTo(215, 145)
    context.lineTo(215, 155)
    context.fillText(half_tag, half_shift ? 207 : 211, 142)

    context.moveTo(280, 145)
    context.lineTo(280, 155)
    context.fillText(full_tag, 277, 142)

    context.closePath()
    context.strokeStyle = "white"
    context.fillStyle = "white"
    context.stroke()

    if (full_tag !== "R") this.redrawPoints(r)
  }

  componentDidUpdate() {
    this.drawPicture(this.state.r)
  }

  componentDidMount() {
    this.drawPicture("")
  }
}

const MainPageLayout = connect(null, { raiseError })(MainPageLayout2)

export default function MainPage() {
  const [loggedIn, setLoggedIn ] = useState(true)
  const desktop = useMediaQuery('(min-width:1043px)')
  const tablet = useMediaQuery('(min-width:750px)')
  if (!loggedIn) return <Redirect to="/" />
  return <MainPageLayout desktop={desktop} tablet={tablet} setLoggedIn={setLoggedIn} />
}
