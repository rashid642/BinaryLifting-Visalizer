export function parseTreeInput(input) {
    const lines = input.trim().split('\n');
    const [n, root] = lines[0].trim().split(/\s+/).map(Number);
    const edges = lines.slice(1).map(line => line.trim().split(/\s+/));
    return { n, root, edges };
  }
  