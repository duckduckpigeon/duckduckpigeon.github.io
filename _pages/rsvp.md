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
  .event-heading {
    margin: 1.5em 0 0.5em;
    font-size: 1.1em;
  }
  .event-heading:first-child {
    margin-top: 0;
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
      <div id="dinner-section" style="display:none;">
        <h4 class="event-heading">Welcome Dinner (Friday)</h4>
        <div id="dinner-guest-list"></div>
      </div>
      <h4 id="wedding-heading" class="event-heading" style="display:none;">Wedding Celebration (Saturday)</h4>
      <div id="guest-list"></div>
      <button type="submit" id="submit-btn" class="rsvp-btn">Submit RSVP</button>
    </form>
    <div id="submit-error" class="rsvp-error"></div>
  </div>

  <div id="confirmation-section" style="display:none;">
    <div class="confirmation-box">
      <h3 style="margin-top:0;">Thanks for your RSVP!</h3>
      <div id="confirmation-message"></div>
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

  function renderGuestSection(containerEl, guests, namePrefix, existingRsvp, plusOnes, existingPlusOneNames) {
    containerEl.innerHTML = "";
    guests.forEach(guest => {
      const existing = existingRsvp ? existingRsvp[guest] : undefined;
      const isPlusOneEligible = (plusOnes || []).includes(guest);
      const existingPlusOneName = (existingPlusOneNames && existingPlusOneNames[guest]) || "";
      const radioName = `${namePrefix}-${guest}`;

      const div = document.createElement("div");
      div.className = "guest-card";
      div.innerHTML = `
        <div class="guest-main-row">
          <strong>${guest}</strong>
          <div class="guest-radio-group">
            <label><input type="radio" name="${radioName}" value="yes" ${existing === true ? "checked" : ""}/> Attending</label>
            <label><input type="radio" name="${radioName}" value="no" ${existing === false ? "checked" : ""}/> Not attending</label>
          </div>
        </div>
        ${isPlusOneEligible ? `
        <div class="plus-one-row" data-guest="${guest}" style="display:${existing === true ? "flex" : "none"};">
          <label><input type="checkbox" class="plus-one-checkbox" ${existingPlusOneName ? "checked" : ""}/> Bringing a guest</label>
          <input type="text" class="plus-one-name" placeholder="Guest's name" value="${existingPlusOneName}" data-edited="${existingPlusOneName ? "true" : "false"}" style="display:${existingPlusOneName ? "inline-block" : "none"};" />
        </div>` : ""}
      `;
      containerEl.appendChild(div);

      if (isPlusOneEligible) {
        const plusOneRow = div.querySelector(".plus-one-row");
        const checkbox = div.querySelector(".plus-one-checkbox");
        const nameInput = div.querySelector(".plus-one-name");

        function resetNameInput() {
          /* Only clear the "edited" flag if the field was already empty — a name
             that was typed (or saved from before) stays protected from being
             silently overwritten if the box gets rechecked. */
          if (!nameInput.value) {
            nameInput.dataset.edited = "false";
          }
          nameInput.value = "";
        }

        div.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
          radio.addEventListener("change", () => {
            plusOneRow.style.display = radio.value === "yes" && radio.checked ? "flex" : plusOneRow.style.display;
            if (radio.value === "no" && radio.checked) {
              plusOneRow.style.display = "none";
              checkbox.checked = false;
              nameInput.style.display = "none";
              resetNameInput();
            }
          });
        });

        checkbox.addEventListener("change", () => {
          nameInput.style.display = checkbox.checked ? "inline-block" : "none";
          if (!checkbox.checked) resetNameInput();
        });
      }
    });
  }

  function linkPlusOneInputs(guest) {
    const weddingRow = document.querySelector(`#guest-list .plus-one-row[data-guest="${guest}"]`);
    const dinnerRow = document.querySelector(`#dinner-guest-list .plus-one-row[data-guest="${guest}"]`);
    if (!weddingRow || !dinnerRow) return;

    const weddingInput = weddingRow.querySelector(".plus-one-name");
    const dinnerInput = dinnerRow.querySelector(".plus-one-name");
    const weddingCheckbox = weddingRow.querySelector(".plus-one-checkbox");
    const dinnerCheckbox = dinnerRow.querySelector(".plus-one-checkbox");

    function sync(source, target) {
      if (target.dataset.edited !== "true") target.value = source.value;
    }

    weddingInput.addEventListener("input", () => {
      weddingInput.dataset.edited = "true";
      sync(weddingInput, dinnerInput);
    });
    dinnerInput.addEventListener("input", () => {
      dinnerInput.dataset.edited = "true";
      sync(dinnerInput, weddingInput);
    });

    /* A freshly (re)checked box has nothing typed into it yet to trigger the
       mirroring above, so pull in the other field's value on check too. */
    weddingCheckbox.addEventListener("change", () => {
      if (weddingCheckbox.checked) sync(dinnerInput, weddingInput);
    });
    dinnerCheckbox.addEventListener("change", () => {
      if (dinnerCheckbox.checked) sync(weddingInput, dinnerInput);
    });
  }

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

    function spawnImagesWithin(rect, count, verticalExpand = 0) {
      const top = rect.top - rect.height * verticalExpand;
      const height = rect.height * (1 + 2 * verticalExpand);
      for (let i = 0; i < count; i++) {
        spawnImage(rect.left + Math.random() * rect.width, top + Math.random() * height);
      }
    }

    const nameSearchRect = document.getElementById("name-search").getBoundingClientRect();
    const searchBtnRect = document.getElementById("search-btn").getBoundingClientRect();

    spawnImagesWithin(nameSearchRect, 32);
    spawnImagesWithin(searchBtnRect, 32);

    setTimeout(() => {
      spawnImagesWithin(nameSearchRect, 32, 1.5);
      spawnImagesWithin(searchBtnRect, 32, 1.5);
    }, 150);

    setTimeout(() => {
      spawnImagesWithin(nameSearchRect, 32, 4);
      spawnImagesWithin(searchBtnRect, 32, 4);
    }, 250);

    document.getElementById("group-greeting").textContent = `We found your invitation: ${data.name}`;
    document.getElementById("already-submitted").style.display = data.submitted ? "block" : "none";

    const hasDinner = !!data.welcomeDinner;
    document.getElementById("dinner-section").style.display = hasDinner ? "block" : "none";
    document.getElementById("wedding-heading").style.display = hasDinner ? "block" : "none";

    if (hasDinner) {
      renderGuestSection(document.getElementById("dinner-guest-list"), data.guests || [], "dinner", data.dinnerRsvp, data.plusOnes, data.dinnerPlusOneNames);
    }
    renderGuestSection(document.getElementById("guest-list"), data.guests || [], "wedding", data.rsvp, data.plusOnes, data.plusOneNames);

    if (hasDinner) {
      (data.plusOnes || []).forEach(linkPlusOneInputs);
    }

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
    const hasDinner = !!data.welcomeDinner;

    function collectResponses(containerEl, namePrefix, plusOnes) {
      const rsvp = {};
      const plusOneNames = {};
      for (const guest of data.guests) {
        const selected = containerEl.querySelector(`input[name="${namePrefix}-${guest}"]:checked`);
        if (!selected) return null;
        rsvp[guest] = selected.value === "yes";

        if (rsvp[guest] && (plusOnes || []).includes(guest)) {
          const checkbox = containerEl.querySelector(`.plus-one-row[data-guest="${guest}"] .plus-one-checkbox`);
          const nameInput = containerEl.querySelector(`.plus-one-row[data-guest="${guest}"] .plus-one-name`);
          if (checkbox && checkbox.checked && nameInput.value.trim()) {
            plusOneNames[guest] = nameInput.value.trim();
          }
        }
      }
      return { rsvp, plusOneNames };
    }

    const weddingResult = collectResponses(document.getElementById("guest-list"), "wedding", data.plusOnes);
    const dinnerResult = hasDinner
      ? collectResponses(document.getElementById("dinner-guest-list"), "dinner", data.plusOnes)
      : { rsvp: {}, plusOneNames: {} };

    if (!weddingResult || !dinnerResult) {
      errorEl.textContent = "Please select attending or not attending for each person.";
      errorEl.style.display = "block";
      errorEl.classList.remove("shake");
      void errorEl.offsetWidth;
      errorEl.classList.add("shake");
      return;
    }

    const { rsvp, plusOneNames } = weddingResult;
    const dinnerRsvp = dinnerResult.rsvp;
    const dinnerPlusOneNames = dinnerResult.plusOneNames;

    const updatePayload = {
      rsvp,
      plusOneNames,
      submitted: true,
      submittedAt: serverTimestamp()
    };
    const historyEntry = { rsvp, plusOneNames, submittedAt: new Date() };
    if (hasDinner) {
      updatePayload.dinnerRsvp = dinnerRsvp;
      updatePayload.dinnerPlusOneNames = dinnerPlusOneNames;
      historyEntry.dinnerRsvp = dinnerRsvp;
      historyEntry.dinnerPlusOneNames = dinnerPlusOneNames;
    }
    updatePayload.history = arrayUnion(historyEntry);

    try {
      await updateDoc(doc(db, "groups", currentGroupDoc.id), updatePayload);
    } catch (err) {
      console.error("RSVP submit failed:", err);
      errorEl.textContent = "Something went wrong submitting your RSVP. Please try again or contact us directly.";
      errorEl.style.display = "block";
      errorEl.classList.remove("shake");
      void errorEl.offsetWidth;
      errorEl.classList.add("shake");
      return;
    }

    const joinNames = names => names.length < 2 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

    let dinnerMsg = "";
    if (hasDinner) {
      const dinnerAttending = data.guests.filter(g => dinnerRsvp[g]);
      const dinnerNotAttending = data.guests.filter(g => !dinnerRsvp[g]);
      if (dinnerAttending.length) dinnerMsg += `For the welcome dinner: ${joinNames(dinnerAttending)} will be attending. `;
      if (dinnerNotAttending.length) dinnerMsg += `${joinNames(dinnerNotAttending)} will not be attending the dinner. `;
      for (const [guest, plusOneName] of Object.entries(dinnerPlusOneNames)) {
        dinnerMsg += `${guest} is bringing ${plusOneName} to the dinner. `;
      }
    }

    let weddingMsg = "";
    const attending = data.guests.filter(g => rsvp[g]);
    const notAttending = data.guests.filter(g => !rsvp[g]);
    if (attending.length) weddingMsg += `For the wedding: ${joinNames(attending)} will be attending. `;
    if (notAttending.length) weddingMsg += `${joinNames(notAttending)} will not be attending. `;
    for (const [guest, plusOneName] of Object.entries(plusOneNames)) {
      weddingMsg += `${guest} is bringing ${plusOneName} to the wedding. `;
    }

    const messageEl = document.getElementById("confirmation-message");
    messageEl.innerHTML = "";
    [dinnerMsg, weddingMsg].forEach(text => {
      if (!text) return;
      const p = document.createElement("p");
      p.textContent = text.trim();
      messageEl.appendChild(p);
    });
    document.getElementById("rsvp-section").style.display = "none";
    document.getElementById("confirmation-section").style.display = "block";

    for (let i = 0; i < 32; i++) {
      spawnImage(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      popfunc(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    }

    setTimeout(() => {
      for (let i = 0; i < 64; i++) {
        spawnImage(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      }
    }, 250);

    setTimeout(() => {
      for (let i = 0; i < 64; i++) {
        spawnImage(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      }
    }, 400);

    setTimeout(() => {
      for (let i = 0; i < 32; i++) {
        spawnImage(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      }
    }, 500);
  });
</script>
