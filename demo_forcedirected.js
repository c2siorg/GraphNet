import { drawGraph, drawAnimatedGraph } from "./algorithms/draw_graph.js";
import { forceDirected} from "./algorithms/forced_positioning.js";
import { addRadiusAndColor } from "./control/additional.js";

let nodes = [];
let edges = [];
function generateNodes(length, start_id) {
  for (let i = start_id; i < start_id+length; i++) {
    let object = {
      id: i,
      x: Math.random() * 980 + 20, // Random x value between 10 and 500
      y: Math.random() * 580 + 20, // Random y value between 10 and 500
      isFixed: false
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

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

function renderGraph(){
  for (const node of nodes) {
    node.oldX = node.x;
    node.oldY = node.y;
  }
  for (let i = 0; i < 300; i++) {
    forceDirected(nodes, edges, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  drawAnimatedGraph(nodes, edges, 60);
}

const repositionBtn = document.getElementById("reposition-btn");
repositionBtn.addEventListener("click", () => {
  renderGraph();
});

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
  let idx = nodes.length;
  generateNodes(5, idx);
  generateEdges(idx, idx+4);
  addRadiusAndColor(nodes, edges);
  renderGraph();
});

let is_dragging = false;
let startX;
let startY;
let current_node;

let is_mouse_in_shape = function (startX, startY, node) {
  const shape_left = node.x - node.radius;
  const shape_right = node.x + node.radius;
  const shape_top = node.y - node.radius;
  const shape_bottom = node.y + node.radius;
  if (
    shape_left < startX &&
    startX < shape_right &&
    shape_top < startY &&
    startY < shape_bottom
  ) {
    return true;
  }
  return false;
};

let mouseDown = function (e) {
  e.preventDefault();
  drawGraph(nodes, edges);

  startX = parseInt(e.offsetX);
  startY = parseInt(e.offsetY);

  for (const node of nodes) {
    if (is_mouse_in_shape(startX, startY, node)) {
      is_dragging = true;
      current_node = node;
      current_node.isFixed = true;
    }
  }
};

let mouseUp = function (e) {
  if (!is_dragging) {
    return;
  }
  e.preventDefault();
  is_dragging = false;
  renderGraph();
  current_node.isFixed = false;
};

let mouseOut = function (e) {
  if (!is_dragging) {
    return;
  }
  e.preventDefault();
  is_dragging = false;
  renderGraph();
  current_node.isFixed = false;
};

let mouseMove = function (e) {
  if (!is_dragging) {
    return;
  } else if (is_dragging) {
    e.preventDefault();
    current_node.x = e.offsetX;
    current_node.y = e.offsetY;
    drawGraph(nodes, edges);
  }
};

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;