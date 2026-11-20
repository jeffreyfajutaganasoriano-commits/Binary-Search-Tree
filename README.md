# BinaryTree Studio

An interactive Data Structures and Algorithms (DSA) educational web application dedicated exclusively to **Binary Search Trees (BST)**, recursive insertion (`Left < Node <= Right`; duplicates go right), and **INORDER (LTR)**, **PREORDER (TLR)**, and **POSTORDER (LRT)** traversals.

## Features

- **Pure Recursive BST Engine (`src/lib/tree/`):**
  - `types.ts` — Strongly typed BST nodes, metrics, insertion trace entries, and traversal step frames.
  - `parser.ts` — Parses and validates numeric or alphabetic key sequences with clear diagnostic messages.
  - `builder.ts` — Pure recursive BST insertion (`Left Subtree < Node <= Right Subtree`, with duplicates routed right) and recursive height/node/leaf calculations.
  - `traversals.ts` — Pure recursive `INORDER (LTR)`, `PREORDER (TLR)`, and `POSTORDER (LRT)` traversals recording call-stack frames, `null` base cases, and node visit order.
- **Side-by-Side SVG Visualizer & Traversal Table + Step-by-Step Recursion Inspector:**
  - Non-overlapping inorder SVG tree layout with zoom controls, Root/Leaf indicators, directional `L`/`R` edge labels, and click-to-inspect node metadata alongside the Traversal Comparison Table.
  - Play/Pause, Step Forward/Backward, Reset, speed selector, step scrubber, live recursion call stack, and BST insertion build log.

## Local Development

Prerequisites: Node.js 20.19 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

On Windows PowerShell, if script execution blocks the `npm` command, use `npm.cmd` instead (for example, `npm.cmd install` and `npm.cmd run dev`).

### Verification

```bash
npm run lint
npm test
npm run build
```

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Vite:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

## Deploying to GitHub Pages

The GitHub Actions workflow builds the app and deploys the `dist` output for the project URL `https://<owner>.github.io/Binary-Search-Tree/`.

1. In the repository settings, open **Pages** and set the source to **GitHub Actions**.
2. Push to the `main` branch or run the **Deploy to GitHub Pages** workflow manually from the **Actions** tab.
