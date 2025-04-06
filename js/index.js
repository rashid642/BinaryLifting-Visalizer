import { Visualizer } from './visualizer.js';
import { Tree } from './tree/tree.js';
import { parseTreeInput } from './utils/utils.js';
import { isValidEdgeFormat, isValidNodeRange, hasCycle, isConnected } from './tree/validation.js';
import { generateRandomTree } from './utils/randomTreeGenerator.js';
import { BinaryLifting } from './algorithms/binaryLifting.js';
import { Logger } from './logger/logger.js';

let visualizer = null;
let tree = null;
let logger = null;

let treeInput, randomInput, errorDisplay, randomTreeErrorDisplay;
let findLcaBtn, lcaInput, lcaErrorDisplay, delaySlider, delayValue;

window.addEventListener('DOMContentLoaded', () => {
  visualizer = new Visualizer('treeCanvas', 1000, 800);
  logger = new Logger('logList');

  treeInput = document.getElementById('treeInput');
  randomInput = document.getElementById('randomSize');
  errorDisplay = document.getElementById('error');
  randomTreeErrorDisplay = document.getElementById('randomError');
  findLcaBtn = document.getElementById('findLcaBtn');
  lcaInput = document.getElementById('lcaInput');
  lcaErrorDisplay = document.getElementById('lcaError');
  delaySlider = document.getElementById('delaySlider');
  delayValue = document.getElementById('delayValue');

  document.getElementById('generateTreeBtn').addEventListener('click', handleTreeInput);
  document.getElementById('generateRandomBtn').addEventListener('click', handleRandomTreeGeneration);
  findLcaBtn.addEventListener('click', handleLcaFind);
  delaySlider.addEventListener('input', handleDelaySlider);
});

function handleTreeInput() {
  errorDisplay.textContent = '';
  logger.clear();

  const rawInput = treeInput.value.trim();
  if (!rawInput) return (errorDisplay.textContent = 'Input cannot be empty.');

  if (!isValidEdgeFormat(rawInput)) {
    errorDisplay.textContent = 'Invalid input format. All values must be numbers.';
    return;
  }

  const { n, root, edges } = parseTreeInput(rawInput);

  if (!isValidNodeRange(edges, n)) {
    errorDisplay.textContent = 'One or more nodes are out of range.';
    return;
  }

  if (hasCycle(n, edges)) {
    errorDisplay.textContent = 'Cycle detected. Input must form a tree.';
    return;
  }

  if (!isConnected(n, edges, root)) {
    errorDisplay.textContent = 'Tree is not fully connected.';
    return;
  }

  tree = new Tree(root.toString(), n, visualizer, 25);
  edges.forEach(([u, v]) => tree.addEdge(u, v));
  tree.clearTree();
  tree.drawTree(true);
}

function handleRandomTreeGeneration() {
  randomTreeErrorDisplay.textContent = '';
  logger.clear();

  const size = parseInt(randomInput.value);
  if (isNaN(size) || size < 1 || size > 1000) {
    randomTreeErrorDisplay.textContent = 'Please enter a valid number greater than 0 and less than 1000';
    return;
  }

  const { edges, root } = generateRandomTree(size);
  tree = new Tree(root.toString(), size, visualizer, 25);
  edges.forEach(([u, v]) => tree.addEdge(u, v));
  tree.clearTree();
  tree.drawTree(true);
}

async function handleLcaFind() {
  lcaErrorDisplay.textContent = '';
  logger.clear();

  if (!tree) {
    lcaErrorDisplay.textContent = 'Please generate a tree first.';
    return;
  }

  const input = lcaInput.value.trim().split(' ').map(Number);
  if (input.length !== 2 || input.some(isNaN)) {
    lcaErrorDisplay.textContent = 'Please enter two valid node numbers.';
    return;
  }

  const [u, v] = input;
  if (!tree.nodeMap.has(u.toString()) || !tree.nodeMap.has(v.toString())) {
    lcaErrorDisplay.textContent = 'Both nodes must exist in the tree.';
    return;
  }

  const delay = parseInt(delaySlider.value);
  const lifting = new BinaryLifting(tree, logger, delay);
  const lca = await lifting.findLCA(u.toString(), v.toString());
  logger.log(`✅ LCA of ${u} and ${v} is ${lca}`);
}

function handleDelaySlider() {
  delayValue.textContent = `${delaySlider.value}ms`;
}
