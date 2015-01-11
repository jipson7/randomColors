/**
 *@author Caleb Phillips
 */

var startDelay = 3; 						//This the first time delay (in seconds)
var intervalReduction = 1;					//Reduced by this amount everytime (in seconds)
var cyclesBeforeReduction = 5;				//this many cycles passes

var tableWidth = 5;							//The Number of columns (aka width)
var tableHeight = 10;						//The number of rows (aka height)
var letters = '0123456789ABCDEF'.split(''); //The list of values for the hexadecimal numbering system
var gameOver = false;						//Current game state, True if game is still running
var intervalTime = startDelay; 				//Initial time between color changes	
var gameInterval = null;					//The handle for the timeout that controls the game loop
var scoreCounter = 0;						//Score Counter for number of successful clicks
//var previousCell = null; 					//Previous cell clicked (current not in use)
var currentCell = null;						//Current cell thats changing color, and needs to be clicked
var playerMove = null;						//The cell that the player clicks

var moveMade = true;						//Boolean value based on whether or not the player made a succesful attempt,
												//Initialized to true to begin the game loop



function gameInit() {
	$("#gameBoard").empty();	
	createTable();
	fillTableWithColor();
	gameInterval = setTimeout(gameLoop, startDelay * 1000);
	
	

}

/**
 *Creates a table with "m" columns and "n" rows, based on the global variables "tableWidth" and "tableHeight", respectivly
 */

function createTable() {
	var table = $("<table></table>");
	table.attr("cellpadding", "0");

	for (var row = 1; row <= tableHeight; row++) {
		var currentRow = $("<tr></tr>");

		for (var col = 1; col <= tableWidth; col++) {
			var cell = $("<td></td>");
			cell.attr("id", row + "," + col)
				.attr("onclick", "cellClick(this.id)")
				.attr("class", "colorCell")
				.css("width", (100/tableWidth).toString() + "vw")
				.css("height", (100/tableHeight).toString() + "vh");
			currentRow.append(cell);
		}
		table.append(currentRow);

	}
	$("#gameBoard").append(table);

}

/**
 *Traverses the previously created table and generates a random color for every cell
 */ 
function fillTableWithColor() {
	for (var row = 1; row <= tableHeight; row++) {
		for (var col = 1; col <= tableWidth; col++) {
			document.getElementById(row + "," + col).style.backgroundColor = getRandomColor();
		}
	}
}

/**
 *Generates a random hexidecimal color
 */
function getRandomColor() {
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 *The event handler for a user clicking a cell, if the correct cell is clicked, the score increases and 
 *the game loop continues, if the incorrect cell is clicked, the gameOver boolean is set to true and the table is
 *filled with the last color clicked (i.e. the incorrect one).
 *
 *@param id The id of the DOM element that the user clicked
 */
function cellClick(id) {

	playerMove = id.split(",");
	if (playerMove[0] == currentCell[0] && playerMove[1] == currentCell[1]) {

		var cellClicked = document.getElementById(id);
		cellClicked.style.backgroundColor = getRandomColor();
		scoreCounter++;
		moveMade = true;
		$(cellClicked).text(scoreCounter);
		setTimeout(function() {
			$(cellClicked).text("");
		}, 1000);

	} else {
		gameOver = true;

		var lastClicked = document.getElementById(id);

		var lastColor = $(lastClicked).css("background-color");

		for (var row = 1; row <= tableHeight; row++) {
			for (var col = 1; col <= tableWidth; col++) {
				document.getElementById(row + "," + col).style.backgroundColor = lastColor;
			}
		}
	}

	
	
}

/**
 *Generates a random row and column value within the contraints of the table size itself
 */
function getRandomCell() {

	var randRow = Math.floor(Math.random()*tableHeight) + 1;
	var randCol = Math.floor(Math.random()*tableWidth) + 1;
	return [randRow, randCol];

}

/**
 *The main game loop, runs the Timeouts for the game "ticks" and decreases the interval based on the current score
 *It also randomizes one color every tick.
 */
function gameLoop() {

	clearTimeout(gameInterval);

	if (gameOver || !moveMade) {
		//clearInterval(gameInterval);
		gameOverMenu();
		return;
	}

	if (intervalTime > intervalReduction * 1.5) {

		if (scoreCounter % cyclesBeforeReduction == 0) {
			intervalTime -= intervalReduction;
		}

	}

	currentCell = getRandomCell();

	var cellElement = document.getElementById(currentCell[0] + "," + currentCell[1]);

	var prevColor = $(cellElement).css("background-color");

	var newColor = getRandomColor();

	while (hexColorDelta(prevColor, newColor) > 0.9) {
		newColor = getRandomColor();
	}

	$(cellElement).css("background-color", newColor);

	moveMade = false;

	gameInterval = setTimeout(gameLoop, intervalTime * 1000);

}

/**
 *Reinitializes the game (click handler for the "Play again" from the game over menu).
 */

function restartGame() {
	eraseCurrentData();
	gameInit();
}

/**
 *Compares two Hex color values to determine their similarity
 *@param hex1Hash A hexidecimal color value in the form "#AABBCC" (including the hash symbol)
 *@param hex2Hash Same as hex1Hash
 *@return Returns a value from 0 to 1, 0 is opposite color, 1 is the same color
 */

var hexColorDelta = function(hex1Hash, hex2Hash) {

	var hex1 = hex1Hash.substring(1);
	var hex2 = hex2Hash.substring(1);

    var r1 = parseInt(hex1.substring(0, 2), 16);
    var g1 = parseInt(hex1.substring(2, 4), 16);
    var b1 = parseInt(hex1.substring(4, 6), 16);


    var r2 = parseInt(hex2.substring(0, 2), 16);
    var g2 = parseInt(hex2.substring(2, 4), 16);
    var b2 = parseInt(hex2.substring(4, 6), 16);


    var r = 255 - Math.abs(r1 - r2);
    var g = 255 - Math.abs(g1 - g2);
    var b = 255 - Math.abs(b1 - b2);


    r /= 255;
    g /= 255;
    b /= 255;

    return (r + g + b) / 3;
}


/**
 *@brief Erases global variables when the game needs to reset
 */
function eraseCurrentData() {
	gameOver = false;
	gameInterval = null;
	scoreCounter = 0;
	currentCell = null;
	playerMove = null;
	moveMade = true;
	intervalTime = startDelay;
}


