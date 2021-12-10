// Variables
let computerColorSequence = [];
let playerColorSequence = [];
let playerColorSequenceToString;
let computerColorSequenceToString;
let randomNumber = 0;
let roundCounter = 1;
let scoreCounter = 0;

// Function that creates random number sequence and pushes it into a random array for Simon to display.
function createComputerColorSequence() {
	randomNumber = Math.floor(Math.random() * 4);
	computerColorSequence.push(randomNumber);
}

// Variable, querySelector Gameboard Buttons, added Event Listener that

// Event listener is pushing a new Random Number into the array after greenbutton is clicked.
const greenButton = document.querySelector('#green-top-left');
greenButton.addEventListener('click', logPlayerColorSequence);

// Event listener is pushing a new Random Number into the array after redbutton is clicked.
const redButton = document.querySelector('#red-top-right');
redButton.addEventListener('click', logPlayerColorSequence);

// Event listener is pushing a new Random Number into the array after yellowbutton is clicked.
const yellowButton = document.querySelector('#yellow-bottom-left');
yellowButton.addEventListener('click', logPlayerColorSequence);

// Event listener is pushing a new Random Number into the array after bluebutton is clicked.
const blueButton = document.querySelector('#blue-bottom-right');
blueButton.addEventListener('click', logPlayerColorSequence);

// Event listener is waiting for on button to start the gameLogic function
const onButton = document.querySelector('#onBtn');
onButton.addEventListener('click', gameLogic);

const buttonsArray = [greenButton, redButton, yellowButton, blueButton];

// Function that lights up gameboard when specific light is called up in lightgameboard function.
function lightGameBoard(button) {
	button.style.filter = 'brightness(200%)';
	setTimeout(function () {
		button.style.filter = 'brightness(75%)';
	}, 1000);
}

// Function to enter Player click into an array which includes the index of the button pressed. ** RENAME FUNCTION TO MAKE IT CLEAR WHAT ITS DOING
function logPlayerColorSequence(event) {
	playerColorSequence.push(event.target.dataset.id);

	playerColorSequenceToString = playerColorSequence
		.toString()
		.replaceAll(',', '');
	lightGameBoard(event.target);
	let playerSequenceLength = playerColorSequence.length;
	let computerSequenceLength = computerColorSequence.length;
	console.log('playercolorsequence', playerColorSequenceToString);
	console.log(
		'computercolorsequence',
		computerColorSequenceToString.substring(0, playerSequenceLength)
	);
	if (
		playerColorSequenceToString ===
		computerColorSequenceToString.substring(0, playerSequenceLength)
	) {
		console.log('correct');
		if (playerSequenceLength === computerSequenceLength) {
			console.log('move to next round');
			playerColorSequence = [];
			setTimeout(function () {
				gameLogic();
			}, 2000);
			statusBox.textContent = 'Status: GOOD!';
			roundBox.textContent = `Round: ${roundCounter++}`;
			scoreBox.textContent = `Score: ${(scoreCounter = scoreCounter + 10)}`;
		}
	} else {
		console.log('incorrect');
		statusBox.textContent = 'Status: LOSE!';
	}
}
// Game Function **RENAME FUNCTION TO MAKE CLEAR WHAT ITS DOING**
function gameLogic() {
	// Insert computerColorSequence Array for computer player
	createComputerColorSequence();
	let currentColor;
	// Iterate through colorsequence Array for computer player
	for (let i = 0; i < computerColorSequence.length; i++) {
		currentColor = computerColorSequence[i];
		// Each Array index need to light a button color
		// Timeout function set to give some time for the gameboard to light after clicking a button
		setTimeout(function () {
			lightGameBoard(buttonsArray[currentColor]);
		}, i * 1000);
	}
	// Compare Computer Sequence to Player Sequence
	computerColorSequenceToString = computerColorSequence
		.toString()
		.replaceAll(',', '');
}
function nextRound() {
	if (playerColorSequenceToString === computerColorSequence) {
	}
}

// Query selector for the status scorebox; The status messages go in the corresponding logic positions
const statusBox = document.querySelector('#status-box');
const scoreBox = document.querySelector('#score-box');
const roundBox = document.querySelector('#round-box');
