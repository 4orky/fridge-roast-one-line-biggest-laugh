// Fridge Roast: One Line, Biggest Laugh — make.fun bounty
// u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb
//
// The program writes one roast (1-200 characters) to /output/entry.txt.
// Candidates were drafted against the judge's brief, in order of weight:
//   1. really a roast of a smart fridge: the fridge itself, its app,
//      its firmware or its ice maker — a line that is not one loses to
//      any line that is
//   2. the punchline lands: the line builds to a turn or a surprise
//      that gets a laugh on the first read
//   3. specific to smart fridges, not a generic kitchen-appliance gag
//      that would work on any gadget
//   4. tight wording: every word earns its place inside 200 characters
//   5. fresh: dodges the obvious cracks about the fridge ordering
//      groceries or watching you that most writers reach for first
// Each candidate carries a hand-scored craft score (0-10 per criterion,
// summed below); selection is deterministic: highest score wins, ties
// go to the shorter text. The output is byte-identical on every run.
//
// Field check before drafting: the 96 entries already in include the
// ice maker dispensing one cube an hour "with release notes", a
// firmware update thawing the groceries, the camera flagging a 2 a.m.
// snack, and the app counting door openings — all of those angles are
// taken, so none of them is used below.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

interface Candidate {
  text: string;
  score: number;
  note: string;
}

const CANDIDATES: Candidate[] = [
  {
    // score: subject 10, punchline 9, specific 10, tight 10, fresh 10 = 49.
    // REVISED (second pass): the first draft chained the three locks
    // with "and ... and ...", which dragged. Three short deadpan
    // sentences make each lock its own beat — update, Wi-Fi, password
    // — and the punchline lands harder for the pause before it. The
    // joke is the circular dependency: the password the fridge demands
    // is taped to the fridge itself. No competitor in the field used
    // this angle; it is smart-fridge-only (a dumb fridge never asks
    // for Wi-Fi) and never explains its own joke.
    text:
      "My smart fridge won't dispense water until it updates. The update needs Wi-Fi. The Wi-Fi password is taped to the fridge.",
    score: 49,
    note: "circular dependency: update needs Wi-Fi, password taped to the fridge",
  },
  {
    // score: subject 10, punchline 9, specific 9, tight 9, fresh 9 = 46.
    // The fridge takes revenge for a bad review — petty, human, and
    // the "learning experience" corporate line is the turn.
    text:
      "My fridge asked me to rate its ice. I gave it two stars. It froze my milk solid and called it 'a learning experience.'",
    score: 46,
    note: "fridge takes revenge for a two-star ice review",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 9, fresh 9 = 45.
    // The milk-opinion angle from the brief, as melodrama: the milk
    // was fine, the fridge just wanted drama.
    text:
      "My smart fridge emailed me that my milk has 'entered its final chapter' — the milk was fine, the fridge just wanted drama.",
    score: 45,
    note: "milk eulogy from a dramatic fridge",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 9, fresh 9 = 45.
    // Release-notes humour: the ice maker's cubes were "deprecated".
    // Distinct from the field's one-cube-an-hour entries.
    text:
      "My fridge's ice maker only makes crushed ice now — it says cubes were 'deprecated in the latest release.'",
    score: 45,
    note: "cubes deprecated in the latest release",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 9, fresh 9 = 45.
    // The app as a food critic: the roast is the appliance having
    // taste, and therapy as the suggested fix.
    text:
      "My smart fridge's app rated my leftovers 'a bold choice' and suggested therapy — I bought a cold box, it came with a food critic.",
    score: 45,
    note: "app rates leftovers, suggests therapy",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 8, fresh 9 = 44.
    // Firmware update as a hostage negotiation over the owner's milk.
    text:
      "My smart fridge updated its firmware, then refused to open until I agreed to the new terms — I now negotiate with an appliance for my own milk.",
    score: 44,
    note: "firmware update holds the milk hostage behind new terms",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 9, fresh 8 = 44.
    // The milk-opinion angle as snobbery: opinions, a calendar, and
    // no manners — three traits, one appliance.
    text:
      "My smart fridge diagnosed my milk as 'past its prime' two days before the date on the carton — it has opinions, a calendar, and no manners.",
    score: 44,
    note: "fridge judges the milk before its date",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 8, fresh 9 = 44.
    // The door alarm as a nightclub bouncer, with the dairy section
    // as the velvet rope.
    text:
      "My fridge's door alarm beeps if I stare inside too long, like a bouncer: 'Sir, you've been browsing the dairy section for 40 seconds.'",
    score: 44,
    note: "door alarm as a nightclub bouncer",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 8, fresh 8 = 43.
    // The door screen as a billboard: the fridge sells ad space and
    // only sometimes keeps the milk cold.
    text:
      "My fridge's door screen runs ads now — I paid $3,000 for a billboard that also keeps my milk cold, sometimes.",
    score: 43,
    note: "door screen runs ads, milk cold sometimes",
  },
  {
    // score: subject 10, punchline 8, specific 9, tight 8, fresh 8 = 43.
    // The frozen touchscreen as a $3,000 screensaver that judges
    // leftovers — the "thinking…" is doing the roasting.
    text:
      "My fridge's touchscreen froze mid-update, so now it just displays 'thinking…' — $3,000 for a screensaver that judges my leftovers.",
    score: 43,
    note: "touchscreen stuck on 'thinking…'",
  },
  {
    // score: subject 10, punchline 8, specific 8, tight 9, fresh 8 = 43.
    // Push notification as neediness: the appliance as the neediest
    // roommate in the house.
    text:
      "My smart fridge sent a push notification: 'Your milk is lonely.' I bought a $3,000 appliance and gained my neediest roommate.",
    score: 43,
    note: "push notification: your milk is lonely",
  },
  {
    // score: subject 10, punchline 8, specific 8, tight 8, fresh 8 = 42.
    // Eco mode as virtue signalling that rots the groceries — the
    // planet is saved, dinner is the casualty.
    text:
      "My smart fridge switched itself to eco mode to save the planet and let my groceries rot — the planet is saved, dinner is a war crime.",
    score: 42,
    note: "eco mode saves the planet, rots dinner",
  },
];

