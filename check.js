
//checks for check

var checkProhibit = function(id){
    for(s in prohibited){
        k = prohibited[s];
        if(k == id){
            return true;
        }
    }
    return false;
}

futureCheck = function(newSq, oldSq){
	var tempNew = newSq.copy();
	var tempOld = oldSq.copy();
	newSq.occupied = oldSq.occupied
	newSq.occupiedBy = oldSq.occupiedBy
	newSq.occupiedId = oldSq.occupiedId
	newSq.occupiedColor = oldSq.occupiedColor
	oldSq.unOccupy();
	var result = checkCheck(kingLoc)


	oldSq = tempOld;
	newSq = tempNew;
	curBoard[tempOld.id] = tempOld;
	curBoard[tempNew.id] = tempNew;
	return result;
}
futureCheckP = function(newSq, oldSq, enP){
	var tempNew = newSq.copy();
	var tempOld = oldSq.copy();
	var tempEnP = enP.copy();

	enP.occupied = oldSq.occupied
	enP.occupiedBy = oldSq.occupiedBy
	enP.occupiedId = oldSq.occupiedId
	enP.occupiedColor = oldSq.occupiedColor
	oldSq.unOccupy();
	newSq.unOccupy();
	result = checkCheck(kingLoc)
	oldSq = tempOld;
	newSq = tempNew;
	enP = tempEnP;
	curBoard[tempOld.id] = tempOld;
	curBoard[tempNew.id] = tempNew;
	curBoard[tempEnP.id] = tempEnP;
	return result;
}

