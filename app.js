"use strict";

// =========================
// Data
// =========================

const facts = [
  {
    id: "001",
    fact: "Chuck Norris counted to infinity. Twice.",
    type: "Myth"
  },
  {
    id: "002",
    fact: "Chuck Norris does not sleep. He waits.",
    type: "Legend"
  },
  {
    id: "003",
    fact: "Chuck Norris's tears cure cancer, too bad he's never cried.",
    type: "Myth"
  },
  {
    id: "004",
    fact: "Chuck Norris can kill two stones with one bird.",
    type: "Meme"
  },
  {
    id: "005",
    fact: "Chuck Norris doen't wear a watch, he decides what time it is.",
    type: "Legend"
  },
  {
    id: "006",
    fact: "When Chuck Norris does push-ups, he pushes the Earth down.",
    type: "Myth"
  },
  {
    id: "007",
    fact: "When Chuck Norris chops onions, the onion cries.",
    type: "Meme"
  }
];

let userFactCount = 0;
const MAX_USER_FACTS = 3;

// =========================
// DOM Elements
// =========================

const factsTableBody = document.getElementById("facts-table-body");
const newFactButton = document.getElementById("new-fact-btn");

const addFactButton = document.getElementById("add-fact-btn");
const userFactInput = document.getElementById("user-fact");
const userTypeInput = document.getElementById("user-type");

const threatForm = document.getElementById("threat-form");
const threatResponse = document.getElementById("threat-response");

const voteForm = document.getElementById("vote-form");
const voteResponse = document.getElementById("vote-response");
const submitVoteBtn = document.getElementById("submit-vote-btn");

// =========================
// Functions
// =========================

function addFactToTable(factObj) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${factObj.id}</td>
    <td>${factObj.fact}</td>
    <td>${factObj.type}</td>
  `;

  factsTableBody.appendChild(row);
}

function renderInitialFacts() {
  factsTableBody.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    addFactToTable(facts[i]);
  }
}

function renderRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

  addFactToTable(randomFact);
}

function addUserFact() {
  const factText = userFactInput.value.trim();
  const factType = userTypeInput.value.trim();

  if (factText === "") {
    alert("Please enter a Chuck Norris fact first.");
    return;
  }

  if (userFactCount >= MAX_USER_FACTS) {
    alert("You can only add 3 custom facts.");
    return;
  }

  const newFact = {
    id: String(facts.length + 1).padStart(3, "0"),
    fact: factText,
    type: factType || "User"
  };

  facts.push(newFact);
  userFactCount++;

  addFactToTable(newFact);

  userFactInput.value = "";
  userTypeInput.value = "";

  if (userFactCount >= MAX_USER_FACTS) {
    addFactButton.disabled = true;
    addFactButton.textContent = "Fact Limit Reached";
  }
}

function updateThreatResponse(event) {
  const selectedValue = event.target.value;

  if (selectedValue === "mild") {
    threatResponse.textContent = "Threat contained.";
  } else if (selectedValue === "ponytail") {
    threatResponse.textContent = "Caution: slick-back levels rising.";
  } else if (selectedValue === "dvd") {
    threatResponse.textContent = "Direct-to-DVD danger detected.";
  } else if (selectedValue === "nemesis") {
    threatResponse.textContent = "NEMESIS MODE CONFIRMED. GUARD YOUR DOJO.";
  }
}

function handleVote(event) {
  event.preventDefault();

  const selected = document.querySelector('input[name="sensei"]:checked');

  if (!selected) {
    voteResponse.textContent = "You must choose a sensei.";
    return;
  }

  if (selected.value === "chuck") {
    voteResponse.textContent = "Correct. There was never a choice.";
  } else if (selected.value === "bruce") {
    voteResponse.textContent = "Respect. The dragon approves.";
  } else if (selected.value === "seagal") {
    voteResponse.textContent = "Incorrect. You have angered Sensei Seagal, look behind you.";
  }
}

// =========================
// Event Listeners
// =========================

if (newFactButton) {
  newFactButton.addEventListener("click", renderRandomFact);
}

if (addFactButton) {
  addFactButton.addEventListener("click", addUserFact);
}

if (threatForm) {
  threatForm.addEventListener("change", updateThreatResponse);
}

if (voteForm) {
  voteForm.addEventListener("submit", handleVote);
}

// =========================
// Initial Render
// =========================

renderInitialFacts();

