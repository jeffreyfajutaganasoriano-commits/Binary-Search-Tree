export function ConceptsGuide() {
  return (
    <section
      aria-labelledby="concepts-guide-heading"
      className="space-y-8"
    >
      <div className="border-b border-[#D2DCE4] pb-5 dark:border-[#3A3735]">
        <h1
          id="concepts-guide-heading"
          className="font-display text-3xl tracking-tight text-[#A98273] dark:text-[#DEC3B3]"
        >
          Binary Search Trees, Recursion &amp; Traversals
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5F5A57] dark:text-[#DFD6D0]">
          A <strong className="font-bold">Binary Search Tree (BST)</strong> is an ordered hierarchical data structure where every node satisfies <code className="font-mono font-semibold text-[#A98273] dark:text-[#DEC3B3]">Left Subtree &lt; Node &lt; Right Subtree</code>.
        </p>
      </div>

      {/* 1. Core Terminology & Visual Anatomy */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="sidebar-gradient rounded-xl border border-[#D2DCE4] p-6 lg:col-span-5 dark:border-[#3A3735]">
          <h2 className="font-heading text-base font-bold text-[#A98273] dark:text-[#DEC3B3]">
            01. Anatomy of a Binary Search Tree
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A57] dark:text-[#DFD6D0]">
            Every subtree inside a BST is itself a valid BST, allowing insertion, search, height measurement, and traversal to be written cleanly with recursion.
          </p>

          <svg
            viewBox="0 0 360 220"
            role="img"
            aria-label="Labeled Binary Search Tree diagram showing root 50, left subtree 30, 20, 40, and right leaf 70"
            className="mt-4 w-full rounded-lg border border-[#D2DCE4] bg-[#F8F2EF] dark:border-[#3E3B39] dark:bg-[#1E1C1B]"
          >
            <rect
              x="28"
              y="84"
              width="148"
              height="118"
              rx="8"
              fill="none"
              strokeDasharray="4 4"
              stroke="#B98E83"
              strokeWidth="1.5"
            />
            <text
              x="38"
              y="100"
              fill="#A98273"
              className="font-mono text-[9.5px] font-semibold"
            >
              Left Subtree (&lt; 50)
            </text>

            <line x1="180" y1="42" x2="104" y2="112" stroke="#8C9DA7" strokeWidth="2" />
            <line x1="180" y1="42" x2="256" y2="112" stroke="#8C9DA7" strokeWidth="2" />
            <line x1="104" y1="112" x2="62" y2="174" stroke="#8C9DA7" strokeWidth="2" />
            <line x1="104" y1="112" x2="146" y2="174" stroke="#8C9DA7" strokeWidth="2" />

            <circle cx="180" cy="42" r="18" fill="#B98E83" />
            <text x="180" y="47" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-bold">
              50
            </text>
            <text x="206" y="40" className="font-mono text-[10px] font-semibold fill-[#5F5A57] dark:fill-[#DFD6D0]">
              Root (depth 0)
            </text>

            <circle cx="104" cy="112" r="17" fill="#DEC3B3" stroke="#A98273" strokeWidth="2" />
            <text x="104" y="117" textAnchor="middle" fill="#46413E" className="font-mono text-xs font-semibold">
              30
            </text>

            <circle cx="256" cy="112" r="17" fill="#8C9DA7" stroke="#687C87" strokeWidth="2" />
            <text x="256" y="117" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-semibold">
              70
            </text>
            <text x="256" y="143" textAnchor="middle" fill="#687C87" className="font-mono text-[10px] font-semibold">
              Leaf (&gt; 50)
            </text>

            <circle cx="62" cy="174" r="16" fill="#8C9DA7" stroke="#687C87" strokeWidth="2" />
            <text x="62" y="178" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-semibold">
              20
            </text>

            <circle cx="146" cy="174" r="16" fill="#8C9DA7" stroke="#687C87" strokeWidth="2" />
            <text x="146" y="178" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-semibold">
              40
            </text>
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {[
            {
              term: 'Root Node',
              desc: 'The first key inserted into an empty BST (depth 0). All smaller keys route left; all larger keys route right.',
            },
            {
              term: 'BST Ordering Invariant',
              desc: 'Every node guarantees all values in its left subtree are strictly less, and all values in its right subtree are strictly greater.',
            },
            {
              term: 'Leaf Node',
              desc: 'A terminal node whose left and right children are both null. New keys always attach as leaves at a null base case.',
            },
            {
              term: 'Subtree',
              desc: 'Any node together with all of its descendants. Because each child subtree is also a BST, recursive lookup discards half the tree on balanced inputs.',
            },
            {
              term: 'Depth vs. Height',
              desc: 'Depth counts edges from the root down to a node. Height counts edges from a node down to its deepest leaf (single node = 0, null = -1).',
            },
            {
              term: 'Recursive Base Case',
              desc: 'During insertion or traversal, hitting a null child pointer stops recursion—inserting a new leaf or returning up the call stack.',
            },
          ].map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-[#D2DCE4] bg-[#E7EBEE] p-4 dark:border-[#3A3735] dark:bg-[#272625]"
            >
              <h3 className="font-heading text-sm font-bold text-[#A98273] dark:text-[#DEC3B3]">
                {item.term}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A57] dark:text-[#DFD6D0]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. How Insertion Order Shapes BST Height */}
      <div className="rounded-xl border border-[#D2DCE4] bg-[#E7EBEE] p-6 dark:border-[#3A3735] dark:bg-[#272625]">
        <h2 className="font-heading text-base font-bold text-[#A98273] dark:text-[#DEC3B3]">
          02. How Insertion Order Shapes BST Height
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A57] dark:text-[#DFD6D0]">
          Even though both trees below store the exact same sorted keys (<code className="font-mono font-semibold">10, 20, 30</code>), inserting the middle key first builds a balanced BST of height 1, while inserting already-sorted keys builds a skewed chain of height 2.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[#D2DCE4] bg-[#F8F2EF] p-4 dark:border-[#3E3B39] dark:bg-[#1E1C1B]">
            <div className="font-heading text-sm font-bold text-[#5F5A57] dark:text-[#F0E5DF]">
              Balanced Insertion: 20, 10, 30
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#827A75] dark:text-[#B8AFA9]">
              Height: 1 · INORDER (LTR): 10, 20, 30
            </div>
            <svg viewBox="0 0 220 110" className="mt-3 h-28 w-full">
              <line x1="110" y1="26" x2="60" y2="80" stroke="#8C9DA7" strokeWidth="2" />
              <line x1="110" y1="26" x2="160" y2="80" stroke="#8C9DA7" strokeWidth="2" />
              <circle cx="110" cy="26" r="15" fill="#B98E83" />
              <text x="110" y="31" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-bold">20</text>
              <circle cx="60" cy="80" r="15" fill="#8C9DA7" stroke="#687C87" strokeWidth="2" />
              <text x="60" y="85" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-semibold">10</text>
              <circle cx="160" cy="80" r="15" fill="#8C9DA7" stroke="#687C87" strokeWidth="2" />
              <text x="160" y="85" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-semibold">30</text>
            </svg>
          </div>

          <div className="rounded-lg border border-[#D2DCE4] bg-[#F8F2EF] p-4 dark:border-[#3E3B39] dark:bg-[#1E1C1B]">
            <div className="font-heading text-sm font-bold text-[#5F5A57] dark:text-[#F0E5DF]">
              Sorted Insertion (Skewed): 10, 20, 30
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#827A75] dark:text-[#B8AFA9]">
              Height: 2 · INORDER (LTR): 10, 20, 30
            </div>
            <svg viewBox="0 0 220 110" className="mt-3 h-28 w-full">
              <line x1="60" y1="24" x2="110" y2="56" stroke="#8C9DA7" strokeWidth="2" />
              <line x1="110" y1="56" x2="160" y2="88" stroke="#8C9DA7" strokeWidth="2" />
              <circle cx="60" cy="24" r="14" fill="#687C87" />
              <text x="60" y="29" textAnchor="middle" fill="#F8F2EF" className="font-mono text-xs font-bold">10</text>
              <circle cx="110" cy="56" r="14" fill="#DEC3B3" stroke="#A98273" strokeWidth="2" />
              <text x="110" y="61" textAnchor="middle" fill="#46413E" className="font-mono text-xs font-semibold">20</text>
              <circle cx="160" cy="88" r="14" fill="#DEC3B3" stroke="#A98273" strokeWidth="2" />
              <text x="160" y="93" textAnchor="middle" fill="#46413E" className="font-mono text-xs font-semibold">30</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. The Three Traversals on a BST */}
      <div className="rounded-xl border border-[#D2DCE4] bg-[#E7EBEE] p-6 dark:border-[#3A3735] dark:bg-[#272625]">
        <h2 className="font-heading text-base font-bold text-[#A98273] dark:text-[#DEC3B3]">
          03. Recursive Traversals on a BST: LTR, TLR, and LRT
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[#5F5A57] dark:text-[#DFD6D0]">
          All three depth-first traversals share the exact same <strong className="font-bold">Base Case</strong> (<code className="font-mono">if (node === null) return;</code>) and differ only in when the current node <code className="font-mono">T</code> is visited relative to its <code className="font-mono">L</code> and <code className="font-mono">R</code> subtrees.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#D2DCE4] bg-[#F8F2EF] p-4 dark:border-[#3E3B39] dark:bg-[#1E1C1B]">
            <div className="font-heading text-sm font-bold text-[#5F5A57] dark:text-[#F0E5DF]">
              INORDER (LTR)
            </div>
            <div className="mt-0.5 font-mono text-xs font-semibold text-[#A98273] dark:text-[#DEC3B3]">
              Left → Root → Right · Sorted Order
            </div>
            <pre className="mt-3 overflow-x-auto rounded border border-[#D2DCE4] bg-[#E7EBEE] p-3 font-mono text-[11px] leading-relaxed text-[#5F5A57] dark:border-[#3A3735] dark:bg-[#272625] dark:text-[#DFD6D0]">
{`function inorder(node) {
  if (node === null) return;
  inorder(node.left);   // L
  visit(node.value);    // T
  inorder(node.right);  // R
}`}
            </pre>
            <p className="mt-2.5 text-xs leading-relaxed text-[#827A75] dark:text-[#B8AFA9]">
              Always visits BST keys in ascending sorted order, regardless of the original insertion sequence.
            </p>
          </div>

          <div className="rounded-lg border border-[#D2DCE4] bg-[#F8F2EF] p-4 dark:border-[#3E3B39] dark:bg-[#1E1C1B]">
            <div className="font-heading text-sm font-bold text-[#5F5A57] dark:text-[#F0E5DF]">
              PREORDER (TLR)
            </div>
            <div className="mt-0.5 font-mono text-xs font-semibold text-[#A98273] dark:text-[#DEC3B3]">
              Root → Left → Right · Top-Down
            </div>
            <pre className="mt-3 overflow-x-auto rounded border border-[#D2DCE4] bg-[#E7EBEE] p-3 font-mono text-[11px] leading-relaxed text-[#5F5A57] dark:border-[#3A3735] dark:bg-[#272625] dark:text-[#DFD6D0]">
{`function preorder(node) {
  if (node === null) return;
  visit(node.value);    // T
  preorder(node.left);  // L
  preorder(node.right); // R
}`}
            </pre>
            <p className="mt-2.5 text-xs leading-relaxed text-[#827A75] dark:text-[#B8AFA9]">
              Re-inserting keys in PREORDER sequence reproduces the exact same BST topology.
            </p>
          </div>

          <div className="rounded-lg border border-[#D2DCE4] bg-[#F8F2EF] p-4 dark:border-[#3E3B39] dark:bg-[#1E1C1B]">
            <div className="font-heading text-sm font-bold text-[#5F5A57] dark:text-[#F0E5DF]">
              POSTORDER (LRT)
            </div>
            <div className="mt-0.5 font-mono text-xs font-semibold text-[#A98273] dark:text-[#DEC3B3]">
              Left → Right → Root · Bottom-Up
            </div>
            <pre className="mt-3 overflow-x-auto rounded border border-[#D2DCE4] bg-[#E7EBEE] p-3 font-mono text-[11px] leading-relaxed text-[#5F5A57] dark:border-[#3A3735] dark:bg-[#272625] dark:text-[#DFD6D0]">
{`function postorder(node) {
  if (node === null) return;
  postorder(node.left);  // L
  postorder(node.right); // R
  visit(node.value);     // T
}`}
            </pre>
            <p className="mt-2.5 text-xs leading-relaxed text-[#827A75] dark:text-[#B8AFA9]">
              Visits both child subtrees before the parent—used for computing heights and bottom-up tree deallocation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
