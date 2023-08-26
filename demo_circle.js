import { drawGraph, drawAnimatedGraph } from "./algorithms/draw_graph.js";
import { addRadiusAndColor } from "./control/additional.js";
import {
  circleDirectedPositioning,
  circleDirectedRepositioning,
} from "./algorithms/circle_positioning.js";
import { canvas, ctx } from "./canvas/canvas.js";

let nodes = [];
let edges = [];

function generateNodes(length, start_id) {
  for (let i = start_id; i < start_id + length; i++) {
    let object = {
      id: i,
      x: Math.random() * 980 + 20, // Random value between 20 and 980
      y: Math.random() * 580 + 20, // Random value between 20 and 980
      isFixed: false,
    };
    nodes.push(object);
  }
}

// start_id - starting id of nodes to be generated
// end_id - id of last node
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

// addRadiusAndColor(nodes, edges);
// drawGraph(nodes, edges);

function renderGraph() {
  circleDirectedPositioning(nodes);
  drawAnimatedGraph(nodes, edges, 60);
}

const repositioBtn = document.getElementById("reposition-btn");
repositioBtn.addEventListener("click", () => {
  renderGraph();
});

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
  let idx = nodes.length;
  generateNodes(5, idx);
  generateEdges(idx, idx + 4);
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
  
  startX = parseInt(e.offsetX);
  startY = parseInt(e.offsetY);

  for (const node of nodes) {
    if (is_mouse_in_shape(startX, startY, node)) {
      is_dragging = true;
      current_node = node;
      node.isFixed = true;
    }
  }
};

let mouseUp = function (e) {
  if (!is_dragging) {
    return;
  }
  e.preventDefault();
  is_dragging = false;
  circleDirectedRepositioning(nodes);
  drawAnimatedGraph(nodes, edges, 60);
  current_node.isFixed = false;
};

let mouseOut = function (e) {
  if (!is_dragging) {
    return;
  }
  e.preventDefault();
  is_dragging = false;
  circleDirectedRepositioning(nodes);
  drawAnimatedGraph(nodes, edges, 60);
  current_node.isFixed = false;
};

let mouseMove = function (e) {
  if (!is_dragging) {
    return;
  } else if (is_dragging) {
    e.preventDefault();
    current_node.oldX = e.offsetX;
    current_node.oldY = e.offsetY;
    current_node.x = e.offsetX;
    current_node.y = e.offsetY;
    drawGraph(nodes, edges);
  }
};

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;
