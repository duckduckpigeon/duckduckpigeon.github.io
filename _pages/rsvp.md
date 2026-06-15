---
layout: archive
title: "RSVP"
permalink: /rsvp/
author_profile: true
---

<p><em>Our RSVP portal is coming soon — check back later!</em></p>

<div id="rsvp-app">
  <div id="search-section">
    <p>Search for your name to find your invitation.</p>
    <input type="text" id="name-search" placeholder="Enter your last name..." autocomplete="off" />
    <button id="search-btn">Search</button>
    <div id="search-error" style="display:none; color:red; margin-top:0.5em;"></div>
  </div>

  <div id="rsvp-section" style="display:none;">
    <h3 id="group-greeting"></h3>
    <p>Please indicate who will be attending:</p>
    <form id="rsvp-form">
      <div id="guest-list"></div>
      <br/>
      <button type="submit" id="submit-btn">Submit RSVP</button>
    </form>
    <div id="submit-error" style="display:none; color:red; margin-top:0.5em;"></div>
  </div>

  <div id="confirmation-section" style="display:none;">
    <h3>Thanks for your RSVP!</h3>
    <p id="confirmation-message"></p>
    <p>Can't wait to celebrate with you. See you September 5th!</p>
  </div>
</div>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getFirestore, collection, getDocs, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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

    if (queryWords.length < 2 || queryFirstPart.length < 3) {
      errorEl.textContent = "Please enter your first and last name (e.g. \"Jeff Cash\").";
      errorEl.style.display = "block";
      return;
    }

    const snapshot = await getDocs(collection(db, "groups"));
    const match = snapshot.docs.find(d => {
      const guests = (d.data().guests || []).map(g => g.toLowerCase());
      return guests.some(guest => {
        const guestWords = guest.split(" ");
        const guestLastName = guestWords[guestWords.length - 1];
        const guestFirstName = guestWords.slice(0, -1).join(" ");
        return guestLastName === queryLastName && guestFirstName.startsWith(queryFirstPart);
      });
    });

    if (!match) {
      errorEl.textContent = "No group found. Try a different name or contact us directly.";
      errorEl.style.display = "block";
      return;
    }

    currentGroupDoc = match;
    const data = match.data();

    document.getElementById("group-greeting").textContent = `We found your invitation: ${data.name}`;

    const guestList = document.getElementById("guest-list");
    guestList.innerHTML = "";
    (data.guests || []).forEach(guest => {
      const existing = data.rsvp ? data.rsvp[guest] : undefined;
      const div = document.createElement("div");
      div.style.margin = "0.5em 0";
      div.innerHTML = `
        <strong>${guest}</strong><br/>
        <label><input type="radio" name="${guest}" value="yes" ${existing === true ? "checked" : ""}/> Attending</label>
        &nbsp;
        <label><input type="radio" name="${guest}" value="no" ${existing === false ? "checked" : ""}/> Not attending</label>
      `;
      guestList.appendChild(div);
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
    let allAnswered = true;

    for (const guest of data.guests) {
      const selected = document.querySelector(`input[name="${guest}"]:checked`);
      if (!selected) { allAnswered = false; break; }
      rsvp[guest] = selected.value === "yes";
    }

    if (!allAnswered) {
      errorEl.textContent = "Please select attending or not attending for each person.";
      errorEl.style.display = "block";
      return;
    }

    await updateDoc(doc(db, "groups", currentGroupDoc.id), {
      rsvp,
      submitted: true,
      submittedAt: serverTimestamp()
    });

    const attending = data.guests.filter(g => rsvp[g]);
    const notAttending = data.guests.filter(g => !rsvp[g]);
    let msg = "";
    if (attending.length) msg += `${attending.join(" and ")} will be attending. `;
    if (notAttending.length) msg += `${notAttending.join(" and ")} will not be attending.`;

    document.getElementById("confirmation-message").textContent = msg;
    document.getElementById("rsvp-section").style.display = "none";
    document.getElementById("confirmation-section").style.display = "block";
  });
</script>
