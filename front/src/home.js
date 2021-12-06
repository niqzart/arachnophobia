import { Component } from "react"
import { Link } from "react-router-dom"

export default class HomePage extends Component {
  render() {
    return <div>
      <h1 style={{ color: "cornflowerblue" }}>Home</h1>
      <Link target="/main/" />
    </div>
  }
}
