import { Component } from "react"
import { Link } from "react-router-dom"

export default class MainPage extends Component {
  render() {
    return <div>
      <h1>Main</h1>
      <Link target="/main/" />
    </div>
  }
}
