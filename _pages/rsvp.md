---
layout: archive
title: "RSVP"
permalink: /rsvp/
author_profile: true
---

<style>
  .rsvp-notice {
    font-style: italic;
    color: #7a8288;
    margin-bottom: 1.5em;
  }
  .rsvp-search-row {
    display: flex;
    gap: 0.5em;
    margin-bottom: 0.5em;
  }
  #name-search {
    flex: 1;
    height: 40px;
    padding: 0 0.75em;
    font-size: 16px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .rsvp-btn {
    height: 40px;
    padding: 0 1.25em;
    font-size: 16px;
    background: #418aa0;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .rsvp-btn:hover { background: #316878; }
  .rsvp-error {
    color: #ee5f5b;
    font-size: 0.9em;
    margin-top: 0.25em;
    display: none;
  }
  @keyframes rsvp-shake {
    0%   { transform: translateX(0); }
    20%  { transform: translateX(-6px); }
    40%  { transform: translateX(6px); }
    60%  { transform: translateX(-4px); }
    80%  { transform: translateX(4px); }
    100% { transform: translateX(0); }
  }
  .rsvp-error.shake { animation: rsvp-shake 0.35s ease; }
  .guest-card {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 1em 1.25em;
    margin-bottom: 0.75em;
  }
  .guest-main-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75em;
  }
  .guest-card strong {
    font-size: 1.05em;
  }
  .guest-radio-group {
    display: flex;
    gap: 1.25em;
  }
  .guest-radio-group label {
    display: flex;
    align-items: center;
    gap: 0.35em;
    cursor: pointer;
    font-size: 0.95em;
    margin: 0;
  }
  .guest-radio-group input[type="radio"] {
    margin: 0;
  }
  .plus-one-row {
    margin-top: 0.75em;
    padding-top: 0.75em;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 0.75em;
    flex-wrap: wrap;
  }
  .plus-one-row label {
    display: flex;
    align-items: center;
    gap: 0.35em;
    cursor: pointer;
    font-size: 0.9em;
    margin: 0;
  }
  .plus-one-name {
    flex: 1;
    min-width: 160px;
    height: 34px;
    padding: 0 0.6em;
    font-size: 14px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    box-sizing: border-box;
  }
  #submit-btn {
    margin-top: 0.5em;
  }
  .confirmation-box {
    border: 1px solid #c8e6c9;
    background: #f1f8f1;
    border-radius: 6px;
    padding: 1.25em 1.5em;
  }
</style>

<p class="rsvp-notice">Our RSVP portal is coming soon — check back later!</p>

<div id="rsvp-app">
  <div id="search-section">
    <p>Search for your name to find your invitation.</p>
    <div class="rsvp-search-row">
      <input type="text" id="name-search" placeholder="e.g. Jeff Cash" autocomplete="off" />
      <button id="search-btn" class="rsvp-btn">Search</button>
    </div>
    <div id="search-error" class="rsvp-error"></div>
  </div>

  <div id="rsvp-section" style="display:none;">
    <h3 id="group-greeting"></h3>
    <div id="already-submitted" style="display:none; background:#fff8e1; border:1px solid #ffe082; border-radius:6px; padding:0.6em 1em; margin-bottom:1em; font-size:0.95em;">
      You've already RSVPed — your responses are shown below. Feel free to make changes and resubmit.
    </div>
    <p>Please indicate who will be attending:</p>
    <form id="rsvp-form">
      <div id="guest-list"></div>
      <button type="submit" id="submit-btn" class="rsvp-btn">Submit RSVP</button>
    </form>
    <div id="submit-error" class="rsvp-error"></div>
  </div>

  <div id="confirmation-section" style="display:none;">
    <div class="confirmation-box">
      <h3 style="margin-top:0;">Thanks for your RSVP!</h3>
      <p id="confirmation-message"></p>
      <p style="margin-bottom:0;">Can't wait to celebrate with you. See you September 5th!</p>
    </div>
  </div>
</div>

<script>
  document.getElementById("name-search").addEventListener("keydown", () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    popfunc(x, y);
  });
