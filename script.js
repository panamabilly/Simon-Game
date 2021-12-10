// Variables
let computerColorSequence = [];
let playerColorSequence = [];
let randomNumber = 0;
let playerNumber = null;

// Function that creates random number sequence and pushes it into a random array for Simon to display.
function createComputerColorSequence() {
	randomNumber = Math.floor(Math.random() * 4);
	computerColorSequence.push(randomNumber);
	console.log(computerColorSequence);
}
console.log(createComputerColorSequence);

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
	console.log(button);
	button.style.filter = 'brightness(200%)';
	setTimeout(function () {
		button.style.filter = 'brightness(75%)';
	}, 1000);
}

// Function to enter Player click into an array which includes the index of the button pressed.
function logPlayerColorSequence(event) {
	playerColorSequence.push(event.target);
	lightGameBoard(event.target);
	console.log(playerColorSequence);
	setTimeout(function () {
		gameLogic();
	}, 1000);
}

// lightGameBoard(buttonsArray[1]);
// Game Function
function gameLogic() {
	// Insert computerColorSequence Array for computer player
	createComputerColorSequence();
	console.log(computerColorSequence);
	let currentColor;
	// Iterate through colorsequence Array for computer player
	for (let i = 0; i < computerColorSequence.length; i++) {
		console.log(computerColorSequence[i]);
		currentColor = computerColorSequence[i];
		// Each Array index need to light a button color
		setTimeout(function () {
			lightGameBoard(buttonsArray[currentColor]);
		}, i * 1000);
	}
}
// lightGameBoard(buttonsArray[computerColorSequence[i]]);
