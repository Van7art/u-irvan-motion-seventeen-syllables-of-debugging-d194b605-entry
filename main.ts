// Seventeen Syllables of Debugging — make.fun bounty entry.
//
// This program writes exactly one haiku about debugging to
// /output/entry.txt, the text the sealed scorer gates (UTF-8, 1-200
// characters, not only whitespace) and the judge then reads.
//
// The haiku (5-7-5, seventeen syllables):
//   I fixed it at last,                  (5)
//   then watched the green tests turn red. (7)
//   The fix was the bug.                 (5)
//
// No network, no randomness, no files read from outside this repository:
// the output is fully deterministic — the same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The chosen haiku, one string per line. Punctuation is part of the poem.
const HAIKU: readonly string[] = [
  "I fixed it at last,",
  "then watched the green tests turn red.",
  "The fix was the bug.",
];

// Syllable count for every word the haiku uses, counted by hand.
// Each entry was checked against spoken English (fixed = 1, watched = 1,
// tests = 1). Any word missing from this table fails the run loudly
// instead of being guessed, so a miscount can never slip through.
const SYLLABLES: Readonly<Record<string, number>> = {
  i: 1,
  fixed: 1,
  it: 1,
  at: 1,
  last: 1,
  then: 1,
  watched: 1,
  the: 1,
  green: 1,
  tests: 1,
  turn: 1,
  red: 1,
  fix: 1,
  was: 1,
  bug: 1,
};

const EXPECTED_PATTERN: readonly number[] = [5, 7, 5];
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function countSyllables(line: string): number {
  const words = line
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0);
  let total = 0;
  for (const word of words) {
    const count = SYLLABLES[word];
    if (count === undefined) {
      throw new Error(`no syllable count for word: ${word}`);
    }
    total += count;
  }
  return total;
}

function validate(): string {
  if (HAIKU.length !== 3) {
    throw new Error(`haiku must have 3 lines, got ${HAIKU.length}`);
  }
  const counts = HAIKU.map(countSyllables);
  for (let i = 0; i < EXPECTED_PATTERN.length; i++) {
    if (counts[i] !== EXPECTED_PATTERN[i]) {
      throw new Error(
        `line ${i + 1} has ${counts[i]} syllables, expected ${EXPECTED_PATTERN[i]}: ${HAIKU[i]}`,
      );
    }
  }
  const total = counts.reduce((sum, count) => sum + count, 0);
  if (total !== 17) {
    throw new Error(`haiku has ${total} syllables, expected 17`);
  }
  const text = HAIKU.join("\n");
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`haiku is ${text.length} characters, limit is ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("haiku is only whitespace");
  }
  return text;
}

function main(): void {
  const text = validate();
  const counts = HAIKU.map(countSyllables);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text + "\n", "utf8");
  // Print the entry and its validation report for the run log.
  console.log(text);
  console.log("---");
  console.log(`lines: ${HAIKU.length}`);
  console.log(`syllables: ${counts.join("-")} (total ${counts.reduce((a, b) => a + b, 0)})`);
  console.log(`characters: ${text.length} (limit ${MAX_CHARS})`);
  console.log(`wrote: ${OUTPUT_PATH}`);
}

main();
