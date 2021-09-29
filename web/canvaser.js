function fillCanvas() {
  const canvas = document.getElementById("point-area")
  const size = 300
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext("2d")

  context.clearRect(0, 0, size, size);

  console.log(size)

  // rectangle
  context.beginPath()
  context.rect(size / 2, 20, 65, size / 2 - 20)
  context.closePath()
  context.strokeStyle = "#2f9aff"
  context.fillStyle = "#2f9aff"
  context.fill()
  context.stroke()

  // sector
  context.beginPath()
  context.moveTo(size / 2, size / 2)
  context.arc(size / 2, size / 2, 65, Math.PI / 2, Math.PI, false)
  context.closePath()
  context.strokeStyle = "#2f9aff"
  context.fillStyle = "#2f9aff"
  context.fill()
  context.stroke()

  // triangle
  context.beginPath()

  context.moveTo(size / 2, size / 2)
  context.lineTo(215, size / 2)
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
  const r = document.getElementById("r-input").value

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

window.onload = fillCanvas
