import { createStore, combineReducers } from "redux"

function pointsReducer(state = { points: [] }, action) {
  switch (action.type) {
    case "LoadPoints": {
      return { points: action.payload }
    }
    case "AddPoint": {
      let points = state.points.slice()
      points.push(action.payload)
      return { points }
    }
    default:
      return state
  }
}

function dialogReducer(state = { serverError: false }, action) {
  switch (action.type) {
    case "raiseError": {
      console.log(32);
      return { serverError: true } 
    }
    case "catchError":
      return { serverError: false }
    default:
      return state
  }
}

export const loadPoints = (points) => { return { type: "LoadPoints", payload: points } }
export const addPoint = (point) => { return { type: "AddPoint", payload: point } }

export const raiseError = () => { console.log(31); return { type: "raiseError" } }
export const catchError = () => { console.log(41); return { type: "catchError" } }

export default createStore(combineReducers({ pointsReducer, dialogReducer }))
