
//clickSquare
clickSquare = function(squareID){
    var square = curBoard[squareID];
    var ocColor = "";
    if(turn == true){
    	ocColor = "white";
    }
    else{
    	ocColor = "black";
    }
    if(square.occupied == true && square.occupiedColor == ocColor){
        
    	findMoves(squareID);
    }
    else if(square.highlighted == true){
    	for(x in enPessants){
    		curBoard[enPessants[x]].unOccupy()
    	}
    	var selSq = curBoard[selectedSquare]
    	square.occupied = selSq.occupied
    	square.occupiedBy = selSq.occupiedBy
    	square.occupiedId = selSq.occupiedId
    	square.occupiedColor = selSq.occupiedColor
    	selSq.unHighlight()
    	selSq.unOccupy()
	    for(var i in curBoard){
	        var v = curBoard[i];
	        if(v.highlighted == true){
	            v.unHighlight()
	        }
	    }
	    update();
	    adHistory(square);
	    var displayTurn = document.getElementById("turn");
	    
	    var changeTurn = function(t, tt){
	    	displayTurn.innerHTML = t;
	    	displayTurn.className = tt;
	    }
	    if(turn == true){
	    	changeTurn("Black", "blackTurn")
	    }
	    else{
	    	changeTurn("White", "whiteTurn")
	    }
	    turn = !turn;
	    console.log(turn)
    }
}

