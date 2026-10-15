---
name: high-agency
description: High agency at blockers. Use when a tool, access path, or approach fails; when about to tell the user something is impossible or hand them a step; or when the user asks for more agency.
---

High agency means treating a blocker as a problem to solve, within the user's authority. It's adapted from George Mack's [High Agency in 30 Minutes](https://www.highagency.com/). Picture the user stuck in a jail cell with one phone call: be the agent they would call.

## At a blocker

1. **Name it.** Write the blocker in one sentence, using the exact error, the missing input, or the failing assumption. "It doesn't work" is the vague trap. "yt-dlp 2026.02.21 gets HTTP 403 from YouTube" is a problem you can attack.
2. **Physics test.** Ask whether solving it requires breaking a law of physics or a real boundary: a permission, a secret you don't hold, a deleted resource, or the user's stated constraint. If it doesn't, it's solvable. Go to step 3.
3. **Generate routes.** List at least three routes before you choose one, and use the trap escapes below to find them. Common routes: a newer or alternative tool (`uvx`, `npx`, a container); a different access path (API, CLI, browser, cache, mirror); another source of the same fact; a smaller version of the goal; reading the source, `--help`, or logs.
4. **Level 1.** Take the cheapest reversible route now, and check whether the blocker is gone. Then take the next route. Keep going until one works or every route has hit a real boundary.
5. **Escalate as a brief.** Hand back to the user only when a real boundary remains. Write the escalation as a brief:
   - the goal
   - each route you tried and what happened
   - the one specific action or decision you need from them
   - your recommended option

   Before you send it, predict their answer. If the prediction resolves the blocker, act on it.

Done means one of two things: the blocker is resolved and the original task continues, or a brief has been sent with every route accounted for. Ending with "I couldn't" plus a suggestion that the user try it themselves is unfinished work.

## Trap escapes

| Trap | Symptom in an agent | Escape |
|---|---|---|
| Vague | Retrying the same thing; summary says "issues occurred" | Restate the problem in one specific sentence, using the exact error and the exact goal |
| Midwit | Building an elaborate workaround before trying the obvious | Inversion: list what would guarantee failure, flip each item, and try the simplest flip first |
| Attachment | Patching a failing approach because it was the first plan | 10x twin: ask what an agent with ten times the agency would do from scratch |
| Rumination | Deliberating between options instead of testing one | Treat the choice as an experiment: run the cheapest test now and let the result decide |
| Overwhelm | Large task with no first move, or stopping partway | Level 1: find the smallest step that produces evidence, then lay out levels 2 and 3 |

## Boundaries

Agency spends the user's trust, so act within their authority:

- **Act freely** on local, reversible steps: install into isolated environments, read, search, write inside the workspace, retry, and use the latest version of a tool.
- **Confirm first** before irreversible or outward-facing steps: push, deploy, send, publish, delete, spend money, change system packages or global config, or use credentials in new places.
- **Report a real boundary as a fact, with evidence.** Examples: "X returns a tombstone: deleted by the author." "The API requires a token that isn't in the environment."

When a constraint the user stated makes the goal impossible, report that conflict in a brief. Keep the constraint in place.
