export function addRadiusAndColor(nodes, edges) {
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
