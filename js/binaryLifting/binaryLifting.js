export class BinaryLifting {
    constructor(tree, logger, delay = 500) {
      this.tree = tree;
      this.logger = logger;
      this.delay = delay; 
      this.n = tree.numberOfNodes;
      this.m = Math.floor(Math.log2(this.n)) + 1;
      this.level = new Array(this.n + 1).fill(0);
      this.dp = Array.from({ length: this.n + 1 }, () => new Array(this.m).fill(0));
      this.adj = Array.from({ length: this.n + 1 }, () => []);
      this.parent = new Array(this.n + 1).fill(-1);
      this.build();
    }
  
    build() {
      const root = this.tree.getRoot();
      const visited = new Set();
      const queue = [[root, -1]];
  
      while (queue.length > 0) {
        const [node, par] = queue.shift();
        const val = node.value;
        this.parent[val] = par;
  
        for (const child of node.children) {
          if (child.value !== par) {
            this.adj[val].push(child.value);
            queue.push([child, val]);
          }
        }
      }
  
      const rootVal = root.value;
      this.dfs(rootVal, -1, 0);
    }
  
    dfs(node, par, depth) {
      this.level[node] = depth;
      this.dp[node][0] = par === -1 ? node : par;
  
      for (let i = 1; i < this.m; i++) {
        this.dp[node][i] = this.dp[this.dp[node][i - 1]]?.[i - 1] ?? node;
      }
  
      for (const neighbor of this.adj[node]) {
        if (neighbor !== par) {
          this.dfs(neighbor, node, depth + 1);
        }
      }
    }
  
    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async animateVisit(value, color, message) {
      this.tree.setNodeColor(value, color);
      this.tree.clearTree();
      this.tree.drawTree();
      this.logger.addLog(message);
      await this.sleep(this.delay);
    }
  
    async liftNode(node, k) {
      for (let i = 0; i < this.m; i++) {
        if ((k >> i) & 1) {
          await this.animateVisit(node, "yellow", `Lifting node ${node} by 2^${i}`);
          node = this.dp[node][i];
        }
      }
      return node;
    }
  
    async findLCA(u, v) {
      await this.animateVisit(u, "red", `Start from node ${u}`);
      await this.animateVisit(v, "red", `Start from node ${v}`);
  
      if (this.level[u] < this.level[v]) [u, v] = [v, u];
  
      u = await this.liftNode(u, this.level[u] - this.level[v]);
  
      if (u === v) {
        await this.animateVisit(u, "green", `LCA found at node ${u}`);
        return u;
      }
  
      for (let i = this.m - 1; i >= 0; i--) {
        if (this.dp[u][i] !== this.dp[v][i]) {
          await this.animateVisit(u, "yellow", `u jumps from ${u} to ${this.dp[u][i]}`);
          await this.animateVisit(v, "yellow", `v jumps from ${v} to ${this.dp[v][i]}`);
          u = this.dp[u][i];
          v = this.dp[v][i];
        }
      }
  
      await this.animateVisit(this.dp[u][0], "green", `LCA found at node ${this.dp[u][0]}`);
      return this.dp[u][0];
    }
  
    setDelay(newDelay) {
      this.delay = newDelay;
    }
  }
  