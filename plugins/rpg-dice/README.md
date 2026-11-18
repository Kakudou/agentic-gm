# agentic-gm RPG dice — native OpenCode 2 plugin

A **V2 OpenCode local plugin**, not an MCP server. It registers one in-process tool, `rpg_dice`, that rolls genuine dice from Node `crypto.randomInt()` and returns an audit receipt. There is no process, network call, database, persisted state, or script command during play.

agentic-gm is a gamemaster-only installation: the tool is always available. It never decides game outcomes and never writes files.

## Layout

- `index.js` — the OpenCode V2 plugin: registers the tool and supplies `crypto.randomInt()`.
- `core/rpg-dice.js` — the host-free engine: input validation, faces, totals, receipt.
- `test/` — `npm test` runs the Node tests.

## Use

The Scribe calls `rpg_dice({ count: 9, sides: 6, purpose: 'Perception + Intuition' })` after the player's pre-roll decisions (Edge, Effort, …) are confirmed, and writes the unaltered receipt to `mechanics.md`.

## Output

Example *schema only* — these faces are illustrative, NOT a real invocation receipt:

```json
{"receipt":"roll-abc0123400ffbeef","notation":"4d6","purpose":"Stealth + Agility","faces":[1,5,2,6],"total":14,"ones":1,"provider":"host-csprng","hits_5_6":2}
```

For a `1d20`, the result also includes `natural`. The plugin never calculates rule-dependent success, opposed outcomes, glitches, Edge spending or intrusion costs; those belong to the active game's rules skill.

## Constraints

- Secure CSPRNG, unbiased integer faces.
- Count 1–200, sides 2–1000, purpose non-empty and ≤120 characters; input and RNG draws validated.
- An error is never converted into an invented result.
- No automatic persistence: the Scribe writes receipts through ordinary file tools.
