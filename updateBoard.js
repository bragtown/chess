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
	console.log(curBoard)
	for(s in curBoard){
		var v = curBoard[s];
		//stores board for use later
		hist[s] = v.copy()
		//updates the location on the board
		v.updateLoc()	

		//update my nextBoard
		nextBoard[s] = v.copy()
	}
	//copyGameInfo();
	//console.log(JSON.stringify(gameHistory))
}

// copyGameInfo = function(){
// 	gameHistory.push({

//     sinputTime: inputTime,
//     sturnCount: turnCount,
//     sboardHistory: boardHistory,
//     scurBoard: curBoard,
//     nextBoard: nextBoard,
//     sboard: board,
//     sheight: height,
//     swidth: width,
//     sselectedSquare: selectedSquare,
//     sturn: turn,
//     sjustSelected: justSelected,
//     sprohibited: prohibited,
//     senPessants: enPessants,
//     sturnNo: turnNo,
//     sblackChecked: blackChecked,
//     swhiteChecked: whiteChecked,
//     sduplicatedPieces: duplicatePieces,
//     schessPieces: chessPieces,
//     smakesCheckSquares: makesCheckSquares,
//     swhiteKingLoc: whiteKingLoc,
//     sblackKingLoc: blackKingLoc,
//     skingLoc: kingLoc
// 	})
// }

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

function setBoard () {
	argsArray = getSampleBoard()
	args = argsArray.pop()
	//set the game info
	inputTime=args.sinputTime;
 	turnCount=args.sturnCount
 	boardHistory=args.sboardHistory;
 	//curBoard=args.scurBoard;
 	nextBoard=args.nextBoard;
 	board=args.sboard;
 	height=args.sheight;
 	width=args.swidth;
 	selectedSquare=args.sselectedSquare;
 	turn=!args.sturn;
 	justSelected=args.sjustSelected;
 	prohibited=args.sprohibited;
 	enPessants=args.senPessants;
 	turnNo=args.sturnNo;
 	blackChecked=args. sblackChecked;
 	whiteChecked=args.swhiteChecked;
 	duplicatePieces=args.sduplicatedPieces;
 	chessPieces=args.schessPieces;
 	makesCheckSquares=args.smakesCheckSquares;
 	whiteKingLoc=args.swhiteKingLoc;
 	blackKingLoc=args.sblackKingLoc;
 	kingLoc=args.kingLoc;

    console.log(turn, turnCount)
	//change the board
    for(s in args.nextBoard){

    	var v = args.nextBoard[s]
    	if(v != null){	
			curBoard[s].absorb(v)
			curBoard[s].updateLoc()
		}	
    }
	document.getElementById("debug").innerHTML += JSON.stringify(args);
}


getSampleBoard = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "checkInThree.json", false);
    request.send();
    return JSON.parse(request.responseText);
}