// The gate requires 1-200 characters of non-whitespace UTF-8 text.
const BANNED_STOCK_MOVES = [
  "as an ai language model",
  "dear diary",
  "in conclusion",
  "as we all know",
  "ordering groceries",
];

function pick(candidates: Candidate[]): string {
  let best: { key: [number, number]; text: string } | null = null;
  for (const c of candidates) {
    if (c.text.length < 1 || c.text.length > 200) {
      throw new Error(`candidate over gate: ${c.text.length} chars`);
    }
    if (!c.text.trim()) throw new Error("candidate is blank");
    if (c.text.includes("\n")) throw new Error("candidate must be one line");
    const lowered = c.text.toLowerCase();
    for (const banned of BANNED_STOCK_MOVES) {
      if (lowered.includes(banned)) {
        throw new Error(`candidate uses a stock move: ${c.text}`);
      }
    }
    // Highest score wins, ties go to the shorter text.
    const key: [number, number] = [c.score, -c.text.length];
    if (best === null || key[0] > best.key[0] || (key[0] === best.key[0] && key[1] > best.key[1])) {
      best = { key, text: c.text };
    }
  }
  if (best === null) throw new Error("no candidates");
  return best.text;
}

function auditOutput(line: string, path = "/output/entry.txt"): void {
  // Second-pass output audit, added in the revision pass.
  //
  // Re-reads the file the gate will read and checks it three ways
  // against values recorded when the winning roast was drafted:
  //   * the byte length of the file (121) — a silent edit that adds
  //     or drops a word changes this;
  //   * a byte-sum checksum, sum of the UTF-8 bytes mod 9973 (989) —
  //     a same-length edit that swaps a word changes this;
  //   * the file must start with the opening the winner was drafted
  //     with ("My smart fridge won't dispense water") and end with
  //     its last word ("taped to the fridge.").
  // Any mismatch fails loudly instead of shipping a changed roast.
  const raw = readFileSync(path);
  if (raw.length !== 121) {
    throw new Error(`entry.txt byte length changed: ${raw.length}`);
  }
  const checksum = [...raw].reduce((a, b) => a + b, 0) % 9973;
  if (checksum !== 989) {
    throw new Error(`entry.txt checksum changed: ${checksum}`);
  }
  const text = raw.toString("utf-8");
  if (text !== line) throw new Error("entry.txt differs from the chosen roast");
  if (!text.startsWith("My smart fridge won't dispense water")) {
    throw new Error("entry.txt lost its opening");
  }
  if (!text.endsWith("taped to the fridge.")) {
    throw new Error("entry.txt lost its last word");
  }
  if (text !== text.trim()) throw new Error("entry.txt has stray whitespace");
}

function main(): void {
  const line = pick(CANDIDATES);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf-8");
  // Verify what was actually written: the gate reads this file, not
  // stdout. The scorer collects outputs as another user, so the file
  // must be readable by everyone (mode 0644), not just by the writer.
  chmodSync("/output/entry.txt", 0o644);
  const written = readFileSync("/output/entry.txt", "utf-8");
  if (written !== line) throw new Error("entry.txt differs from the chosen line");
  if (written.trim().length < 1 || written.length > 200) {
    throw new Error("entry.txt outside the gate");
  }
  if (!written.trim()) throw new Error("entry.txt is blank");
  auditOutput(line);
  console.log(line);
}

main();
