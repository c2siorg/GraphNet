import { drawGraph } from "../algorithms/draw_graph.js";
import { canvas, ctx } from "../canvas/canvas.js";
import { nodes, edges } from "../data_stream/data.js";

let isDragging = false;
let dragStartX, dragStartY;

canvas.addEventListener("mousedown", function (event) {
  isDragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
});

canvas.addEventListener("mousemove", function (event) {
  if (isDragging) {
    let offsetX = event.clientX - dragStartX;
    let offsetY = event.clientY - dragStartY;
    ctx.translate(offsetX, offsetY);
    redrawCanvas();
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  }
});

canvas.addEventListener("mouseup", function () {
  isDragging = false;
});
canvas.addEventListener("mouseout", function () {
  isDragging = false;
});

function redrawCanvas() {
  ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
  ctx.scale(zoomLevel, zoomLevel);
  drawGraph(nodes, edges);
  ctx.scale(1 / zoomLevel, 1 / zoomLevel);
}

let zoomLevel = 1;
const zoomFactor = 0.1;

canvas.addEventListener("wheel", handleScroll);

function handleScroll(event) {
  event.preventDefault();
  const delta = Math.sign(event.deltaY);

  if (delta === 1) {
    zoomLevel -= zoomFactor;
  } else if (delta === -1 && zoomLevel > zoomFactor) {
    zoomLevel += zoomFactor;
  }

  redrawCanvas();
}
