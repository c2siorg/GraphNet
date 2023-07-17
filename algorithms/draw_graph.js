import { ctx } from "../canvas/canvas.js";

export function drawAnimatedGraph(
  nodes,
  edges,
  frameRate,
  edgesColor = "#5D6D7E",
  nodeColor = "#ffff00",
  nodeStrokeColor = "#000000"
) {
  let count = 0;
  for (const node of nodes) {
    node.dx = (node.x - node.oldX)/frameRate;
    node.dy = (node.y - node.oldY)/frameRate;

  }
  function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (const edge of edges) {
      const from = nodes[edge.from];
      const to = nodes[edge.to];
      ctx.beginPath();
      ctx.strokeStyle = edgesColor;
      ctx.moveTo(from.oldX, from.oldY);
      ctx.lineTo(to.oldX, to.oldY);
      ctx.stroke();
    }

    for (const node of nodes) {
      ctx.beginPath();
      ctx.fillStyle = node.color || nodeColor;
      ctx.strokeStyle = node.strokeColor || nodeStrokeColor;
      ctx.arc(node.oldX, node.oldY, node.radius || 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (const node of nodes) {
      node.oldX += node.dx;
      node.oldY += node.dy;
    }

    count++;
    if (count <= frameRate) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

export function drawGraph(
  nodes,
  edges,
  edgesColor = "#5D6D7E",
  nodeColor = "#ffff00",
  nodeStrokeColor = "#000000"
) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const edge of edges) {
    ctx.beginPath();
    ctx.strokeStyle = edgesColor;
    ctx.moveTo(nodes[edge.from].x, nodes[edge.from].y);
    ctx.lineTo(nodes[edge.to].x, nodes[edge.to].y);
    ctx.stroke();
  }

  for (const node of nodes) {
    ctx.beginPath();
    ctx.fillStyle = node.color || nodeColor;
    ctx.strokeStyle = node.strokeColor || nodeStrokeColor;
    ctx.arc(node.x, node.y, node.radius || 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
