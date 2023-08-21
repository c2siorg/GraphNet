function calculateRepulsiveForce(nodes, k) {
  let ejectFactor = 6;
  let distX, distY, dist;
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].dx = 0;
    nodes[i].dy = 0;
    for (let j = 0; j < nodes.length; j++) {
      if (i !== j) {
        distX = nodes[i].x - nodes[j].x;
        distY = nodes[i].y - nodes[j].y;
        dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 30) {
          ejectFactor = 5;
        }
        if (dist > 0 && dist < 250) {
          nodes[i].dx += (((distX / dist) * k * k) / dist) * ejectFactor;
          nodes[i].dy += (((distY / dist) * k * k) / dist) * ejectFactor;
        }
      }
    }
  }
}

/* Attraction force between two connected nodes */
function calculateAttractionForce(nodes, edges, k) {
  let condenseFactor = 3;
  let startNode, endNode;
  for (let e = 0; e < edges.length; e++) {
    let eStartID = edges[e].from;
    let eEndID = edges[e].to;
    startNode = nodes[eStartID];
    endNode = nodes[eEndID];

    if (!startNode) {
      console.log("Cannot find node with ID : " + startNode);
      return;
    }
    if (!endNode) {
      console.log("Cannot find node with ID : " + endNode);
      return;
    }
    let distX, distY, dist;
    distX = startNode.x - endNode.x;
    distY = startNode.y - endNode.y;
    dist = Math.sqrt(distX * distX + distY * distY);

    startNode.dx -= ((distX * dist) / k) * condenseFactor;
    startNode.dy -= ((distY * dist) / k) * condenseFactor;
    endNode.dx += ((distX * dist) / k) * condenseFactor;
    endNode.dy += ((distY * dist) / k) * condenseFactor;
  }
}

/* update the coordinates */
function updateCoordinates(nodes, canvas_width, canvas_height) {
  let maxt = 4,
    maxty = 3; //Additional coefficients.
  for (let v = 0; v < nodes.length; v++) {
    let node = nodes[v];
    let dx = Math.floor(node.dx);
    let dy = Math.floor(node.dy);

    if (dx < -maxt) dx = -maxt;
    if (dx > maxt) dx = maxt;
    if (dy < -maxty) dy = -maxty;
    if (dy > maxty) dy = maxty;
    node.x =
      node.x + dx >= canvas_width || node.x + dx <= 0
        ? node.x - dx
        : node.x + dx;
    node.y =
      node.y + dy >= canvas_height || node.y + dy <= 0
        ? node.y - dy
        : node.y + dy;
  }
}

export function forceDirected(nodes, edges, canvas_width, canvas_height) {
  let k;
  if (nodes) {
    k = Math.sqrt((canvas_width * canvas_height) / nodes.length);
  } else {
    console.error("nodes object is empty, check it!");
  }
  calculateRepulsiveForce(nodes, k);
  calculateAttractionForce(nodes, edges, k);
  updateCoordinates(nodes, canvas_width, canvas_height);
}


