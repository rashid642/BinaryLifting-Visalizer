import { Visualizer } from './visualizer.js';
import { Tree } from './tree/tree.js';

let visualizer = null;

window.addEventListener('DOMContentLoaded', () => {
  visualizer = new Visualizer('treeCanvas', 3000, 1200); // Increase canvas size for bigger tree

  const tree = new Tree('1', 60, visualizer, 25);

  // Build a tree manually: we use a queue-based BFS to build a full-ish tree with 60 nodes
  let current = 1;
  const maxNodes = 60;
  const edges = [];
  let queue = ['1'];

  while (current < maxNodes) {
    const parent = queue.shift();

    const left = (++current).toString();
    const right = (++current).toString();

    if (parseInt(left) <= maxNodes) {
      edges.push([parent, left]);
      queue.push(left);
    }

    if (parseInt(right) <= maxNodes) {
      edges.push([parent, right]);
      queue.push(right);
    }
  }

  // Add edges to the tree
  edges.forEach(([u, v]) => tree.addEdge(u, v));

  // Clear and draw tree
  tree.clearTree();
  tree.drawTree();
});
