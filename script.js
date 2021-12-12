// Global Variables
let computerColorSequence = [];
let playerColorSequence = [];
let playerColorSequenceToString;
let computerColorSequenceToString;
let randomNumber;
let roundCounter = 1;
let scoreCounter = 0;

// Function that creates random number sequence and pushes it into a random array for Simon to display.
function createComputerColorSequence() {
	randomNumber = Math.floor(Math.random() * 4);
	computerColorSequence.push(randomNumber);
}

// Variables, querySelector Gameboard Buttons, added Event Listeners

// Event listener is pushing a new Random Number into the array after greenbutton is clicked.
let greenButton = document.querySelector('#green-top-left');
greenButton.addEventListener('click', logAndCheckPlayerColorSequence);

// Event listener is pushing a new Random Number into the array after redbutton is clicked.
let redButton = document.querySelector('#red-top-right');
redButton.addEventListener('click', logAndCheckPlayerColorSequence);

// Event listener is pushing a new Random Number into the array after yellowbutton is clicked.
let yellowButton = document.querySelector('#yellow-bottom-left');
yellowButton.addEventListener('click', logAndCheckPlayerColorSequence);

// Event listener is pushing a new Random Number into the array after bluebutton is clicked.
let blueButton = document.querySelector('#blue-bottom-right');
blueButton.addEventListener('click', logAndCheckPlayerColorSequence);

// Event listener is waiting for on button to start the flashComputerColorSequence function
let onButton = document.querySelector('#onBtn');
onButton.addEventListener('click', flashComputerColorSequence);

// Holds index for butons array
let buttonsArray = [greenButton, redButton, yellowButton, blueButton];

// Function that lights up gameboard when specific light is called up in lightgameboard function.
function lightGameBoard(button) {
	button.style.filter = 'brightness(200%)';
	setTimeout(function () {
		button.style.filter = 'brightness(75%)';
	}, 1000);
}

// Function to enter Player click into an array which includes the index of the button pressed.
// Then the array is converted to a string and then truncated to match then the delimiting commas where removed from the string.
// Then player and computer color sequence values are compared for length and accuracy
// If player matches computer the player advances to the next round where then the player  color sequence is clear and player enters the entire sequence again.
// The gamelogic function is called to generate the next lighted panel in the Simon board
// Lose and Winning logica was added with functions called to keep track of statistics
// A crazy win pattern was set using flashComputerColorSequence function to create a random pattern for a set interval

function logAndCheckPlayerColorSequence(event) {
	playerColorSequence.push(event.target.dataset.id);
	playerColorSequenceToString = playerColorSequence
		.toString()
		.replaceAll(',', '');
	lightGameBoard(event.target);
	let playerSequenceLength = playerColorSequence.length;
	let computerSequenceLength = computerColorSequence.length;
	let truncatedComputerColorSequenceToString =
		computerColorSequenceToString.substring(0, playerSequenceLength);
	if (playerColorSequenceToString === truncatedComputerColorSequenceToString) {
		console.log('correct');
		if (playerSequenceLength === computerSequenceLength) {
			// alert('Player Advances to the Next Round!');
			playerColorSequence = [];
			setTimeout(function () {
				flashComputerColorSequence();
			}, 1000);

			showScoreboardStats();
		}
	} else {
		// alert('Incorrect Sequence Entry GameOver!!!!');
		statusBox.textContent = 'Status:LOSE GAME OVER!';
		setTimeout(function () {
			clearScoreboardStats();
			gameOver();
		}, 2500);
	}
	// This if statement sets the winning condition which is 8 a score of 80 or 8 rounds and deploys crazy random color sequence when the player beats the final round.
	if (
		playerColorSequenceToString === truncatedComputerColorSequenceToString &&
		playerSequenceLength === computerSequenceLength &&
		scoreCounter === 30
	) {
		winGame();
		winnerScoreboardStats();
		var Timer = setInterval(flashComputerColorSequence, 200);
		setTimeout(function () {
			clearInterval(Timer);
		}, 4000);
		setTimeout(function () {
			clearScoreboardStats();
			gameOver();
		}, 5000);
	}
}
// Function calls random number created by createComputerColor Sequence iterates it using the length of the color sequence array, then lights up the game board according to the random number
// Notes below:
// Insert computerColorSequence Array for computer player
// Iterate through colorsequence Array for computer player
// Each Array index need to light a button color
// Timeout function set to give some time for the gameboard to light after clicking a button
// Assign a variable as a string to computerColorSequence
function flashComputerColorSequence() {
	createComputerColorSequence();
	let currentColor;
	for (let i = 0; i < computerColorSequence.length; i++) {
		currentColor = computerColorSequence[i];
		setTimeout(function () {
			lightGameBoard(buttonsArray[currentColor]);
		}, i * 500);
		clearTimeout;
		console.log(currentColor);
	}
	computerColorSequenceToString = computerColorSequence
		.toString()
		.replaceAll(',', '');
}

// Query selectors for the  scoreboard; The status messages go in the corresponding logic positions
const statusBox = document.querySelector('#status-box');
const scoreBox = document.querySelector('#score-box');
const roundBox = document.querySelector('#round-box');

// Game Status Tracker
function showScoreboardStats() {
	statusBox.textContent = 'Status: GOOD!';
	roundBox.textContent = `Round: ${roundCounter++}`;
	scoreBox.textContent = `Score: ${(scoreCounter = scoreCounter + 10)}`;
}

// Clear Game Status Tracker
function clearScoreboardStats() {
	statusBox.textContent = 'Status:';
	roundBox.textContent = 'Round:';
	scoreBox.textContent = 'Score:';
}

// Winner Game Status Tracker
function winnerScoreboardStats() {
	statusBox.textContent = 'Status: WIN!';
	roundBox.textContent = 'Round: WIN!';
	scoreBox.textContent = 'Score: WIN!';
}
// When game is over reset all the global variables, so you can play again.
function gameOver() {
	computerColorSequence = [];
	playerColorSequence = [];
	playerColorSequenceToString = null;
	computerColorSequenceToString = null;
	randomNumber = null;
	roundCounter = 1;
	scoreCounter = 0;
}
// When game is won reset all the global variables, so you can play again.
function winGame() {
	computerColorSequence = [];
	playerColorSequence = [];
	playerColorSequenceToString = null;
	computerColorSequenceToString = null;
	randomNumber = null;
	roundCounter = 1;
	scoreCounter = 0;
}

//Grabbing Elements for Modal
const openBtn = document.querySelector('#openModal');
const modal = document.querySelector('#modal-textbox');
const close = document.querySelector('#close');

//Functions for Modal
const openModal = () => {
	modal.style.display = 'block';
	// setTimeout(openModal, 1000);
};

const closeModal = () => {
	modal.style.display = 'none';
};

//Event Listeners For Modal
openBtn.addEventListener('click', openModal);

close.addEventListener('click', closeModal);
