export function generateRandomTree(n) {
    const edges = [];
    const nodes = Array.from({ length: n }, (_, i) => (i + 1).toString());
  
    for (let i = 1; i < n; i++) {
      const parent = nodes[Math.floor(Math.random() * i)];
      edges.push([parent, nodes[i]]);
    }
  
    return {
      root: nodes[0],
      edges
    };
  }
  