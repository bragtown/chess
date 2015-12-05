//chess game
    var inputTime = 5;
	var turnCount = 0.0;
	var boardHistory = [];
	var curBoard = [];
	var nextBoard = [];
    var board; 
    var height = 8;
    var width = 8;
    var selectedSquare = 0;
    var turn = true;
    var justSelected = 0;
    var prohibited = [];
    var enPessants = [];
    var turnNo = 0;
    var blackChecked = false;
    var whiteChecked = false;
    var duplicatePieces = [];
    var chessPieces = [];
    var makesCheckSquares = [];
    var whiteKingLoc = 13;
    var blackKingLoc = 83;
    var kingLoc = 0;


