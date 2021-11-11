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

function pickX(x) {
  console.log(x, "j_idt15:X" + (x + 4))
  for(let i = 0; i < 9; i++) {
    console.log("j_idt15:X" + i)
    const node = document.getElementById("j_idt15:X" + i)
    node.className = "input x-button"
  }
  document.getElementById("j_idt15:X" + (x + 4)).className = "selected x-button"
}
