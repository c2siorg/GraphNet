## Algorithms 🧮

### 1. Forced-directed algorithm

[Force-directed graph drawing algorithms](https://en.wikipedia.org/wiki/Force-directed_graph_drawing) are a class of algorithms for drawing graphs in an aesthetically-pleasing way. Their purpose is to position the nodes of a graph in two-dimensional or three-dimensional space so that all the edges are of more or less equal length and there are as few crossing edges as possible, by assigning forces among the set of edges and the set of nodes, based on their relative positions, and then using these forces either to simulate the motion of the edges and nodes or to minimize their energy.

![](https://github.com/Pushpendra766/GraphNet/blob/readme/assets/force-directed.gif)

#### a. Calculate Repulsive Forces
The calculateRepulsiveForce function calculates repulsive forces between nodes to prevent them from overlapping. It uses Coulomb's law, which models the repulsion between charged particles. In this context, nodes are treated as charged particles.

The formula for the repulsive force between two nodes i and j is as follows:

`F_repulsive = k^2 / dist * ejectFactor`

***F_repulsive*** : The repulsive force between nodes i and j.
***k*** : A constant representing the optimal distance between nodes.
***dist*** : The Euclidean distance between nodes i and j.
***ejectFactor*** : A factor that increases when nodes get too close to prevent extreme overlap.

##### Explanation:
As nodes get closer (small dist), the repulsive force increases to push them apart.
The ***ejectFactor*** amplifies the repulsion when nodes get very close (dist < 30) to prevent excessive overlapping.
#### b. Calculate Attractive Forces
The calculateAttractionForce function calculates attractive forces between connected nodes to bring them closer together. It uses Hooke's law, which models the force exerted by a spring. In this context, edges are treated as springs, and nodes connected by an edge are attracted to each other.

The formula for the attractive force between two connected nodes, where startNode and endNode are connected by an edge, is as follows:

`F_attractive = dist * condenseFactor / k`

***F_attractive*** : The attractive force between the connected nodes.
***dist*** : The Euclidean distance between the connected nodes.
***condenseFactor*** : A factor that controls the strength of attraction.
***k*** : A constant representing the optimal distance between nodes.

Explanation:

Attractive forces act along the edge between connected nodes.
As the distance between connected nodes (dist) decreases, the attractive force increases, pulling them closer together.
The ***condenseFactor*** amplifies the attraction, affecting how tightly connected nodes are drawn together.
#### c. Update Node Coordinates
The updateCoordinates function updates the node coordinates based on the calculated forces. It ensures that nodes stay within the boundaries of the canvas while adjusting their positions based on the forces.

Explanation:

It calculates the new positions of nodes (node.x and node.y) based on the forces (dx and dy) calculated in the previous steps.
The ***maxt*** and ***maxty*** coefficients limit the movement of nodes to prevent them from moving too far from their original positions and ensure they stay within the canvas boundaries.
These formulas collectively create a force-directed layout algorithm that arranges nodes and edges in a graph visualization based on attractive and repulsive forces, resulting in visually appealing and non-overlapping layouts. Users can adjust parameters like ***ejectFactor*** and ***condenseFactor*** to control the layout's characteristics according to their specific needs.

### 2. Circular algorithm

A circular node positioning algorithm is a method used to arrange nodes in a network graph (also known as a node-link diagram) in a circular layout. In a circular layout, nodes are positioned along the circumference of a circle, and the edges are drawn as arcs between the nodes. This layout can be particularly useful for visualizing relationships in a cyclic or circular manner, or when there is a natural circular hierarchy present in the data.

![](https://github.com/Pushpendra766/GraphNet/blob/readme/assets/circle-directed.gif)

#### a. Calculate center and radius of circle

First we calculate the radius of the circle such that when we render the nodes in the form of circle they don't overlap with each other. 

Using this formula :- `radius = ((total_nodes - 4) / 4 + 1) * 20`

Then we calculate the position of center of the circle by averaging out the ***x*** and ***y*** coordinates of all the nodes.

`X(center)= Sum of x coordinates of all nodes/Number of nodes`

`Y(center)= Sum of y coordinates of all nodes/Number of nodes`

#### b. Position the nodes on circumference

After getting the radius and position of center we can calculate the position of each node on circumference of the circle.

`θ(node) = (node number/total nodes) * 2π`

*node number* - It is a unique number for each node from 1 to n(total nodes).

`X(node) = X(center) + radius * cos(θ)`

`Y(node) = Y(center) + radius * sin(θ)`
