// Alien Field Notes: The Two Day Earth Review
// Writes one original line — an alien tourist's review of planet Earth —
// to /output/entry.txt. Gate: UTF-8 text, 1 to 200 characters, not only
// whitespace, a single line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "Earth: gorgeous sunsets, edible snacks, and the locals built a box that washes their dishes, then argue about whose turn it is to empty it. 4/5 — would orbit again.";

const MAX_CHARS = 200;

function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // Control characters other than the em dash are not printable review text.
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > 400) {
    throw new Error(`entry must be at most 400 UTF-8 bytes, got ${bytes}`);
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(ENTRY);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${[...ENTRY].length} chars)`);
