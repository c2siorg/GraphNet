import { drawGraph, drawAnimatedGraph } from "./algorithms/draw_graph.js";
import { addInNodes } from "./algorithms/forced_positioning.js";
import { circleDirectedPositioning } from "./algorithms/circle_positioning.js";
import { canvas, ctx } from "./canvas/canvas.js";

let nodes = [];
let edges = [];
function generateNodes(length, start_id) {
  for (let i = start_id; i < start_id+length; i++) {
    let object = {
      id: i,
      x: Math.random() * 980 + 20, // Random x value between 10 and 500
      y: Math.random() * 580 + 20, // Random y value between 10 and 500
    };
    nodes.push(object);
  }
}

function generateEdges(start_id, end_id) {
  const length = nodes.length;
  for (let i = start_id; i <= end_id; i++) {
    const node = Math.random() * 5 + 1;
    for (let j = 0; j < node; j++) {
      let edge = {
        from: i,
        to: parseInt(Math.random() * (length - 1)),
      };
      edges.push(edge);
    }
  }
}

// generateNodes(50, 0);
// generateEdges(0, 49);

const repositioBtn = document.getElementById("reposition-btn");
repositioBtn.addEventListener("click", () => {
  circleDirectedPositioning(nodes);
  drawAnimatedGraph(nodes, edges, 60);
});

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
  let idx = nodes.length;
  generateNodes(5, idx);
  generateEdges(idx, idx+4);
  addInNodes(nodes, edges);
  drawGraph(nodes, edges);
  circleDirectedPositioning(nodes);
  drawAnimatedGraph(nodes, edges, 60);
});

// addInNodes(nodes, edges);
// drawGraph(nodes, edges);

let isDragging = false;
let dragStartX, dragStartY;

canvas.addEventListener("mousedown", function (event) {
  isDragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  console.log(isDragging);
});

canvas.addEventListener("mousemove", function (event) {
  if (isDragging) {
    let offsetX = event.clientX - dragStartX;
    let offsetY = event.clientY - dragStartY;
    ctx.translate(offsetX, offsetY);
    drawGraph(nodes, edges);
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  }
});

canvas.addEventListener("mouseup", function(event){
  isDragging = false;
})

