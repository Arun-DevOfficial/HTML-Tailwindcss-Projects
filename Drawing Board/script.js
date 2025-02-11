const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const clearCanvasButton = document.getElementById("clearCanvas");
const saveCanvasButton = document.getElementById("saveCanvas");

let drawing = false;
let currentColor = "#000000";

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
colorPicker.addEventListener("input", changeColor);
clearCanvasButton.addEventListener("click", clearCanvas);
saveCanvasButton.addEventListener("click", saveCanvas);

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function changeColor(e) {
  currentColor = e.target.value;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL();
  link.click();
}
