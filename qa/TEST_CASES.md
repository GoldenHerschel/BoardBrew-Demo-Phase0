# QA 1 test cases

Tested on branch `Dev1` (with QA 1 fixes), November 25, 2026. Chrome, desktop (1280 px) and phone (375 px).
Times use the test clock: add `?now=YYYY-MM-DDTHH:MM` to the address.
✅ automated = covered by `tests/rules.test.js` (run `node --test`).

## Player filter

| ID | Steps | Expected | Result |
| --- | --- | --- | --- |
| PF-01 | Players: Any | All 128 games | ✅ Pass (automated) |
| PF-02 | Players: 4 | Only games for 4; count shows “114 of 128 games for 4 players” | ✅ Pass |
| PF-03 | Players: 12+ | Only games for 12 or more (11 games) | ✅ Pass (automated) |
| PF-04 | Players: 1 | Solo games show, e.g. Rubik's Cubes | ✅ Pass (automated) |
| PF-05 | Search “zzzz” | “No games match” message | ✅ Pass |
| PF-06 | Check all game data | Every game has min ≥ 1 and max ≥ min | ✅ Pass (automated) |

## Booking times

| ID | Steps | Expected | Result |
| --- | --- | --- | --- |
| BT-01 | `?now=2026-11-25T09:00` | Earliest time is 11:00 AM (exactly 2 hours) | ✅ Pass after fix (was 11:30 AM) |
| BT-02 | `?now=2026-11-25T09:10` | Earliest time is 11:30 AM | ✅ Pass |
| BT-03 | Book 11:00 AM at 9:01 | Refused, too soon | ✅ Pass (automated) |
| BT-04 | Times offered | 8:00 AM to 12:00 midnight only | ✅ Pass (automated) |
| BT-05 | `?now=2026-11-25T22:00` | 12:00 midnight still allowed | ✅ Pass (automated) |
| BT-06 | `?now=2026-11-25T22:30` | Date jumps to the next day | ✅ Pass |
| BT-07 | Phone “123” | Error asks for a valid PH number | ✅ Pass |
| BT-08 | Valid form | Messenger message appears | ✅ Pass |

## Large group note (8+)

| ID | Steps | Expected | Result |
| --- | --- | --- | --- |
| GN-01 | Group size 7 | No note | ✅ Pass |
| GN-02 | Group size 8 | “Groups of 8+…” note | ✅ Pass |
| GN-03 | Group size 12+ | Same note | ✅ Pass |

## Reviews

| ID | Steps | Expected | Result |
| --- | --- | --- | --- |
| RV-01 | Open Reviews | 3 real reviews, no grey placeholders | ✅ Pass |
| RV-02 | Check names | First names only (Liam, AJ, Czir) | ✅ Pass |

## Visit

| ID | Steps | Expected | Result |
| --- | --- | --- | --- |
| VS-01 | Address | Full address and a Google Maps link | ✅ Pass |
| VS-02 | Phone and email | Tap to call (`tel:`) and tap to email (`mailto:`) | ✅ Pass |
| VS-03 | `?now=2026-11-25T09:00` | “Open now · closes 2:00 AM” | ✅ Pass |
| VS-04 | Games note | Shows once, in the Games section | ✅ Pass after fix (was shown twice) |

## Policies page

| ID | Steps | Expected | Result |
| --- | --- | --- | --- |
| PO-01 | Reservation policy | 20-minute hold, cancel 1 hour before, no deposit | ✅ Pass |
| PO-02 | Privacy notice | Food allergies allowed in notes, other health info not | ✅ Pass after fix |
| PO-03 | “To confirm” markers | None | ❌ 1 left: privacy contact is empty. BoardBrew gave “Charisse Custodio”, needs adding to `config.js` |
| PO-04 | Phone width (375 px) | No sideways scrolling | ✅ Pass |

## Bugs found

| ID | Bug | Status |
| --- | --- | --- |
| BUG-01 | Booking exactly 2 hours ahead was refused (seconds on the clock) | Fixed (`public/rules.js`) |
| BUG-02 | README said 11:10 AM was bookable; slots are every 30 minutes | Fixed |
| BUG-03 | Page said “up to 7 days ahead” but didn't enforce it; BoardBrew's “7 days” was read by Dev 2 as how long bookings are kept | Removed the claim; uses Dev 2's reading |
| BUG-04 | Games note shown twice | Fixed |
| BUG-05 | `index.html` not rebuilt after view changes | Fixed |
| BUG-06 | Dev 1 and Dev 2 branches conflicted in `config.js` and `reserve.html` | Fixed: they now merge cleanly |
| BUG-07 | Privacy contact missing (“To confirm”) | Open: add Charisse Custodio |
