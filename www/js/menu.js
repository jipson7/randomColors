//Instantiate the game menu


function menuInit() {

	eraseCurrentData();

	$("#gameBoard").empty();

	var menuWidth = 2;

	var menuHeight = 1;
	
	var table = $("<table></table>");
	
	table.attr("cellpadding", "0");

	var firstRow = $("<tr></tr>");

	var playCell = $("<td></td>");

	playCell.text("Play")

	playCell.attr("class", "menuItem");

	playCell.attr("onclick", "gameInit()");

	playCell.css("width", (100/menuWidth).toString() + "vw")
				.css("height", (100/menuHeight).toString() + "vh");

	playCell.attr("id", "menuPlay");

	firstRow.append(playCell);

	var infoCell = $("<td></td>");

	infoCell.text("Rules");

	infoCell.attr("class", "menuItem");

	infoCell.attr("onclick", "getRules()");

	infoCell.css("width", (100/menuWidth).toString() + "vw")
				.css("height", (100/menuHeight).toString() + "vh");

	infoCell.attr("id", "menuRules");

	firstRow.append(infoCell);

	table.append(firstRow);

	$("#gameBoard").append(table);

	$("#menuPlay").css("background-color", getRandomColor());

	$("#menuRules").css("background-color", getRandomColor());
}

function getRules() {
	$("#menuRules").text("Click the boxes that change color. If you miss one, or click the wrong color, the round is over.");
}

function gameOverMenu() {

	var gameOverWidth = 1;
	var gameOverHeight = 3;

	$("#gameBoard").empty();

	var table = $("<table></table>");

	var scoreRow = $("<td></td>");

	scoreRow.text("Score: " + scoreCounter);

	scoreRow.css("width", (100/gameOverWidth).toString() + "vw")
				.css("height", (100/gameOverHeight).toString() + "vh");

	scoreRow.css("background-color", getRandomColor());

	scoreRow.attr("class", "menuItem");

	var replayRow = $("<td></td>");

	replayRow.text("Play Again");
	replayRow.attr("onclick", "restartGame()");

	replayRow.css("width", (100/gameOverWidth).toString() + "vw")
				.css("height", (100/gameOverHeight).toString() + "vh");

	replayRow.css("background-color", getRandomColor());

	replayRow.attr("class", "menuItem");

	var mainRow = $("<td></td>");

	mainRow.text("Back to Main");
	mainRow.attr("onclick", "menuInit()");

	mainRow.css("width", (100/gameOverWidth).toString() + "vw")
				.css("height", (100/gameOverHeight).toString() + "vh");

	mainRow.css("background-color", getRandomColor());

	mainRow.attr("class", "menuItem");

	scoreRow = $("<tr></tr>").append(scoreRow);
	table.append(scoreRow);
	replayRow = $("<tr></tr>").append(replayRow);
	table.append(replayRow);
	mainRow = $("<tr></tr>").append(mainRow);
	table.append(mainRow);

	$("#gameBoard").append(table);

}






