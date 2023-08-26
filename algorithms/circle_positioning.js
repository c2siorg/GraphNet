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
  let node_count = 1;
  for (const node of nodes) {
    node.theta = (node_count / total_nodes) * 2 * Math.PI;
    node_count++;
  }
  for (const node of nodes) {
    node.oldX = node.x;
    node.oldY = node.y;
    node.x = centerX + radius * Math.cos(node.theta);
    node.y = centerY - radius * Math.sin(node.theta);
  }
}

function calculateNewCenterAndRadius(nodes) {
  const total_nodes = nodes.length;
  let sumX = 0;
  let sumY = 0;
  let fixedX, fixedY;
  for (const node of nodes) {
    if (!node.isFixed) {
      sumX += node.x;
      sumY += node.y;
    } else {
      fixedX = node.x;
      fixedY = node.y;
    }
  }
  const radius = ((total_nodes- 4) / 4 + 1) * 20;
  const oldCenterX = sumX / (total_nodes-1);
  const oldCenterY = sumY / (total_nodes - 1);
  let angle = Math.atan((oldCenterY - fixedY) / (fixedX - oldCenterX)); // y increases in opposite direction in case of canvas
  if(fixedX<oldCenterX){
    angle = angle + Math.PI;
  }
  const centerX = fixedX - radius * Math.cos(angle);
  const centerY = fixedY + radius * Math.sin(angle);
  return { centerX, centerY, radius, angle };
}

export function circleDirectedRepositioning(nodes) {
  const total_nodes = nodes.length;
  const { centerX, centerY, radius, angle } = calculateNewCenterAndRadius(nodes);
  let node_count=0;
  const phi = 2 * Math.PI/ total_nodes;
  for (const node of nodes) {
    if(!node.isFixed){
      node.theta = node_count*phi + angle+phi;
      node_count++;
    }
  }
  for (const node of nodes) {
    if(!node.isFixed){
      node.oldX = node.x;
      node.oldY = node.y;
      node.x = centerX + radius * Math.cos(node.theta);
      node.y = centerY - radius * Math.sin(node.theta);
    }
  }
}
