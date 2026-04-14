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

// =========================
// Functions
// =========================

// Add one fact as a new row in the table
function addFactToTable(factObj) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${factObj.id}</td>
    <td>${factObj.fact}</td>
    <td>${factObj.type}</td>
  `;

  factsTableBody.appendChild(row);
}

// Show the original 7 facts when the page first loads
function renderInitialFacts() {
  factsTableBody.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    addFactToTable(facts[i]);
  }
}

// Add one random fact as a new row
function renderRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

  addFactToTable(randomFact);
}

// Add a user-submitted fact to the end of the array and table
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

// =========================
// Event Listeners
// =========================

if (newFactButton) {
  newFactButton.addEventListener("click", renderRandomFact);
}

if (addFactButton) {
  addFactButton.addEventListener("click", addUserFact);
}

// =========================
// Initial Render
// =========================

renderInitialFacts();