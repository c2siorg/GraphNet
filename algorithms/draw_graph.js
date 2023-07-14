import { ctx } from "../canvas/canvas.js";

export function drawAnimatedGraph(ctx, nodes, centralNode, frameRate) {
  let count = 0;
  function animate() {
    ctx.clearRect(0, 0, 500, 500);

    // draw edge
    for (const node of nodes) {
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      ctx.moveTo(centralNode.x, centralNode.y);
      ctx.quadraticCurveTo(
        (250 + node.currentX) / 2,
        250,
        node.currentX,
        node.currentY
      );
      ctx.stroke();
    }

    //draw 2nd node
    for (const node of nodes) {
      ctx.beginPath();
      ctx.fillStyle = node.color;
      ctx.arc(node.currentX, node.currentY, node.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Arial";
      ctx.fillText(node.name, node.currentX - 6, node.currentY + 6);
    }

    for (const node of nodes) {
      node.currentX += node.dx;
      node.currentY += node.dy;
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
  nodeColor = "#ffffff",
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
