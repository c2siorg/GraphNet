import { drawGraph, drawAnimatedGraph } from "./algorithms/draw_graph.js";
// import { nodes, edges } from "./data_stream/data.js";
import { addInNodes } from "./algorithms/forced_positioning.js";
import { circleDirectedPositioning } from "./algorithms/circle_positioning.js";

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

generateNodes(50);
generateEdges(50);

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  circleDirectedPositioning(nodes);
  drawAnimatedGraph(nodes, edges, 60);
});

addInNodes(nodes, edges);
drawGraph(nodes, edges);
