import { drawGraph, drawAnimatedGraph } from "./algorithms/draw_graph.js";
// import { nodes, edges } from "./data_stream/data.js";
import { forceDirected, addInNodes } from "./algorithms/forced_positioning.js";
import "./control/drag.js"

let nodes = [];
let edges = [];
function generateNodes(length) {
  for (let i = 0; i < length; i++) {
    let object = {
      id: i,
      x: Math.random() * 980 + 20, // Random x value between 10 and 500
      y: Math.random() * 580 + 20, // Random y value between 10 and 500
    };

    nodes.push(object);
  }
}

function generateEdges(length) {
  for (let i = 0; i < length; i++) {
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

generateNodes(100);
generateEdges(100);

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  for(const node of nodes){
    node.oldX = node.x;
    node.oldY = node.y;
  }
  for (let i = 0; i < 300; i++) {
    forceDirected(nodes, edges, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  drawAnimatedGraph(nodes, edges, 60);
});

addInNodes(nodes,edges);
drawGraph(nodes, edges);
