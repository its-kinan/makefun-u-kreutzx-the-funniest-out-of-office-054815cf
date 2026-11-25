// The Funniest Out-of-Office — make.fun entry (program/v1).
// Writes a single line of an out-of-office auto-reply to /output/entry.txt.
// Deterministic: fixed text, no network, no clock, no randomness.
// The line: a real one-line OOO a person would actually set, whose joke is
// a recursion that escalates — the auto-reply itself is out too, urgent mail
// goes to the auto-reply's auto-reply, and that one is out as well. The
// twist lands in the last words ("it's out too"). Tighter than v1: "send"
// for "direct", "please" cut, third beat added instead of trailing off.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm out until Monday. This auto-reply is also out until Monday, so send anything urgent to my auto-reply's auto-reply — it's out too.";

if (LINE.length > 140) {
  throw new Error(`entry is ${LINE.length} chars, over the 140-char gate`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
