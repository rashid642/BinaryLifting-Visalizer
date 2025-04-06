export class Calculation {
    constructor(nodeWidth = 60, levelNodeGap = 60, verticalSpacing = 100) {
      this.levelMap = new Map();
      this.levelNodeGap = levelNodeGap;
      this.nodeWidth = nodeWidth;
      this.verticalSpacing = verticalSpacing;
    }
  
    layoutTree(rootNode, initialHeight = 100) {
      if (!rootNode) return { width: 0, height: 0 };
  
      rootNode.style.x = 100000;
      rootNode.style.y = initialHeight;
  
      this.visited = new Set();
      this.bfsAssignLevels(rootNode);
      this.assignCoordinates();
  
      return this.normalizeCoordinates(rootNode);
    }
  
    bfsAssignLevels(root) {
      const queue = [{ node: root, level: 1, parent: null }];
      this.visited.add(root);
  
      while (queue.length > 0) {
        const { node, level, parent } = queue.shift();
        node.level = level;
        node.style.y = this.verticalSpacing * level;
  
        if (!this.levelMap.has(level)) {
          this.levelMap.set(level, []);
        }
        this.levelMap.get(level).push(node);
  
        for (const child of node.children) {
          if (child !== parent && !this.visited.has(child)) {
            this.visited.add(child);
            queue.push({ node: child, level: level + 1, parent: node });
          }
        }
      }
    }
  
    assignCoordinates() {
      const levels = Array.from(this.levelMap.keys()).sort((a, b) => b - a); 
  
      for (const level of levels) {
        const nodes = this.levelMap.get(level);
        let prevX = null;
  
        for (const node of nodes) {
          if (node.children.length > 0) {
            const validChildren = node.children.filter(
              (child) => child.level > node.level
            );
            if (validChildren.length > 0) {
              const childrenXs = validChildren.map((child) => child.style.x);
              const centerX = (Math.min(...childrenXs) + Math.max(...childrenXs)) / 2;
              node.style.x = prevX !== null
                ? Math.max(prevX + this.levelNodeGap, centerX)
                : centerX;
            } else {
              if (prevX !== null) {
                node.style.x = prevX + this.levelNodeGap;
              } else {
                const totalNodes = nodes.length;
                const startX = 100000 - (totalNodes * this.levelNodeGap) / 2;
                node.style.x = startX;
              }
            }
          } else {
            if (prevX !== null) {
              node.style.x = prevX + this.levelNodeGap;
            } else {
              const totalNodes = nodes.length;
              const startX = 100000 - (totalNodes * this.levelNodeGap) / 2;
              node.style.x = startX;
            }
          }
  
          prevX = node.style.x;
        }
      }
    }
  
    normalizeCoordinates(root) {
      let minX = Infinity, maxX = -Infinity, maxY = -Infinity;
  
      const dfs = (node, parent = null) => {
        if (!node) return;
        minX = Math.min(minX, node.style.x);
        maxX = Math.max(maxX, node.style.x);
        maxY = Math.max(maxY, node.style.y);
  
        for (const child of node.children) {
          if (child !== parent) {
            dfs(child, node);
          }
        }
      };
  
      dfs(root);
  
      const padding = 50;
      const shiftX = padding - minX;
      const shiftY = padding;
  
      const applyShift = (node, parent = null) => {
        node.style.x += shiftX;
        node.style.y += shiftY;
  
        for (const child of node.children) {
          if (child !== parent) {
            applyShift(child, node);
          }
        }
      };
  
      applyShift(root);
  
      return {
        width: maxX - minX + padding * 2,
        height: maxY + padding * 2,
      };
    }
  }
  