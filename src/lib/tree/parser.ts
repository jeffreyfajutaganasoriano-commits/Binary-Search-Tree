import type { ParseValidationError, PresetExample } from './types';

const MAX_SEQUENCE_TOKENS = 31;

export const BST_PRESETS: PresetExample[] = [
  {
    id: 'bst-balanced',
    label: '50, 30, 70, 20, 40, 60, 80',
    input: '50, 30, 70, 20, 40, 60, 80',
    description: 'Balanced 3-level BST whose INORDER (LTR) traversal produces ascending sorted order.',
  },
  {
    id: 'bst-letters',
    label: 'M, B, Q, A, D, Z',
    input: 'M, B, Q, A, D, Z',
    description: 'Alphabetic keys inserted recursively by lexicographic comparison (Left < Node < Right).',
  },
  {
    id: 'bst-skewed',
    label: '10, 20, 30, 40, 50',
    input: '10, 20, 30, 40, 50',
    description: 'Sorted insertion sequence produces a right-skewed BST of height 4.',
  },
  {
    id: 'bst-classic',
    label: '8, 3, 10, 1, 6, 14, 4, 7',
    input: '8, 3, 10, 1, 6, 14, 4, 7',
    description: 'Classic textbook Binary Search Tree with height 3 and four leaf nodes.',
  },
];

export type SequenceParseResult =
  | { ok: true; values: string[]; normalized: string }
  | { ok: false; error: ParseValidationError };

/**
 * Parses a sequence of BST keys separated by commas, spaces, semicolons, pipes, or arrows.
 */
export function parseBstInput(rawInput: string): SequenceParseResult {
  const trimmed = rawInput.trim();
  if (trimmed.length === 0) {
    return {
      ok: false,
      error: {
        message: 'Please enter a sequence of keys to build a Binary Search Tree.',
        hint: 'Enter comma- or space-separated numbers or labels, e.g. 50, 30, 70, 20, 40.',
      },
    };
  }

  const values = trimmed
    .split(/(?:->|[,;|\s])+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (values.length === 0) {
    return {
      ok: false,
      error: {
        message: 'No valid BST keys were found in your input.',
        hint: 'Use numbers or alphanumeric tokens separated by commas or spaces.',
      },
    };
  }

  if (values.length > MAX_SEQUENCE_TOKENS) {
    return {
      ok: false,
      error: {
        message: `Sequence contains ${values.length} keys (maximum ${MAX_SEQUENCE_TOKENS} for legible visualization).`,
        hint: 'Provide up to 31 keys so every tree level fits clearly on screen.',
      },
    };
  }

  for (const val of values) {
    if (!/^[a-zA-Z0-9_.-]+$/.test(val)) {
      return {
        ok: false,
        error: {
          message: `Invalid key "${val}" in BST sequence.`,
          hint: 'Keys may contain letters, digits, hyphens, underscores, or decimal points.',
        },
      };
    }
  }

  return {
    ok: true,
    values,
    normalized: values.join(', '),
  };
}
