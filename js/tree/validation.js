
export function isValidEdgeFormat(input) {
    const lines = input.trim().split('\n');
    return lines.every(line => {
      const tokens = line.trim().split(/\s+/);
      return tokens.length === 2 && tokens.every(t => !isNaN(t));
    });
  }
    
  export function isValidNodeRange(edges, n) {
    const nodeSet = new Set();
    for (let [u, v] of edges) {
      if (+u > n || +v > n) return false;
      nodeSet.add(+u);
      nodeSet.add(+v);
    }
    return nodeSet.size <= n;
  }
  
  export function hasCycle(n, edges) {
    const parent = Array(n + 1).fill(0).map((_, i) => i);
    
    const find = x => parent[x] === x ? x : parent[x] = find(parent[x]);
    const union = (x, y) => {
      const px = find(x), py = find(y);
      if (px === py) return false;
      parent[px] = py;
      return true;
    };
  
    for (let [u, v] of edges) {
      if (!union(+u, +v)) return true;
    }
    return false;
  }
  
  export function isConnected(n, edges, root) {
    const adj = Array.from({ length: n + 1 }, () => []);
    edges.forEach(([u, v]) => {
      adj[+u].push(+v);
      adj[+v].push(+u);
    });
  
    const visited = new Array(n + 1).fill(false);
    const dfs = node => {
      visited[node] = true;
      for (let nei of adj[node]) {
        if (!visited[nei]) dfs(nei);
      }
    };
  
    dfs(+root);
    for (let i = 1; i <= n; i++) {
      if (!visited[i]) return false;
    }
    return true;
  }
  