import { Component } from "react"
import { Grid, TextField, Button, useMediaQuery } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'

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
        let value = event.target.value.replace(/[^0-9-+.]/gi, "")
        if (!this.treatAsEmpty.includes(value)) {
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

  createColumn(name) {
    return {
      field: name,
      headerName: name.charAt(0).toUpperCase() + name.slice(1),
      width: 150,
      editable: true,
    }
  }

  addPoint(x, y) {
    this.drawPoint({ x, y })
    let points = this.state.points.slice()
    points.push({ x, y, r: this.state.r })
    this.setState({ points })
  }

  render() {
    return <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh", marginTop: "12px" }}
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
              onClick={() => this.addPoint(this.state.x, this.state.y)}
            >
              Add Point
            </Button>
          </Grid>
        </Grid >
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <canvas
          id="point-area"
          onClick={(event) => {
            if (this.treatAsEmpty.includes(this.state.r)) {
              console.log("lol")
            } else {
              const canvas = document.getElementById("point-area")
              const br = canvas.getBoundingClientRect();
              const x = (event.clientX - br.left - canvas.width / 2) / 130 * this.state.r
              const y = (-event.clientY + br.top + canvas.height / 2) / 130 * this.state.r
              this.addPoint(x, y)
            }
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ margin: "20px", height: "420px", width: "100%" }}>
        <DataGrid
          columns={["x", "y", "r", "inside", "result"].map((value) => this.createColumn(value))}
          rows={this.state.points.map((point, i) => { return { id: i, ...point } })}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
    </Grid>
  }

  drawPoint({ x, y, R, inside }) {
    if (R === undefined) R = this.state.r
    console.log("drawPoint", x, y, R, inside)

    const canvas = document.getElementById("point-area")
    const context = canvas.getContext("2d")
    const point_size = 10

    context.beginPath()
    context.rect(
      canvas.width / 2 + (x / R * 130) - point_size / 2,
      canvas.height / 2 - (y / R * 130) - point_size / 2,
      point_size, point_size
    )
    context.closePath()

    context.strokeStyle = "black"
    context.fillStyle = inside ? "lime" : "red"
    context.fill()
    context.stroke()
  }

  redrawPoints(R) {
    console.log("redrawPoints", R)
    this.drawPicture(R)
    for (let point of this.state.points) this.drawPoint({ R, ...point })
  }

  drawPicture(r) {
    console.log("fill")

    const canvas = document.getElementById("point-area")
    const size = 300
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext("2d")

    context.clearRect(0, 0, size, size);

    console.log(size)

    // rectangle
    context.beginPath()
    context.rect(size / 2, size / 4 + 10, 130, size / 4 - 10)
    context.closePath()
    context.strokeStyle = "#2f9aff"
    context.fillStyle = "#2f9aff"
    context.fill()
    context.stroke()

    // sector
    context.beginPath()
    context.moveTo(size / 2, size / 2)
    context.arc(size / 2, size / 2, 130, Math.PI, - Math.PI / 2, false)
    context.closePath()
    context.strokeStyle = "#2f9aff"
    context.fillStyle = "#2f9aff"
    context.fill()
    context.stroke()

    // triangle
    context.beginPath()

    context.moveTo(size / 2, size / 2)
    context.lineTo(85, size / 2)
    context.lineTo(size / 2, size - 20)
    context.lineTo(size / 2, size / 2)

    context.closePath()
    context.strokeStyle = "#2f9aff"
    context.fillStyle = "#2f9aff"
    context.fill()
    context.stroke()

    // axes
    context.beginPath()
    context.font = "10px Verdana"
    context.strokeStyle = "black"
    context.fillStyle = "black"

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

    // Radius-helpers for marks on axes
    var full_tag = "R"
    var half_tag = "R/2"
    var half_shift = true
    if (r !== "") {
      full_tag = r
      half_tag = r / 2
      half_shift = half_tag % 1
    }

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
    context.strokeStyle = "black"
    context.fillStyle = "black"
    context.stroke()
  }

  componentDidMount() {
    this.drawPicture("")
  }
}

export default function MainPage() {
  const desktop = useMediaQuery('(min-width:1043px)')
  const tablet = useMediaQuery('(min-width:750px)')
  return <DesktopMainPage />
}
