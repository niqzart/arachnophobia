function showErrorMessage(input, message) {
  document.getElementById(input + "-p").style.color = "red"

  if (message !== undefined && message !== null) {
    const node = document.getElementById("message")
    node.innerText = node.innerText + "\n" + message
    node.style.visibility = "visible"
  }
}

function hideErrorMessages() {
  for (let node of document.getElementsByClassName("var-p")) node.style.color = "white"
  document.getElementById("y-input").style.backgroundColor = ""

  const node = document.getElementById("message")
  node.innerText = ""
  node.style.visibility = "hidden"
}

function clearY(node) {
  node.style.backgroundColor = "red"
  node.value = ""
}

function onInputY() {
  hideErrorMessages()

  const node = document.getElementById("y-input")
  const value = node.value.replace(",", ".")

  if (isNaN(Number(value)) && value !== "-" && value !== "+" && value !== "." && value !== "," || value.includes(" ")) {
    showErrorMessage("y", "Y can only be a number")
    clearY(node)
  } else if (value < -3) {
    showErrorMessage("y", "Y can't be lower than -3")
    clearY(node)
  } else if (value > 3) {
    showErrorMessage("y", "Y can't be higher than 3")
    clearY(node)
  }
}

function onInputR(newR) {
  hideErrorMessages()
  if (document.getElementById("r-input").value == newR) return false

  for (let r = 1; r < 6; r++) document.getElementById("R" + r).style.filter = ""
  document.getElementById("R" + newR).style.filter = "invert(100%)"

  document.getElementById("r-input").value = newR
  return true
}

function isYValueBad() {
  const value = document.getElementById("y-input").value
  return value === "" || value === "-" || value === "+" || value === "." || value === ","
}

function onSubmit() {
  hideErrorMessages()

  const errors = {
    x: true, 
    y: isYValueBad(),
    r: document.getElementById("r-input").value === "",
  }

  for (let id of ["X-2.0", "X-1.5", "X-1.0", "X-0.5", "X0.0", "X0.5", "X1.0", "X1.5", "X2.0"]) {
    if (document.getElementById(id).checked) {
      errors.x = false
      break
    }
  }

  var error = false
  for (let variable of ["x", "y", "r"]) {
    if (errors[variable]) {
      showErrorMessage(variable, variable.toUpperCase() + " should be set")
      error = true
    }
  }

  if (error) event.preventDefault();
}
