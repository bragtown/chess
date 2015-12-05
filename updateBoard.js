preMadeTime = function(){
	var e = document.getElementById("timeSelect")
	var inputTime = e.options[e.selectedIndex].value
	document.getElementById("debug").innerHTML += " " + inputTime
}

updateTime = function(){
	var inputTime = document.getElementById("timeInput").value;
	document.getElementById("debug").innerHTML += " " + inputTime
}
reset = function(){
    inputTime = 5;
	turnCount = 0.0;
	boardHistory = [];
	curBoard = [];
	nextBoard = [];
	board; 
	height = 8;
	width = 8;
	selectedSquare = 0;
	turn = true;
	justSelected = 0;
	prohibited = [];
	enPessants = [];
	turnNo = 0;
	blackChecked = false;
	whiteChecked = false;
	duplicatePieces = [];
	chessPieces = [];
	makesCheckSquares = [];
	whiteKingLoc = 13;
	blackKingLoc = 83;
	kingLoc = 0;
	drawboard()
	document.getElementById("gameHistory").innerHTML = ""
}


update = function(){
	turnCount+= .5
	var hist = boardHistory[turnCount] = [];
	for(s in curBoard){
		v = curBoard[s];
		//stores board for use later
		hist[s] = v.copy()
		//updates the location on the board
		v.updateLoc();		
		//update my nextBoard
		nextBoard[s] = v.copy()

	}
}
adHistory = function(move){
	var letter = ""
	var number = 0
	if(move.id % 10 == 0){
		letter = "h"
	}
	if(move.id % 10 == 1){
		letter = "g"
	}
	if(move.id % 10 == 2){
		letter = "f"
	}
	if(move.id % 10 == 3){
		letter = "e"
	}
	if(move.id % 10 == 4){
		letter = "d"
	}
	if(move.id % 10 == 5){
		letter = "c"
	}
	if(move.id % 10 == 6){
		letter = "b"
	}
	if(move.id % 10 == 7){
		letter = "a"
	}
	number = Math.floor(move.id/10)
	if(turnCount % 1 == 0){
		var curTurn = Math.floor(turnCount/1)
		console.log(move.occupiedId, letter, number)
		document.getElementById("gameHistory").innerHTML += '<tr><td>'+turnCount+'</td><td>'+move.occupiedId+''+letter+''+number+'</td><td id = "'+curTurn+'"></td></tr>'
	}
	else{
		var prevTurn = Math.floor(turnCount - .5)
		var prevTurnString = '' + prevTurn + ''
		console.log(move.occupiedId, letter, number)
		document.getElementById(prevTurnString).innerHTML = ''+move.occupiedId+''+letter+''+number+''
	}
}