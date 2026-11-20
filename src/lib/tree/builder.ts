import type {
  BuildTraceStep,
  TreeMetrics,
  TreeNode,
} from './types';

interface RawTreeNode {
  id: string;
  value: string;
  left: RawTreeNode | null;
  right: RawTreeNode | null;
}

class IdCounter {
  private count = 0;

  next(prefix = 'bst'): string {
    this.count += 1;
    return `${prefix}-${this.count}`;
  }
}

/**
 * Pure recursive height calculation (edges from node to deepest leaf).
 * Base case: null node returns -1; leaf node returns 0.
 */
export function computeHeightRecursive(node: TreeNode | null): number {
  if (node === null) {
    return -1;
  }
  return 1 + Math.max(computeHeightRecursive(node.left), computeHeightRecursive(node.right));
}

/**
 * Pure recursive node count.
 */
export function countNodesRecursive(node: TreeNode | null): number {
  if (node === null) {
    return 0;
  }
  return 1 + countNodesRecursive(node.left) + countNodesRecursive(node.right);
}

/**
 * Pure recursive leaf count.
 */
export function countLeavesRecursive(node: TreeNode | null): number {
  if (node === null) {
    return 0;
  }
  if (node.left === null && node.right === null) {
    return 1;
  }
  return countLeavesRecursive(node.left) + countLeavesRecursive(node.right);
}

/**
 * Recursively enriches every node with depth, subtree height, subtree size, and root/leaf flags.
 */
function annotateNodeRecursive(raw: RawTreeNode | null, depth: number, isRoot: boolean): TreeNode | null {
  if (raw === null) {
    return null;
  }

  const left = annotateNodeRecursive(raw.left, depth + 1, false);
  const right = annotateNodeRecursive(raw.right, depth + 1, false);

  const leftHeight = left ? left.height : -1;
  const rightHeight = right ? right.height : -1;
  const height = 1 + Math.max(leftHeight, rightHeight);

  const leftSize = left ? left.subtreeSize : 0;
  const rightSize = right ? right.subtreeSize : 0;
  const subtreeSize = 1 + leftSize + rightSize;

  return {
    id: raw.id,
    value: raw.value,
    left,
    right,
    depth,
    height,
    subtreeSize,
    isRoot,
    isLeaf: left === null && right === null,
  };
}

function collectLevelCountsRecursive(node: TreeNode | null, counts: Map<number, number>): void {
  if (node === null) {
    return;
  }
  counts.set(node.depth, (counts.get(node.depth) ?? 0) + 1);
  collectLevelCountsRecursive(node.left, counts);
  collectLevelCountsRecursive(node.right, counts);
}

export function computeTreeMetrics(root: TreeNode): TreeMetrics {
  const nodeCount = countNodesRecursive(root);
  const leafCount = countLeavesRecursive(root);
  const height = computeHeightRecursive(root);
  const levelCounts = new Map<number, number>();
  collectLevelCountsRecursive(root, levelCounts);
  let maxWidth = 1;
  for (const count of levelCounts.values()) {
    if (count > maxWidth) {
      maxWidth = count;
    }
  }

  return {
    nodeCount,
    leafCount,
    internalCount: nodeCount - leafCount,
    height,
    rootValue: root.value,
    maxWidth,
  };
}

function areAllNumeric(values: string[]): boolean {
  return values.every((v) => !Number.isNaN(Number(v)) && Number.isFinite(Number(v)));
}

function compareValues(a: string, b: string, numeric: boolean): number {
  if (numeric) {
    return Number(a) - Number(b);
  }
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * Builds an ordered Binary Search Tree (BST) via pure recursive insertion:
 * Left Subtree < Node <= Right Subtree.
 */
export function buildBstTree(values: string[]): {
  root: TreeNode;
  metrics: TreeMetrics;
  trace: BuildTraceStep[];
} {
  const ids = new IdCounter();
  const trace: BuildTraceStep[] = [];
  const numericMode = areAllNumeric(values);

  const insertRecursive = (
    current: RawTreeNode | null,
    value: string,
    depth: number,
  ): RawTreeNode => {
    if (current === null) {
      const id = ids.next('bst');
      trace.push({
        stepNumber: trace.length + 1,
        action: 'create-leaf',
        summary: `Insert "${value}" at depth ${depth}`,
        detail:
          depth === 0
            ? `Base case: BST is empty, so "${value}" becomes the Root node.`
            : `Base case: reached empty child slot at depth ${depth}; create new leaf "${value}".`,
        nodeValue: value,
        nodeId: id,
        depth,
      });
      return {
        id,
        value,
        left: null,
        right: null,
      };
    }

    const cmp = compareValues(value, current.value, numericMode);

    if (cmp < 0) {
      trace.push({
        stepNumber: trace.length + 1,
        action: 'compare-left',
        summary: `"${value}" < "${current.value}" → recurse left`,
        detail: `BST invariant: "${value}" is smaller than "${current.value}", so recurse into the left subtree.`,
        nodeValue: current.value,
        nodeId: current.id,
        depth,
      });
      return {
        ...current,
        left: insertRecursive(current.left, value, depth + 1),
      };
    }

    trace.push({
      stepNumber: trace.length + 1,
      action: 'compare-right',
      summary: `"${value}" >= "${current.value}" → recurse right`,
      detail: `BST invariant: "${value}" is greater than or equal to "${current.value}", so recurse into the right subtree.`,
      nodeValue: current.value,
      nodeId: current.id,
      depth,
    });
    return {
      ...current,
      right: insertRecursive(current.right, value, depth + 1),
    };
  };

  let rawRoot: RawTreeNode | null = null;
  for (const val of values) {
    rawRoot = insertRecursive(rawRoot, val, 0);
  }

  const root = annotateNodeRecursive(rawRoot, 0, true);
  if (!root) {
    throw new Error('Failed to build Binary Search Tree.');
  }

  return {
    root,
    metrics: computeTreeMetrics(root),
    trace,
  };
}
