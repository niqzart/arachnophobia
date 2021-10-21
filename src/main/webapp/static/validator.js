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