findMoves = function(squareID){
    for(i in curBoard){
        v = curBoard[i];
        if(v.highlighted == true){
            v.unHighlight()
        }
    }
    enPessants = [];
	var square = curBoard[squareID];
	selectedSquare = squareID
	curBoard[squareID].highlight();
	//clear list of squares causing check
	//I should check to see if in check here (this will populate list)
	makesCheckSquares = [];

	if(turn == true){
		kingLoc = whiteKingLoc;
	}
	else{
		kingLoc = blackKingLoc;
	}
	var inCheck = !checkCheck(kingLoc)

	//needs to see if moving this piece creates check
		//save square information
		//unoccupy the square

	var tempSquare = square.copy()

	square.unOccupy();
		//run checkCheck on location king is in.
	var pinned = !checkCheck(kingLoc)
		//if king becomes checked, add squares causing check to list
	square = tempSquare;
	curBoard[squareID] = tempSquare;

	checkSquare = function(i, forward){
	    var j = curBoard[i];
	    console.log(i)
		console.log(curBoard[14].highlighted)
	    if(forward && j.occupied == false){
	    	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){	
	        	curBoard[i].highlight()
				console.log(curBoard[i].highlighted)
	        }
	    }
	    else if(forward && j.occupied == true && j && j.occupiedColor != square.occupiedColor){
	        forward = false;
	    	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){	
	        	curBoard[i].highlight()
	        }                               
	    }
	    else{
	        forward = false;
	    }
	    return forward;
	}
		//rest of code depends on answer
	//if we are in check, needs to see if moving this piece can stop check
		//make a list of squares causing check
		//as I look through moves, compare possible moves to squares causing check
	if(square.occupiedBy == "Pawn"){
		if(square.occupiedColor == "black"){
				var j = curBoard[squareID - 10]
            	if(j && j.occupied == false){
            		if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){
						j.highlight();
						var n = curBoard[squareID - 20]
						if(n && n.occupied == false && n.id + 40 >= 90){
							if(((pinned == true || inCheck == true) && n.makesCheck == true && futureCheck(n, square)) || (pinned == false && inCheck == false)){
							  n.highlight();
							}
						}            			
            		}
            	}
            	//attacking mvoes
            	var j = curBoard[squareID - 11]
                if(j && j.occupied == true && j.occupiedColor != square.occupiedColor){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){	
                    	j.highlight()
                    }
                }
            	var j = curBoard[squareID - 9]
                if(j && j.occupied == true && j.occupiedColor != square.occupiedColor){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){	
                    	j.highlight()
                    }
                }
                //en pessant

            	var j = curBoard[squareID + 1]
            	var enP = curBoard[squareID - 9]
                if(j && j.occupiedBy == "Pawn" && j.occupiedColor != square.occupiedColor && square.id + 50 >= 90 && square.id + 50 < 100){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheckP(j, square, enP)) || (pinned == false && inCheck == false)){	
                    	enP.highlight()
                    	enPessants.push(j.id)
                    }
                }
            	var j = curBoard[squareID - 1]
            	var enP = curBoard[squareID - 11]
                if(j && j.occupiedBy == "Pawn" && j.occupiedColor != square.occupiedColor && square.id + 50 >= 90 && square.id + 50 < 100){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheckP(j, square, enP)) || (pinned == false && inCheck == false)){	
                    	enP.highlight()
                    	enPessants.push(j.id)
                    }
                }

		}
	}
	if(square.occupiedBy == "Pawn"){
		if(square.occupiedColor == "white"){

				//forward moves
				var j = curBoard[squareID + 10]
            	if(j && j.occupied == false){
            		if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){
						j.highlight();
						var n = curBoard[squareID + 20]
						if(n && n.occupied == false && n.id - 40 <= 9){
							if(((pinned == true || inCheck == true) && n.makesCheck == true && futureCheck(n, square)) || (pinned == false && inCheck == false)){
							  n.highlight();
							}
						}            			
            		}
            	}
            	//attacking mvoes
            	var j = curBoard[squareID + 11]
                if(j && j.occupied == true && j.occupiedColor != square.occupiedColor){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){	
                    	j.highlight()
                    }
                }
            	var j = curBoard[squareID + 9]
                if(j && j.occupied == true && j.occupiedColor != square.occupiedColor){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){	
                    	j.highlight()
                    }
                }
                //en pessant

            	var j = curBoard[squareID + 1]
            	var enP = curBoard[squareID + 11]
                if(j && j.occupiedBy == "Pawn" && j.occupiedColor != square.occupiedColor && square.id - 50 <= 9 && square.id - 50 > 0){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheckP(j, square, enP)) || (pinned == false && inCheck == false)){	
                    	enP.highlight()
                    	enPessants.push(j.id)
                    }
                }
            	var j = curBoard[squareID - 1]
            	var enP = curBoard[squareID + 9]
                if(j && j.occupiedBy == "Pawn" && j.occupiedColor != square.occupiedColor && square.id - 50 <= 9 && square.id - 50 > 0){
                	if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheckP(j, square, enP)) || (pinned == false && inCheck == false)){	
                    	enP.highlight()
                    	enPessants.push(j.id)
                    }
                }

		}
	}
	//bishop

    if(square.occupiedBy == "Bishop" || square.occupiedBy == "Queen"){
        //top left diagonal
        var forward = true;
        for(var i = squareID + 11; i < 90  && i%10 >= 0 && i%10 <= 7; i+=11){
	        forward = checkSquare(i, forward)
        }

        //bottom left diagonal
        forward = true;
        for(var i = squareID-11; i > 9 && i%10 >= 0 && i%10 <= 7; i-=11){
	        forward = checkSquare(i, forward)
        }

        forward = true;
        for(var i = squareID+9; i < 90 && i%10 >= 0 && i%10 <= 7; i+=9){
        	console.log("in diagonal")
	        forward = checkSquare(i, forward)

        }

        forward = true;
        for(var i = this.squareID-9; i > 9 && i%10 >= 0 && i%10 <= 7; i-=9){
	        forward = checkSquare(i, forward)
        }
    }
	//rook
    if(square.occupiedBy == "Rook" || square.occupiedBy == "Queen"){

        forward = true;
        for(var i = squareID+10; i < 90; i+=10){
	        forward = checkSquare(i, forward)
        }
        forward = true;
        for(var i = squareID-10; i > 9; i-=10){
	        forward = checkSquare(i, forward)
        }
        forward = true;
        for(var i = squareID+1; i%10 <= 7 && i%10 >= 0; i++){
	        forward = checkSquare(i, forward)
        }
        forward = true;
        for(var i = squareID-1; i%10 <= 7 && i%10 >= 0; i--){
	        forward = checkSquare(i, forward)
        }
	}
	//knight
    if(square.occupiedBy == "Knight"){
        var j = curBoard[squareID+21];
        if(j){
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID+19];
        if(j){
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID-21];
        if(j){
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID-19];
        if(j){
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID+12];
        if(j){
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID+8];
        if(j){    
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID-12];
        if(j){
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
        var j = curBoard[squareID-8];
        if(j){        
            if(j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)){
                if(((pinned == true || inCheck == true) && j.makesCheck == true && futureCheck(j, square)) || (pinned == false && inCheck == false)){   
                    j.highlight()
                }  
            }
        }
    }

	//king
	if(square.occupiedBy == "King"){

        var j = curBoard[squareID+10];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID+11];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID+9];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID-10];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID-11];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID-9];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID+1];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        var j = curBoard[squareID-1];
        if(j){
            if(checkCheck(j.id)){
                if((j.occupied == false || (j.occupied == true && j.occupiedColor != square.occupiedColor)) && checkProhibit(j.id) == false){
                    //technically we should check for check Try iterating through all black pieces to see if this square comes up
                    j.highlight();
                }
            }
        }
        //also needs to look for castling
        //right castle
        //if(checkCheck(squareID) && curBoard[squareID].hasChanged == false curBoard[squareID-1].occupied == false && curBoard[squareID-2].occupied == false && curBoard[squareID-1].hasChanged == false){

        //}
	}

}

