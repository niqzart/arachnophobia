function teleportClock() {
  clock = document.getElementById("clock-box")
  clock.style.top = Math.random() * 70 + 15 + "%"
  clock.style.left = Math.random() * 70 + 15 + "%"
}

function hitClock() {
  counter = document.getElementById("hit-counter")
  if (isNaN(parseInt(counter.innerHTML))) counter.innerHTML = 1
  else counter.innerHTML = parseInt(counter.innerHTML) + 1
  teleportClock()
}

function clockCycle() {
  current = new Date()
  clock = document.getElementById("clock")
  clock.innerHTML = current.toLocaleTimeString() + "<br/>" + current.toLocaleDateString()
  setTimeout(clockCycle, 13000)
}

window.onload = clockCycle