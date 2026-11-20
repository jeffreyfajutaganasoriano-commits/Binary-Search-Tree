import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAndAnalyzeTree } from './index';

test('keeps duplicate keys in the right subtree and includes them in traversals', () => {
  const response = buildAndAnalyzeTree('50, 30, 50, 70');
  if (!response.ok) {
    throw new Error(response.error.message);
  }

  const { root, metrics, buildTrace, traversals } = response.result;
  assert.equal(metrics.nodeCount, 4);
  assert.equal(root.left?.value, '30');
  assert.equal(root.right?.value, '50');
  assert.equal(root.right?.right?.value, '70');
  assert.deepEqual(
    traversals.inorder.tokens.map(({ value }) => value),
    ['30', '50', '50', '70'],
  );
  assert.ok(buildTrace.some((step) => step.summary === '"50" >= "50" → recurse right'));
});
