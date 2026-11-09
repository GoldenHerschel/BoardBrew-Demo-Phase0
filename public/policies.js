/* Fills the Policies page from config.js, so details only live in one place.
   Empty settings show a "To confirm" marker until BoardBrew provides them. */
(() => {
  const pad = (n) => String(n).padStart(2, "0");
  const toMin = (hm) => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
  const fmtMin = (min) => {
    const m = ((min % 1440) + 1440) % 1440, h = Math.floor(m / 60);
    return m === 0 ? "12:00 midnight" : `${h % 12 || 12}:${pad(m % 60)} ${h < 12 ? "AM" : "PM"}`;
  };
  const R = CONFIG.reservations;
  const derived = {
    "reservations.window": `${fmtMin(toMin(R.firstSlot))} to ${fmtMin(toMin(R.lastSlot))}`,
    "contact.address": CONFIG.contact.address.join(", "),
  };
  const get = (path) => path in derived ? derived[path] : path.split(".").reduce((o, k) => (o == null ? o : o[k]), CONFIG);

  document.querySelectorAll("[data-cfg]").forEach((el) => {
    let v = get(el.dataset.cfg);
    if ((v === "" || v == null) && el.dataset.fallback) v = get(el.dataset.fallback);
    if (v === "" || v == null) {
      el.innerHTML = '<mark class="flag">To confirm</mark>';
    } else {
      el.textContent = v;
    }
  });

  // Show the paragraph that matches how bookings are handled right now.
  document.querySelectorAll("[data-mode]").forEach((el) => (el.hidden = el.dataset.mode !== R.mode));
})();
