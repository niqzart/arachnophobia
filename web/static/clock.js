function clockCycle() {
  current = new Date()
  clock = document.getElementById("clock")
  clock.innerHTML = current.toLocaleTimeString() + "<br/>" + current.toLocaleDateString()
  setTimeout(clockCycle, 13000);
}

window.onload = clockCycle