// Elements
const elCanvas = document.querySelector("canvas"),
  elsColor = document.querySelectorAll(".tools-board__row--colors .tools-board__option"),
  elsTools = document.querySelectorAll(".tool"),
  elFillColor = document.querySelector("#fill-color"),
  elSizeSlider = document.querySelector("#size-slider"),
  elColorPicker = document.querySelector("#color-picker"),
  elClearBtn = document.querySelector("[data-clear]"),
  elSaveBtn = document.querySelector("[data-save]");

// variables
let ctx = elCanvas.getContext("2d"),
  isDrawing = false,
  brushWidth = 5,
  selectedTool = "brush",
  selectedColor = "#000",
  prevMouseX,
  prevMouseY,
  snapshot;

// functions
const setCanvasBg = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, elCanvas.width, elCanvas.height);
  ctx.fillStyle = selectedColor;
};

const drawRectangle = e => {
  if (elFillColor.checked) {
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  } else {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }
};

const drawCircle = e => {
  ctx.beginPath();
  const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2);
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);

  elFillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawLine = e => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const freeDraw = e => {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const drawTriangle = e => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();

  elFillColor.checked ? ctx.fill() : ctx.stroke();
};
