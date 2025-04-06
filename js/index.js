import { Visualizer } from './visualizer.js';
import { Tree } from './tree/tree.js';
import { Logger } from './utils/logger.js';
import { BinaryLifting } from './algorithms/binaryLifting.js';

let visualizer = null;
let tree = null;
let logger = new Logger('logList');
let delayTime = 1000;

// Setup delay slider
const delaySlider = document.getElementById('delaySlider');
const delayValue = document.getElementById('delayValue');

delaySlider.addEventListener('input', () => {
  delayTime = parseInt(delaySlider.value);
  delayValue.textContent = `${delayTime}ms`;
});

window.addEventListener('DOMContentLoaded', async () => {
  visualizer = new Visualizer('treeCanvas', 1200, 1000);
  tree = new Tree('1', 20, visualizer, 25);

  // Tree structure (20 nodes)
  const edges = [
    ['1', '2'],
    ['1', '3'],
    ['2', '4'],
    ['2', '5'],
    ['3', '6'],
    ['3', '7'],
    ['4', '8'],
    ['4', '9'],
    ['5', '10'],
    ['5', '11'],
    ['6', '12'],
    ['6', '13'],
    ['7', '14'],
    ['7', '15'],
    ['8', '16'],
    ['9', '17'],
    ['10', '18'],
    ['11', '19'],
    ['12', '20']
  ];

  // Add edges and draw tree
  edges.forEach(([u, v]) => tree.addEdge(u, v));
  tree.clearTree();
  tree.drawTree();

  // Run Binary Lifting
  logger.clear();
  const lifting = new BinaryLifting(tree, logger, delayTime);

  // Choose any two nodes to find their LCA
  const u = '17';
  const v = '20';
  const lca = await lifting.findLCA(u, v);
  logger.log(`✅ LCA of ${u} and ${v} is ${lca}`);
});
