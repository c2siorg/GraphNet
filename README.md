## Table of Content 📑

1. [GraphNet](#codelabz)
2. [Algorithms](#algorithms)
3. [Modules](#modules)
4. [Community](#community)
5. [Contribute](#contribute)

## GraphNet

**Graphnet** is a Javascript graph library that is created as a module for the semantic UI framework. Whereas Graphnet dynamically renders all nodes and edges via websocket connections, node and edge positioning algorithms such as force, random, circular, and others are provided within the Graphnet as builtin modules.

## Algorithms

### 1. Forced-directed algorithm

[Force-directed graph drawing algorithms](https://en.wikipedia.org/wiki/Force-directed_graph_drawing) are a class of algorithms for drawing graphs in an aesthetically-pleasing way. Their purpose is to position the nodes of a graph in two-dimensional or three-dimensional space so that all the edges are of more or less equal length and there are as few crossing edges as possible, by assigning forces among the set of edges and the set of nodes, based on their relative positions, and then using these forces either to simulate the motion of the edges and nodes or to minimize their energy.

![](https://github.com/c2siorg/GraphNet/blob/main/assets/force-directed.gif)

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

##### Explanation:

Attractive forces act along the edge between connected nodes.
As the distance between connected nodes (dist) decreases, the attractive force increases, pulling them closer together.
The ***condenseFactor*** amplifies the attraction, affecting how tightly connected nodes are drawn together.
#### c. Update Node Coordinates
The updateCoordinates function updates the node coordinates based on the calculated forces. It ensures that nodes stay within the boundaries of the canvas while adjusting their positions based on the forces.

##### Explanation:

It calculates the new positions of nodes (node.x and node.y) based on the forces (dx and dy) calculated in the previous steps.
The ***maxt*** and ***maxty*** coefficients limit the movement of nodes to prevent them from moving too far from their original positions and ensure they stay within the canvas boundaries.
These formulas collectively create a force-directed layout algorithm that arranges nodes and edges in a graph visualization based on attractive and repulsive forces, resulting in visually appealing and non-overlapping layouts. Users can adjust parameters like ***ejectFactor*** and ***condenseFactor*** to control the layout's characteristics according to their specific needs.

###2. Circular algorithm

A circular node positioning algorithm is a method used to arrange nodes in a network graph (also known as a node-link diagram) in a circular layout. In a circular layout, nodes are positioned along the circumference of a circle, and the edges are drawn as arcs between the nodes. This layout can be particularly useful for visualizing relationships in a cyclic or circular manner, or when there is a natural circular hierarchy present in the data.

![](https://github.com/c2siorg/GraphNet/blob/main/assets/circle-directed.gif)

#### a. calculateCenterAndRadius(nodes)

Calculates the center and radius of the circle that best fits a set of nodes.

##### Parameters:
***nodes*** : An array of node objects representing graph nodes.

Explanation:
It computes the average ***x*** and ***y*** coordinates of all nodes to determine the center of the circle.
The radius is calculated based on the number of nodes, with a heuristic formula: 
`radius = ((total_nodes - 4) / 4 + 1) * 20`
Returns an object with the x and y coordinates of the center and the radius of the circle.

#### b. circleDirectedPositioning(nodes)

Positions nodes in a circular layout.
##### Parameters:
***nodes*** : An array of node objects representing graph nodes.

##### Explanation:
It first calculates the total number of nodes.
Then, it calls the ***calculateCenterAndRadius*** function to obtain the center and radius of the circle.
For each node, it calculates a ***theta*** value, representing its angle in radians around the circle.
Finally, it updates the ***x*** and ***y*** coordinates of each node based on the center and radius, arranging them evenly along the circumference of the circle.

## Modules

In GraphNet we have divided the code into multiple modules to organize code by grouping related functions, classes, or components together.

#### 1. Algorithms Module:

This module likely contains various algorithms and layout calculations for graph visualization. It may include functions for force-directed layouts, circular layouts, or other graph layout algorithms. The primary purpose is to provide algorithms that determine how nodes and edges should be positioned in the visualization.
#### 2. Canvas Module:

The Canvas module is responsible for rendering the graph visualization on an HTML5 Canvas element. It includes functions for drawing nodes, edges, labels, and other visual elements on the canvas. This module ensures that the graph is visually represented according to the computed layout from the Algorithms module.
#### 3. Control Module:

The Control module typically manages user interactions and controls for the graph visualization. It may include functions for handling user input, such as zooming, panning, selecting nodes, or triggering layout updates. This module enables user interactivity with the graph.
#### 4. Data Stream Module:

The Data Stream module likely handles the input and streaming of data for your graph visualization. It may include functions for fetching data from external sources, parsing data formats, and updating the graph with new data in real-time. This module ensures that your visualization remains up-to-date with changing data sources.
#### 5. Styles Module:

The Styles module is responsible for defining and managing the visual styles and themes of your graph visualization. It may include functions for setting colors, fonts, and other visual properties. This module allows you to customize the appearance of your graph to match your project's design requirements.


## Community

Join and communicate with other members on our community. We communicate on gitter.

[![Gitter](https://badges.gitter.im/scorelab/CodeLabz.svg)](https://app.gitter.im/#/room/#scorelab_graphnet:gitter.im)

## Contribute

Contributions are always welcome!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

> 📝**NOTE** : Remember to start the emulators before running the app.

#### ❓ Got more questions, ask it in our [gitter channel](https://app.gitter.im/#/room/#scorelab_graphnet:gitter.im) and we will love to answer them.
