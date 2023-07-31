/**
 * This file contains the main logic for the Pet Rock Simulator game.
 * Note: it's assumed that this script is included as a defer (when the DOM is ready).
 */

import { requestAccess } from "./mash";

// Collect all of the DOM elements we want to interact with.
const exitDialog = document.getElementById("exit-dialog");
const winDialog = document.getElementById("win-dialog");
const speechBubble = document.getElementById("speech-bubble");
const speechBubbleContent = document.getElementById("speech-bubble-content");
const selectionForm = document.getElementById("selection-form");
const submitButton = document.getElementById("submit-button");
const rock = document.getElementById("rock");
const hearts = document.getElementById("hearts");

// Create a list of happy and sad messages to show at random.
const happyMessages = ["They liked that.", "They seem happy about that.", "Wow, look at that.", "Great job, they're happy."];
const sadMessages = ["They didn't seem to like that.", "They weren´t a fan of that...", "Uh oh, that didn't work.", "That didn't go well."];

// Collecting 8 heart pieces wins the game.
let heartPieces = 0;
const MAX_HEART_PIECES = 8;
const ANIMATION_TIME = 3000;

/**
 * Selects a random choice from an array.
 * @template T
 * @param {T[]} arr The array to select from.
 * @returns {T} The choice.
 */
function randomChoice(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * A promise-based wrapper for setTimeout. Waits the specified number of milliseconds.
 * @param {number} milliseconds The amount of time to wait.
 * @returns {Promise<void>} The promise that resolves after waiting.
 */
async function wait(milliseconds) {
  return new Promise((res) => setTimeout(() => res(), milliseconds));
}

/**
 * Shows a speech bubble message on the page.
 * @param {string} message The message to show.
 */
async function displayMessage(message) {
  // Hide the hearts and show the message.
  speechBubble.classList.toggle("hidden");
  hearts.classList.toggle("hidden");
  speechBubbleContent.innerHTML = message;
  // After waiting for a bit, hide the message and show the hearts.
  await wait(ANIMATION_TIME)
  speechBubble.classList.toggle("hidden");
  hearts.classList.toggle("hidden");
}

/**
 * Sets the number of heart pieces displayed on the page.
 * @param {number} numberOfPieces The number of heart pieces to display.
 */
function displayHearts(numberOfPieces) {
  let piecesRemaining = numberOfPieces;
  let iconsToAdd = MAX_HEART_PIECES / 2;
  // Remove any preexisting heart pieces from the page.
  hearts.innerHTML = "";
  // Add the specified number of heart pieces.
  for (let i = 0; i < iconsToAdd; i++) {
    // Display a full heart for 2 pieces, a half heart for 1 piece, and an empty heart for 0 pieces.
    let className = "";
    if (piecesRemaining === 1) className = "is-half";
    else if (piecesRemaining === 0) className = "is-empty";

    // Create the heart icon element and add it to the DOM.
    const heartIcon = document.createElement("i");
    heartIcon.className = `nes-icon heart ${className}`;
    hearts.appendChild(heartIcon);

    // Decrease the number of pieces left to add.
    piecesRemaining = Math.max(0, piecesRemaining - 2);
  }
}

/**
 * Toggles whether the submit button is disabled or not.
 */
function toggleDisableSubmit() {
  submitButton.disabled = !submitButton.disabled;
  submitButton.classList.toggle("is-disabled");
  submitButton.classList.toggle("is-primary");
}

/**
 * Attempts to pet the rock - has a 65% chance to make the rock happy, and a 35% chance to make it upset.
 */
async function petTheRock() {
  // 65% chance of being happy.
  const petIsSuccessful = Math.random() > 0.35;
  if (petIsSuccessful) {
    // If the rock is happy, add the corresponding class.
    rock.classList.add("happy");
    // Update the displayed hearts to +1 piece.
    heartPieces = Math.min(heartPieces + 1, MAX_HEART_PIECES);
    displayHearts(heartPieces);
    // Show a random "happy" message.
    displayMessage(randomChoice(happyMessages));
  } else {
    // If the rock is sad, add the corresponding class.
    rock.classList.add("sad");
    // Show a random "sad" message.
    displayMessage(randomChoice(sadMessages));
  }
  
  // Remove the class added above and stop the animation.
  toggleDisableSubmit();
  await wait(ANIMATION_TIME);
  rock.className = "";
  
  if (heartPieces === MAX_HEART_PIECES) {
    // If the user has hit the max pieces, they've won the game.
    winDialog.showModal();
  } else {
    // Otherwise, allow them to click the submit button some more to keep playing.
    toggleDisableSubmit();
  }
}

/**
 * When the form is submitted, act based on the selected choice.
 */
selectionForm.addEventListener("submit", event => {
  event.preventDefault();
  
  // Pull the user's choice out of the form
  const data = new FormData(selectionForm);
  const choice = data.get("choice");
  // Check the choice made by the user
  switch (choice) {
    case "pet":
      // Disable the submit button while waiting on Mash so the user can't click it multiple times.
      toggleDisableSubmit();
      // Request access from Mash.
      requestAccess().then(granted => {
        // If access has been granted with Mash, pet the rock. Otherwise, do nothing.
        if (granted) petTheRock();
      }).finally(() => {
        // Re-enable the button after Mash returns.
        toggleDisableSubmit();
      });
      break;
    case "exit":
      // Show the "exit" modal if the user has requested it.
      exitDialog.showModal();
      break;
  }
});
