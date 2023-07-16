function calculateCenterAndRadius(nodes) {
  const total_nodes = nodes.length;
  let sumX = 0;
  let sumY = 0;
  for (const node of nodes) {
    sumX += node.x;
    sumY += node.y;
  }
  const centerX = sumX / total_nodes;
  const centerY = sumY / total_nodes;
  const radius = ((total_nodes - 4) / 4 + 1) * 20;
  return { x: centerX, y: centerY, radius };
}

export function circleDirectedPositioning(nodes) {
  const total_nodes = nodes.length;
  const { x: centerX, y: centerY, radius } = calculateCenterAndRadius(nodes);
  for (const node of nodes) {
    node.theta = ((node.id + 1) / total_nodes) * 2 * Math.PI;
  }
  for (const node of nodes) {
    node.oldX = node.x;
    node.oldY = node.y;
    node.x = centerX + radius * Math.cos(node.theta);
    node.y = centerY + radius * Math.sin(node.theta);
  }
}