</script>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getFirestore, collection, getDocs, doc, updateDoc, serverTimestamp, arrayUnion } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDCJHXp8o6-sNXZnBwtIL5YQkwziqIJ5B8",
    authDomain: "duckduckpigeon-d4628.firebaseapp.com",
    projectId: "duckduckpigeon-d4628",
    storageBucket: "duckduckpigeon-d4628.firebasestorage.app",
    messagingSenderId: "901682542598",
    appId: "1:901682542598:web:65f9f9c506f9e28577ab87"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let currentGroupDoc = null;

  async function doSearch() {
    const query = document.getElementById("name-search").value.trim().toLowerCase();
    const errorEl = document.getElementById("search-error");
    errorEl.style.display = "none";

    if (!query) return;

    const queryWords = query.split(" ").filter(w => w.length > 0);
    const queryLastName = queryWords[queryWords.length - 1];
    const queryFirstPart = queryWords.slice(0, -1).join(" ");

    if (queryWords.length < 2 || queryFirstPart.length < 2) {
      errorEl.textContent = "Please enter your first and last name (e.g. \"Jeff Cash\").";
      errorEl.style.display = "block";
      errorEl.classList.remove("shake");
      void errorEl.offsetWidth;
      errorEl.classList.add("shake");
      return;
    }

    const snapshot = await getDocs(collection(db, "groups"));
    const match = snapshot.docs.find(d => {
      const guests = (d.data().guests || []).map(g => g.toLowerCase());
      const nicknames = (d.data().nicknames || []).map(n => n.toLowerCase());
      return guests.concat(nicknames).some(guest => {
        const guestWords = guest.split(" ");
        const guestLastName = guestWords[guestWords.length - 1];
        const guestFirstName = guestWords.slice(0, -1).join(" ");
        const prefixLen = Math.min(queryFirstPart.length, 3);
        return guestLastName === queryLastName &&
               guestFirstName.slice(0, prefixLen) === queryFirstPart.slice(0, prefixLen);
      });
    });

    if (!match) {
      errorEl.textContent = "No group found. Try a different name or contact us directly.";
      errorEl.style.display = "block";
      errorEl.classList.remove("shake");
      void errorEl.offsetWidth;
      errorEl.classList.add("shake");
      return;
    }

    currentGroupDoc = match;
    const data = match.data();

    document.getElementById("group-greeting").textContent = `We found your invitation: ${data.name}`;
    document.getElementById("already-submitted").style.display = data.submitted ? "block" : "none";

    const guestList = document.getElementById("guest-list");
    guestList.innerHTML = "";
    (data.guests || []).forEach(guest => {
      const existing = data.rsvp ? data.rsvp[guest] : undefined;
      const isPlusOneEligible = (data.plusOnes || []).includes(guest);
      const existingPlusOneName = (data.plusOneNames && data.plusOneNames[guest]) || "";

      const div = document.createElement("div");
      div.className = "guest-card";
      div.innerHTML = `
        <div class="guest-main-row">
          <strong>${guest}</strong>
          <div class="guest-radio-group">
            <label><input type="radio" name="${guest}" value="yes" ${existing === true ? "checked" : ""}/> Attending</label>
            <label><input type="radio" name="${guest}" value="no" ${existing === false ? "checked" : ""}/> Not attending</label>
          </div>
        </div>
        ${isPlusOneEligible ? `
        <div class="plus-one-row" data-guest="${guest}" style="display:${existing === true ? "flex" : "none"};">
          <label><input type="checkbox" class="plus-one-checkbox" ${existingPlusOneName ? "checked" : ""}/> Bringing a guest</label>
          <input type="text" class="plus-one-name" placeholder="Guest's name" value="${existingPlusOneName}" style="display:${existingPlusOneName ? "inline-block" : "none"};" />
        </div>` : ""}
      `;
      guestList.appendChild(div);

      if (isPlusOneEligible) {
        const plusOneRow = div.querySelector(".plus-one-row");
        const checkbox = div.querySelector(".plus-one-checkbox");
        const nameInput = div.querySelector(".plus-one-name");

        div.querySelectorAll(`input[name="${guest}"]`).forEach(radio => {
          radio.addEventListener("change", () => {
            plusOneRow.style.display = radio.value === "yes" && radio.checked ? "flex" : plusOneRow.style.display;
            if (radio.value === "no" && radio.checked) {
              plusOneRow.style.display = "none";
              checkbox.checked = false;
              nameInput.style.display = "none";
              nameInput.value = "";
            }
          });
        });

        checkbox.addEventListener("change", () => {
          nameInput.style.display = checkbox.checked ? "inline-block" : "none";
          if (!checkbox.checked) nameInput.value = "";
        });
      }
    });

    document.getElementById("search-section").style.display = "none";
    document.getElementById("rsvp-section").style.display = "block";
  }

  document.getElementById("search-btn").addEventListener("click", doSearch);
  document.getElementById("name-search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });

  document.getElementById("rsvp-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById("submit-error");
    errorEl.style.display = "none";

    const data = currentGroupDoc.data();
    const rsvp = {};
    const plusOneNames = {};
    let allAnswered = true;

    for (const guest of data.guests) {
      const selected = document.querySelector(`input[name="${guest}"]:checked`);
      if (!selected) { allAnswered = false; break; }
      rsvp[guest] = selected.value === "yes";

      if (rsvp[guest] && (data.plusOnes || []).includes(guest)) {
        const checkbox = document.querySelector(`.plus-one-row[data-guest="${guest}"] .plus-one-checkbox`);
        const nameInput = document.querySelector(`.plus-one-row[data-guest="${guest}"] .plus-one-name`);
        if (checkbox && checkbox.checked && nameInput.value.trim()) {
          plusOneNames[guest] = nameInput.value.trim();
        }
      }
    }

    if (!allAnswered) {
      errorEl.textContent = "Please select attending or not attending for each person.";
      errorEl.style.display = "block";
      errorEl.classList.remove("shake");
      void errorEl.offsetWidth;
      errorEl.classList.add("shake");
      return;
    }

    await updateDoc(doc(db, "groups", currentGroupDoc.id), {
      rsvp,
      plusOneNames,
      submitted: true,
      submittedAt: serverTimestamp(),
      history: arrayUnion({ rsvp, plusOneNames, submittedAt: new Date() })
    });

    const attending = data.guests.filter(g => rsvp[g]);
    const notAttending = data.guests.filter(g => !rsvp[g]);
    let msg = "";
    const joinNames = names => names.length < 2 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
    if (attending.length) msg += `${joinNames(attending)} will be attending. `;
    if (notAttending.length) msg += `${joinNames(notAttending)} will not be attending. `;
    for (const [guest, plusOneName] of Object.entries(plusOneNames)) {
      msg += `${guest} is bringing ${plusOneName}. `;
    }

    document.getElementById("confirmation-message").textContent = msg;
    document.getElementById("rsvp-section").style.display = "none";
    document.getElementById("confirmation-section").style.display = "block";
  });
</script>
