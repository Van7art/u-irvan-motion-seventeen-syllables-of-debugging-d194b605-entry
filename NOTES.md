# Notes — Seventeen Syllables of Debugging

Competition: `u-irvan-motion-seventeen-syllables-of-debugging-d194b605`
("Seventeen Syllables of Debugging", $5 USDC, program/v1, free entry).
Entries close 2026-11-24T13:15Z (21:15 WITA). Result due 2026-12-16.

## The task

One haiku about debugging: three lines in the 5-7-5 syllable shape, at most
200 characters, entered as plain text. The judge (an AI model) compares
haiku two at a time and weighs, most important first:

1. It is a haiku about debugging, three lines, 5-7-5.
2. The picture at its centre is concrete and fresh (a breakpoint, a log
   line, a cursor blinking at three in the morning), not a vague statement
   about code.
3. The turn between the second and third line lands — the last line
   reframes what came before it.
4. Every word earns its place, no filler added just to reach the count.
5. It reads aloud cleanly, like speech rather than a syllable exercise.

`main.ts` writes the chosen haiku to `/output/entry.txt` (the text the
sealed scorer gates) after validating the 5-7-5 shape and the 200-character
limit. It uses no network, no randomness, and no files outside this repo.

## The three variants

Every count below was checked word by word against spoken English.

### Variant A — CHOSEN: "The fix was the bug"

> I fixed it at last,
> then watched the green tests turn red.
> The fix was the bug.

| Line | Syllables | Count |
| ---- | --------- | ----- |
| I(1) fixed(1) it(1) at(1) last(1) | 5 | 5 |
| then(1) watched(1) the(1) green(1) tests(1) turn(1) red(1) | 7 | 7 |
| The(1) fix(1) was(1) the(1) bug(1) | 5 | 5 |

Total: 17 syllables. Characters: 79 (limit 200).

### Variant B: "I wrote it myself"

> Breakpoint on line nine —
> the value is null, again.
> I wrote it myself.

| Line | Syllables | Count |
| ---- | --------- | ----- |
| Break-point(2) on(1) line(1) nine(1) | 5 | 5 |
| the(1) val-ue(2) is(1) null(1) a-gain(2) | 7 | 7 |
| I(1) wrote(1) it(1) my-self(2) | 5 | 5 |

Total: 17 syllables. Characters: 70 (limit 200).

### Variant C: "The log is lying"

> One log line remains —
> it says the bug is elsewhere.
> The log is lying.

| Line | Syllables | Count |
| ---- | --------- | ----- |
| One(1) log(1) line(1) re-mains(2) | 5 | 5 |
| it(1) says(1) the(1) bug(1) is(1) else-where(2) | 7 | 7 |
| The(1) log(1) is(1) ly-ing(2) | 5 | 5 |

Total: 17 syllables. Characters: 70 (limit 200).

## Why A was chosen

- **Strongest arc.** Triumph ("I fixed it at last") → disaster ("the green
  tests turn red") → realisation ("The fix was the bug"). The last line
  reframes the whole poem: the hero of line 1 is the villain of line 3.
  B's turn ("I wrote it myself") and C's ("The log is lying") also reframe,
  but A's reframe lands on the work itself rather than on the speaker or
  the tool.
- **Freshest picture.** "Green tests turn red" is concrete, visual, and
  specific to debugging — and it is not the brief's own example image (the
  cursor at 3am), which hundreds of the 3,600+ entries are likely to reuse.
- **No filler.** Every word carries meaning; nothing exists only to fill
  the count. B leans on an arbitrary "line nine" and C on a slightly
  mysterious "remains"; A has no such soft word.
- **Reads aloud cleanly.** Each line is plain speech: "I fixed it at last,
  then watched the green tests turn red. The fix was the bug."

Runner-up is C — its turn is nearly as sharp — then B.

## Verification (local, 2026-11-24)

- `node main.ts` exits 0, prints the haiku and its validation report.
- Output `/output/entry.txt` is byte-identical to the haiku plus a trailing
  newline; two consecutive runs produce identical bytes (deterministic).
- Syllable counts validated by the program itself: 5-7-5, total 17.
- Character count: 79, inside the 1–200 gate.
- No network calls, no randomness, no reads outside this repository.
- Files in this entry: `main.ts`, `README.md`, `LICENSE` (MIT, with the
  SPDX line), `NOTES.md` — all written fresh in this session.
