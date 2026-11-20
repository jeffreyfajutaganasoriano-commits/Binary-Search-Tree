import { buildBstTree } from './builder';
import { parseBstInput } from './parser';
import { computeAllTraversals } from './traversals';
import type { ParseValidationError, TreeBuildResult } from './types';

export * from './types';
export * from './parser';
export * from './builder';
export * from './traversals';

export type AnalyzeTreeResponse =
  | { ok: true; result: TreeBuildResult }
  | { ok: false; error: ParseValidationError };

/**
 * Pure end-to-end builder and traversal analyzer for Binary Search Trees (BST).
 */
export function buildAndAnalyzeTree(rawInput: string): AnalyzeTreeResponse {
  const parsed = parseBstInput(rawInput);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error };
  }

  const built = buildBstTree(parsed.values);
  const traversals = computeAllTraversals(built.root);

  return {
    ok: true,
    result: {
      root: built.root,
      metrics: built.metrics,
      buildTrace: built.trace,
      traversals,
      normalizedInput: parsed.normalized,
    },
  };
}
