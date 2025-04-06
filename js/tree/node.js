import { NodeStyle } from './nodeStyle.js';

export class Node {
  constructor(value, nodeStyle = new NodeStyle()) {
    this.value = value;
    this.style = nodeStyle;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  getPosition() {
    return this.style.getPosition();
  }

  setColor(color) {
    this.style.updateColor(color);
  }
}