let origBoard; //Main tic tac toe board- 1D array that keeps track of the symbol in each cell
let huPlayer = 'O'; //By default symbol of Human Player
let aiPlayer = 'X'; //By default symbol of Oponent Computer Player
//Array defining all the winning combinations (i.e 3 horizontal rows, 3 vertical columns and 2 diagonals)
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
//Stores reference to each cell of the board, the td elements
const cells = document.querySelectorAll('td');
//Call to the startGame function whenever the window is loaded or the replay button is pressed
startGame();

//Function that assigns the symbol to each player and adds the "click" event on the cells
function selectSym(sym) {
	huPlayer = sym; //Sets the symbol for human player as passed from the select symbol div in html
	aiPlayer = sym === 'O' ? 'X' : 'O'; // Sets the other symbol for the AI oponent
	origBoard = Array.from(Array(9).keys()); //To return an array containing 0-8
	//To add the "click" event listener to each cell. Whenever a cell is clicked "turnClick()" function will be called
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', turnClick, false);
	}
	//Since X is the first one to start the game, if Human has chosen O then aiPlayer gets the first turn
	if (aiPlayer === 'X') {
		turn(bestSpot(), aiPlayer);
	}
	//To hide the select symbol message after choosing a symbol
	document.querySelector('.selectSym').style.display = "none";
}

function startGame() {
	document.querySelector('.endgame').style.display = "none";//To hide the result message in the beginning
	document.querySelector('.endgame .text').innerText = "";
	document.querySelector('.selectSym').style.display = "block";
	//To remove the symbols in each cell whenever a new game starts
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = '';//Replacing the symbol with no string
		cells[i].style.removeProperty('background-color');//To remove the background colour of the result message
	}
}

//This function gets called whenever a cell is clicked
function turnClick(square) {
	//To prevent clicking on the same cell, we'll check the type of variable stored in that cell- index or the symbol
	if (typeof origBoard[square.target.id] === 'number') {
		//If the index number is stored then the click by the human will be counted (as it is the first click on that cell)
		if (!checkWin(origBoard, aiPlayer) && !checkTie())
			turn(square.target.id, huPlayer);
		//Then only if the game is not ending, the AI will get its turn
		if (!checkWin(origBoard, huPlayer) && !checkTie()){
			setTimeout(function () { turn(bestSpot(), aiPlayer); }, 200);//To give an illusion that the computer is thinking
			//turn(bestSpot(), aiPlayer);
		}
	}
}

function turn(squareId, player) {
	// Sets the clicked board position with the symbol of the player
	origBoard[squareId] = player;
	// Updates the cell to show the symbol
	document.getElementById(squareId).innerHTML = player;
	//For every turn check if the player is winning the game
	let gameWon = checkWin(origBoard, player);
	//and if he is then ending the game with appropriate msg
	if (gameWon) gameOver(gameWon);
	checkTie();
}

function checkWin(board, player) {
	//To find all the places on the board that the player has played in
	let plays = board.reduce((accumulator1, element1, index1) => (element1 === player) ? accumulator1.concat(index1) : accumulator1, []);
	//Resetting the gamewon variable before checking for gamewon
	let gameWon = null;
	//Matching each winning combo in the "winCombo" array with the positions in "plays" array
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };//Initializing "gameWon" with the winning combo and the player who won
			break;
		}
	}
	return gameWon;
}
//To highlight the winning cells combination with some colour and to stop any further clicking on the cells
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player === huPlayer ? "rgb(0, 185, 0)" : " rgb(196, 0, 0)";
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");
}

function declareWinner(who) {
	//Display the endgame message
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
//Funtion to return the indices of all the empty cells
function emptySquares() {
	return origBoard.filter((elm, i) => i === elm);
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	//If no empty cells are left and no one has yet won then tie
	if (emptySquares().length === 0) {
		for (cell of cells) {
			cell.style.backgroundColor = "rgb(0, 119, 255)";
			cell.removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie game");
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	//Finding the available cells which are not yet played on
	var availSpots = emptySquares(newBoard);

	//Check for terminal states, these scores act as heursitic
	//Since We are maximizing the winning of AI, therfore we'll assign negative score if human wins and positive if AI wins
	if (checkWin(newBoard, huPlayer)) {
		return { score: -1 };
	} else if (checkWin(newBoard, aiPlayer)) {
		return { score: 1 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}

	//Collecting the score at each position in an object "move" for all available positions and storing in array "moves"
	var moves = [];
	//Loop through all empty cells and storing the heuristic and index of every possible move
	for (let i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];//Stores the index
		newBoard[availSpots[i]] = player;//Sets the empty spot with the symbol of the current player

		//collect the score resulted from calling minimax on the opponent of the current player
		if (player === aiPlayer)
			move.score = minimax(newBoard, huPlayer).score;
		else
			move.score = minimax(newBoard, aiPlayer).score;

		newBoard[availSpots[i]] = move.index;//Resetting the spot to empty
		moves.push(move);
	}

	//Best move is selected
	let bestMove, bestScore;
	//If it was AI player's end turn then we'll choose the maximum value
	if (player === aiPlayer) {
		bestScore = -1000;//Initializing the lowest possible value
		//loops through the moves array to find move with highest score
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	//If it was Human player's end turn then we'll choose the minimum value
	else {
		bestScore = 1000;//Initializing the largest possible value
		//loops through the moves array to find move with lowest score
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	//return the chosen move (object) from the moves array
	return moves[bestMove];
}
