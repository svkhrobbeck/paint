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

const drawing = e => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  switch (selectedTool) {
    case "brush":
      freeDraw(e);
      return;

    case "rectangle":
      drawRectangle(e);
      return;

    case "circle":
      drawCircle(e);
      return;

    case "triangle":
      drawTriangle(e);
      return;

    case "line":
      drawLine(e);
      return;

    case "eraser":
      const isEraser = selectedTool === "eraser" ? "#fff" : selectedColor;
      ctx.strokeStyle = isEraser;
      freeDraw(e);
      return;

    default:
      return;
  }
};

const startDraw = e => {
  isDrawing = true;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  snapshot = ctx.getImageData(0, 0, elCanvas.width, elCanvas.height);
};

const stopDraw = () => (isDrawing = false);

// Event Listeners
elsTools.forEach(tool =>
  tool.addEventListener("click", () => {
    document.querySelector(".tools-board__option--active").classList.remove("tools-board__option--active");
    tool.classList.add("tools-board__option--active");
    selectedTool = tool.id;
  })
);

elsColor.forEach(color =>
  color.addEventListener("click", () => {
    document.querySelector(".tools-board__option--selected").classList.remove("tools-board__option--selected");
    color.classList.add("tools-board__option--selected");
    const bgColor = window.getComputedStyle(color).getPropertyValue("background-color");
    selectedColor = bgColor;
  })
);

elCanvas.addEventListener("mousedown", startDraw);
elCanvas.addEventListener("mouseup", stopDraw);
elCanvas.addEventListener("mousemove", drawing);
elSizeSlider.addEventListener("change", () => (brushWidth = elSizeSlider.value));
elClearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
});

elSaveBtn.addEventListener("click", () => {
  const elLink = document.createElement("a");
  elLink.download = `Sukhrobbeck Paint-${Date.now()}`;
  elLink.href = elCanvas.toDataURL();

  elLink.click();
});

elColorPicker.addEventListener("change", () => {
  selectedColor = elColorPicker.value;
  elColorPicker.parentElement.style.backgroundColor = selectedColor;
  elColorPicker.parentElement.click();
});

window.addEventListener("load", () => {
  elCanvas.width = elCanvas.offsetWidth;
  elCanvas.height = elCanvas.offsetHeight;
  setCanvasBg();
});
