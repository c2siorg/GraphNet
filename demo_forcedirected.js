import { drawGraph, drawAnimatedGraph } from "./algorithms/draw_graph.js";
import { forceDirected, addInNodes } from "./algorithms/forced_positioning.js";

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

// generateNodes(100, 0);
// generateEdges(0, 99);

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

const repositioBtn = document.getElementById("reposition-btn");
repositioBtn.addEventListener("click", () => {
  for (const node of nodes) {
    node.oldX = node.x;
    node.oldY = node.y;
  }
  for (let i = 0; i < 300; i++) {
    forceDirected(nodes, edges, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  drawAnimatedGraph(nodes, edges, 60);
});

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
  let idx = nodes.length;
  generateNodes(5, idx);
  generateEdges(idx, idx+4);
  addInNodes(nodes, edges);
  drawGraph(nodes, edges);
  for (const node of nodes) {
    node.oldX = node.x;
    node.oldY = node.y;
  }
  for (let i = 0; i < 300; i++) {
    forceDirected(nodes, edges, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  drawAnimatedGraph(nodes, edges, 60);
});

addInNodes(nodes, edges);
drawGraph(nodes, edges);
