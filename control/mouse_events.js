import { drawGraph } from "../algorithms/draw_graph.js";
import { nodes, centralNode } from "../data_stream/data.js";

let is_dragging = false;
let is_dragging_graph = false;
let startX;
let startY;
let current_node;

export const is_mouse_in_shape = function (startX, startY, node) {
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

export const is_mouse_on_graph = function (centralNode) {
  const graph_left = centralNode.x - 100;
  const graph_right = centralNode.x + 100;
  const graph_top = centralNode.y - 100;
  const graph_bottom = centralNode.y + 100;

  if (
    graph_left < startX &&
    startX < graph_right &&
    graph_top < startY &&
    startY < graph_bottom
  ) {
    return true;
  }
  return false;
};

export const mouseDown = function (e) {
  e.preventDefault();
  drawGraph();

  startX = parseInt(e.clientX);
  startY = parseInt(e.clientY);

  for (const node of nodes) {
    if (is_mouse_in_shape(startX, startY, node)) {
      is_dragging = true;
      current_node = node;
    } else if (is_mouse_on_graph(centralNode)) {
      is_dragging_graph = true;
      console.log("dragging graph");
    }
  }
};

export const mouseUp = function (e) {
  if (!is_dragging && !is_dragging_graph) {
    return;
  }
  e.preventDefault();
  is_dragging = false;
  is_dragging_graph = false;
};

export const mouseOut = function (e) {
  if (!is_dragging && !is_dragging_graph) {
    return;
  }
  e.preventDefault();
  is_dragging = false;
  is_dragging_graph = false;
};

export const mouseMove = function (e) {
  if (!is_dragging && !is_dragging_graph) {
    return;
  } else if (is_dragging) {
    e.preventDefault();
    current_node.x = e.clientX;
    current_node.y = e.clientY;
    drawGraph();
  } else if (is_dragging_graph) {
    e.preventDefault();
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let dx = mouseX - startX;
    let dy = mouseY - startY;

    for (let node of nodes) {
      node.x += dx;
      node.y += dy;
    }

    centralNode.x += dx;
    centralNode.y += dy;
    drawGraph();
    startX = mouseX;
    startY = mouseY;
    console.log(dx, dy);
  }
};
