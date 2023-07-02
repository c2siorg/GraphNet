import { ctx } from "../canvas/canvas.js";
import { nodes, centralNode } from "../data_stream/data.js";

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

    //draw 1st node
    ctx.beginPath();
    ctx.fillStyle = centralNode.color;
    ctx.arc(centralNode.x, centralNode.y, centralNode.radius, 0, 2 * Math.PI);
    ctx.fill();

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

export function drawGraph() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  // draw edge
  for (const node of nodes) {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.moveTo(centralNode.x, centralNode.y);
    ctx.quadraticCurveTo(
      (centralNode.x + node.x) / 2,
      centralNode.y,
      node.x,
      node.y
    );
    ctx.stroke();
  }

  //draw 1st node
  ctx.beginPath();
  ctx.fillStyle = centralNode.color;
  ctx.arc(centralNode.x, centralNode.y, centralNode.radius, 0, 2 * Math.PI);
  ctx.fill();

  //draw 2nd node
  for (const node of nodes) {
    ctx.beginPath();
    ctx.fillStyle = node.color;
    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(node.name, node.x - 6, node.y + 6);
  }
}
