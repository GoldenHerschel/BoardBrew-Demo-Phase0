/* =====================================================================
   BoardBrew site settings
   Change the values here. You don't need to touch functions.js.
   Anything marked FLAG is still waiting on info from BoardBrew.
   ===================================================================== */
const CONFIG = {
  timeZone: "Asia/Manila",

  // Store hours: open every day, holidays included.
  // Closing past midnight is written as 26:00 (= 2:00 AM the next day).
  hours: { open: "08:00", close: "26:00", label: "8:00 AM – 2:00 AM daily, holidays included" },

  reservations: {
    // "messenger": the form builds a message the customer sends to BoardBrew on Messenger. No server needed.
    // "api": the form POSTs the booking to apiUrl (see server.js). Use this once the site is hosted with a backend.
    mode: "messenger",
    apiUrl: "/api/reservations",
    messengerUrl: "https://m.me/boardbreww",
    leadHours: 2,          // must book at least this many hours ahead
    firstSlot: "08:00",    // earliest reservation time
    lastSlot: "24:00",     // latest reservation time (24:00 = 12:00 midnight)
    slotMinutes: 30,
    maxGroup: 12,
  },

  // Shown on the Policies page (policies.html). Empty values show as "To confirm" until filled in.
  business: {
    name: "BoardBrew",
    legalName: "",         // FLAG: registered business name (DTI/SEC), if different from "BoardBrew"
  },
  privacy: {
    contactName: "",       // FLAG: person responsible for privacy requests (often the owner)
    contactEmail: "boardbrew.wcmc@gmail.com",
    retentionDays: 30,     // FLAG: confirm. Booking details are deleted this many days after the booking date.
    lastUpdated: "November 9, 2026",
  },
  reservationPolicy: {
    graceMinutes: "",      // FLAG: how long a table is held after the booking time, e.g. "15"
    cancellation: "",      // FLAG: e.g. "Please cancel at least 1 hour before your booking."
    deposit: "",           // FLAG: e.g. "No deposit needed." or the deposit rule
  },

  contact: {
    address: ["2F Providence Tower", "Manila, Philippines"],
    phone: "+63 921 442 5656",
    email: "boardbrew.wcmc@gmail.com",
  },

  // Leave a link empty ("") to hide its button.
  links: {
    facebook: "https://www.facebook.com/boardbreww",
    reviews: "https://www.facebook.com/boardbreww/reviews",
    instagram: "https://www.instagram.com/boardbrew.wcmc",
    tiktok: "",            // FLAG: TikTok link from BoardBrew
    foodpanda: "https://foodpanda.go.link/d3JZw",
    grab: "",              // FLAG: GrabFood link from BoardBrew
    orderOnline: "https://utak.io/store/boardbrew",
  },
};
