# BoardBrew website

Board game café site for BoardBrew, Manila. Built on `dev-2_menu` (the split structure plus the real menu).

## How it runs

- **GitHub Pages (default):** `index.html` at the repo root is ready to serve. No server needed.
- **Reservations go through Messenger** for now: the form checks the rules, builds a message, and the customer sends it to BoardBrew.
- **Later, if BoardBrew wants bookings stored online:** set `reservations.mode` to `"api"` in `public/config.js` and host `server.js` (see the notes at the top of that file). The page falls back to Messenger if the server is down.

## Where to change things

| To change… | Edit |
| --- | --- |
| Hours, booking rules, phone, email, social and delivery links | `public/config.js` |
| Games, menu, events | `public/data.js` |
| Page text and layout of a section | `views/<section>.html`, then run `node build.js` |
| Colors and styles | `public/styles.css` |
| How things work | `public/functions.js` |

`index.html` is generated. **Don't edit it by hand**: edit `views/`, then run `node build.js` (Node, no installs).

A link left empty (`""`) in `config.js` hides its button.

## Business rules (from BoardBrew)

- Open 8:00 AM – 2:00 AM daily, holidays included.
- Reservations from 8:00 AM to 12:00 midnight, at least 2 hours ahead, groups of 1–12+.
- Times follow Manila time, whatever the visitor's device is set to.
- Fried rice: +₱20 to upgrade, +₱30 for an extra serving.

## Testing at any time of day (QA)

Add `?now=YYYY-MM-DDTHH:MM` to the address to pretend it's that time. An orange bar shows while the test clock is on.

| Address ends with | Expect |
| --- | --- |
| `?now=2026-11-09T09:10` | Earliest time today is 11:30 AM |
| `?now=2026-11-09T21:30` | Only 12:00 midnight left today |
| `?now=2026-11-09T22:30` | Date jumps to tomorrow, 8:00 AM |
| `?now=2026-11-10T01:00` | Visit says "Open now" |
| `?now=2026-11-10T03:00` | Visit says "Closed · opens 8:00 AM" |

## Still needed from BoardBrew (FLAG)

- [ ] TikTok link → `config.js` `links.tiktok`
- [ ] GrabFood link, if they're on Grab → `config.js` `links.grab`
- [ ] What the Pawn and Queen drink sizes are (e.g. 12 oz / 16 oz)
- [ ] Play rates and house rules
- [ ] Three reviews to quote (first names only)
- [ ] Real events → `data.js` `EVENTS_REAL` (sample events disappear once one is added)
