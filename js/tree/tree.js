import { Calculation } from '../maths/calculation.js';
import { Node } from './node.js';

export class Tree {
  constructor(rootValue, numberOfNodes, visualizer, radius) {
    this.visualizer = visualizer;
    this.nodeMap = new Map();
    this.radius = radius;
    const rootNode = new Node(rootValue);
    this.root = rootNode;
    this.nodeMap.set(rootValue, rootNode);
    this.numberOfNodes = numberOfNodes;
    this.calculation = new Calculation();
  }

  addEdge(value1, value2) {
    const node1 = this.getNode(value1);
    const node2 = this.getNode(value2);

    node1.addChild(node2);
    node2.addChild(node1);
  }

  getNode(value) {
    if (!this.nodeMap.has(value)) {
      const node = new Node(value);
      this.nodeMap.set(value, node);
    }
    return this.nodeMap.get(value);
  }

  drawTree(shouldCalculateCoordinates = true) {
    this.visualizer.clearCanvas();
  
    if (shouldCalculateCoordinates) {
      const { width, height } = this.calculation.layoutTree(this.root);
      this.visualizer.resizeCanvas(width, height);
    }
  
    const visited = new Set();
    for (let node of this.nodeMap.values()) {
      visited.add(node);
      for (let child of node.children) {
        if (!visited.has(child)) {
          this.visualizer.createLine(
            node.style.x,
            node.style.y,
            child.style.x,
            child.style.y
          );
        }
      }
    }
  
    for (let node of this.nodeMap.values()) {
      const pos = node.getPosition();
      this.visualizer.createCircle(pos.x, pos.y, this.radius, node.style.color, node.value);
    }
  }
  

  clearTree() {
    this.visualizer.clearCanvas();
  }

  getRoot() {
    return this.root;
  }

  updateNodePosition(value, x, y) {
    const node = this.getNode(value);
    node.style.updateXCoordinate(x);
    node.style.updateYCoordinate(y);
  }

  setNodeColor(value, color) {
    const node = this.getNode(value);
    node.setColor(color);
  }
}
