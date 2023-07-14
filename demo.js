import { drawGraph } from "./algorithms/draw_graph.js";
import { nodes, edges } from "./data_stream/data.js";
import { forceDirected } from "./algorithms/forced_positioning.js";
import "./control/drag.js"

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

function addInNodes() {
  const colors = ["#F1C40F", "#F39C12 ", "#E67E22 ", "#E74C3C "];
  for (const node of nodes) {
    node.connections = 0;
  }
  for (const edge of edges) {
    nodes[edge.from].connections++;
    nodes[edge.to].connections++;
  }
  const maxConnections = nodes.reduce((max, node) => {
    if (node.connections > max) {
      return node.connections;
    } else {
      return max;
    }
  }, 0);
  const minConnections = nodes.reduce((min, node) => {
    if (node.connections < min) {
      return node.connections;
    } else {
      return min;
    }
  }, Infinity);
  const c = (maxConnections - minConnections) / 3;

  for (const node of nodes) {
    const color_id = parseInt((node.connections - minConnections) / c);
    node.color = colors[color_id];
    node.radius = (7 * node.connections) / maxConnections + 3;
  }
}

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    forceDirected(nodes, edges, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  drawGraph(nodes, edges);
});

addInNodes();
drawGraph(nodes, edges);
