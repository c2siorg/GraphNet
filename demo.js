import { nodes, centralNode } from "./data_stream/data.js";
import { canvas, ctx } from "./canvas/canvas.js";
import { mouseUp, mouseDown, mouseOut, mouseMove } from "./control/mouse_events.js";
import { drawAnimatedGraph } from "./algorithms/draw_graph.js";

const frameRate = 20;

for (const node of nodes) {
  node.dx = (node.x - node.currentX) / frameRate;
  node.dy = (node.y - node.currentY) / frameRate;
}



drawAnimatedGraph(ctx, nodes, centralNode, frameRate);

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;
