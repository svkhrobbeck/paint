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