checkCheck = function(squareID){
	//use square id to get a piece
	//this should only work on the next board. 
	//should look through every peice and evaluate 
	//1. if the king is not in check would the king be in check if this piece moved
	//2. if the king is in check can this piece block check?

	//loop through all squares containing opposing pieces

    check = function(turnColor){
    	for(s in curBoard){
    		v = curBoard[s]
			var forward = true;
			var causingCheck = [];
			if(v.occupiedColor != turnColor){
	    		if(v.occupiedColor == "black"){
	    			//pawn
	    			if(v.occupiedBy == "Pawn"){

	                    if(curBoard[v.id-11] && v.id-11 == squareID){
	                        unChecked = false;
	                        makesCheckSquares.push(v.id)
	                        prohibited.push(v.id-11)
	                    }
	                    if(curBoard[v.id-9] && v.id-9 == squareID){
	                        makesCheckSquares.push(v.id)
	                        unChecked = false;
	                        prohibited.push(v.id-9)
	                    }

	    			}
	    		}
	    		else if(v.occupiedColor == "white"){
	    			if(v.occupiedBy == "Pawn"){

	                    if(curBoard[v.id+11] && v.id+11 == squareID){
	                        unChecked = false;
	                        makesCheckSquares.push(v.id)
	                        prohibited.push(v.id+11)
	                    }
	                    if(curBoard[v.id+9] && v.id+9 == squareID){
	                        makesCheckSquares.push(v.id)
	                        unChecked = false;
	                        prohibited.push(v.id+9)
	                    }

	    			}

	    		}
				//rook
				if(v.occupiedBy == "Rook" || v.occupiedBy == "Queen"){

					//up
					forward = true;
					causingCheck = [];
					for(var i = v.id+10; i < 90; i+=10){
						var j = curBoard[i]
						causingCheck.push(i);
						if(forward && j.occupied == false){
							if(i == squareID){
								unChecked = false;
								prohibited.push(i+20)
							}
						}
						else if(forward && j && j.occupied == true && i == squareID && j.occupiedColor != v.occupiedColor){
							forward = false;
							prohibited.push(i+10)
							unChecked = false;
							if(j.occupiedBy == "King"){
								causingCheck.pop()
								for(l in causingCheck){
									m = causingCheck[l]
									curBoard[m].makesCheck = true;
									makesCheckSquares.push(m)
								}
							} 
						}
						else{
							forward = false;
						}
					}
					//down
	                forward = true;
	                causingCheck = [];
	                for(var i = v.id-10; i > 9; i-=10){
						var j = curBoard[i]
						causingCheck.push(i);
	                    if(forward && j.occupied == false){
	                        if(i == squareID){
	                            unChecked = false;
	                            prohibited.push(i-20)
	                        }
	                    }
	                    else if(forward && j.occupied == true && i == squareID && j && j.occupiedColor != v.occupiedColor){
	                        forward = false;
	                        unChecked = false;
	                        prohibited.push(i-10) 
							if(j.occupiedBy == "King"){
								causingCheck.pop()
								for(l in causingCheck){
									m = causingCheck[l]
									curBoard[m].makesCheck = true;
									makesCheckSquares.push(m)
								}
							}             
	                    }
	                    else{
	                        forward = false;
	                    }
	                }
	                //left
	                forward = true;
	                causingCheck = [];
	                for(var i = v.id+1; i%10 <= 7 && i%10 >= 0; i++){
						var j = curBoard[i]
						causingCheck.push(i);
	                    if(forward && j.occupied == false){
	                        if(i == squareID){
	                            unChecked = false;
	                            prohibited.push(i+2)
	                        }
	                    }
	                    else if(forward && j.occupied == true && i == squareID && j && j.occupiedColor != v.occupiedColor){
	                        forward = false;
	                        unChecked = false;
	                        prohibited.push(i+1) 
							if(j.occupiedBy == "King"){
								causingCheck.pop()
								for(l in causingCheck){
									m = causingCheck[l]
									curBoard[m].makesCheck = true;
									makesCheckSquares.push(m)
								}
							}           
	                    }
	                    else{
	                        forward = false;
	                    }
	                }

	                //right

	                forward = true;
	                causingCheck = [];
	                for(var i = v.id-1; i%10 <= 7 && i%10 >= 0; i--){
						var j = curBoard[i]
						causingCheck.push(i);
	                    if(forward && j.occupied == false){
	                        if(j.id == squareID){
	                            unChecked = false;
	                            prohibited.push(i-2)
	                        }
	                    }
	                    else if(forward && j.occupied == true && i == squareID && j && j.occupiedColor != v.occupiedColor){
	                        forward = false;
	                        prohibited.push(i-1)
	                        unChecked = false; 
							if(j.occupiedBy == "King"){
								causingCheck.pop()
								for(l in causingCheck){
									m = causingCheck[l]
									curBoard[m].makesCheck = true;
									makesCheckSquares.push(m)
								}
							}              
	                    }
	                    else{
	                        forward = false;
	                    }
	            
	                }

				}
				//bishop
	            if(v.occupiedBy == "Bishop" || v.occupiedBy == "Queen"){

	                    
	                    forward = true;
	                    causingCheck = [];
	                    for(var i = v.id + 11; i < 90  && i%10 >= 0 && i%10 <= 7; i+=11){
	                        var j = curBoard[i];
							causingCheck.push(i);
	                        if(forward && j.occupied == false){
	                            if(i == squareID){
	                                unChecked = false;
	                                prohibited.push(i+22)
	                            }
	                        }
	                        else if(forward && j.occupied == true && i == squareID && j && j.occupiedColor != v.occupiedColor){
	                            forward = false;
	                            unChecked = false;  
	                            if(j.occupiedBy == "King"){
	                                causingCheck.pop()
	                                for(l in causingCheck){
	                                    m = causingCheck[l]
	                                    curBoard[m].makesCheck = true;
	                                    makesCheckSquares.push(m)
	                                }
	                            } 
	                            prohibited.push(i+11)                           
	                        }
	                        else{
	                            forward = false;
	                        }
	                    }
	                    //bottom left diagonal
	                    
	                    forward = true;
	                    causingCheck = [];
	                    for(var i = v.id-11; i > 9 && i%10 >= 0 && i%10 <= 7; i-=11){
	                        var j = curBoard[i];
							causingCheck.push(i);
	                        if(forward && j.occupied == false){
	                            if(i == squareID){
	                                unChecked = false;
	                                prohibited.push(i-22)
	                            }
	                        }
	                        else if(forward && j.occupied == true && i == squareID && j && j.occupiedColor != v.occupiedColor){
	                            forward = false;
	                            unChecked = false;   
	                            if(j.occupiedBy == "King"){
	                                causingCheck.pop()
	                                for(l in causingCheck){
	                                    m = causingCheck[l]
	                                    curBoard[m].makesCheck = true;
	                                    makesCheckSquares.push(m)
	                                }
	                            } 
	                            prohibited.push(i-11)                       
	                        }
	                        else{
	                            forward = false;
	                        }
	                    }
	                    //top right diagonal
	                    
	                    forward = true;
	                    causingCheck = [];
	                    for(var i = v.id+9; i < 90 && i%10 >= 0 && i%10 <= 7; i+=9){
	                        var j = curBoard[i];
							causingCheck.push(i);
	                        if(forward && j.occupied == false){
	                            if(i == squareID){
	                                unChecked = false;
	                                prohibited.push(i+18)
	                            }
	                        }
	                        else if(forward && j && j.occupied == true && i == squareID && j.occupiedColor != v.occupiedColor){
	                            forward = false;
	                            unChecked = false;  
	                            if(j.occupiedBy == "King"){
	                                causingCheck.pop()
	                                for(l in causingCheck){
	                                    m = causingCheck[l]
	                                    curBoard[m].makesCheck = true;
	                                    makesCheckSquares.push(m)
	                                }
	                            } 
	                            prohibited.push(i+9)                            
	                        }
	                        else{
	                            forward = false;
	                        }
	                    }
	                    //bottom right diagonal
	                    
	                    forward = true;
	                    causingCheck = [];
	                    for(var i = v.id-9; i > 9 && i%10 >= 0 && i%10 <= 7; i-=9){
	                        var j = curBoard[i];
							causingCheck.push(i);
	                        if(forward && j.occupied == false){
	                            if(i == squareID){
	                                unChecked = false;
	                                prohibited.push(i-18)
	                            }
	                        }
	                        else if(forward && j.occupied == true && i == squareID && j && j.occupiedColor != v.occupiedColor){
	                            forward = false;
	                            unChecked = false;  
	                            if(j.occupiedBy == "King"){
	                                causingCheck.pop()
	                                for(l in causingCheck){
	                                    m = causingCheck[l]
	                                    curBoard[m].makesCheck = true;
	                                    makesCheckSquares.push(m)
	                                }
	                            } 
	                            prohibited.push(i-9)                            
	                        }
	                        else{
	                            forward = false;
	                        }
	                    }
	            }

				//knight
				if(v.occupiedBy == "Knight"){

	                    var i = v.id+21;
	                    j == curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id+19;
	                    j == curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id-21;
	                    j == curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id-19;
	                    j == curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id+12;
	                    j == curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id+8;
	                    j == curBoard[i]
	                    if(j && i == squareID){      
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id-12;
	                    j == curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
	                    var i = v.id-8;
						j == curBoard[i]
	                    if(j && i == squareID){      
	                        if(j.occupied == false || (j.occupied == true && i == squareID && j.occupiedColor != v.color)){
	                            unChecked = false;
	                            if(j.occupied == true && j.occupiedBy == "King"){
	                                v.makesCheck = true;
	                                makesCheckSquares.push(v.id)
	                            }
	                        }
	                    }
				}
				//king
				if(v.occupiedBy == "King"){

	                    var i = v.id+10;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id+11;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id+9;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id-10;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id-11;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id-9;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id+1;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
	                    var i = v.id-1;
	                    var j = curBoard[i]
	                    if(j && i == squareID){
	                        if(j.occupied == false || (j.occupied == true && j.occupiedColor != v.occupiedColor)){
	                            unChecked = false;
	                            prohibited.push(i)
	                            

	                        }
	                    }
				}
    		}
    	}
    }
    unChecked = true;
    if(turn == true){
        check("white");
        return unChecked;
    }
    else{
        check("black");
        return unChecked;
    }
    return unChecked;
}
