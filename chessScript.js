
    //initialize the chess board
    var board; 
    var height = 8;
    var width = 8;
    var selectedPiece = 0;
    var turn = true;
    var justSelected = 0;
    var prohibited = [];
    var enPessants = [];
    var turnNo = 0;
    var blackChecked = false;
    var whiteChecked = false;
    var duplicatePieces = [];
    //square constructor
    function ChessSquare(height, width, color){
        this.height = height;
        this.width = width;
        this.color = color;
        this.id = height*10+width
        this.highlighted = false;
        this.occupied = false;
        this.occupiedBy = "";
        this.occupiedId = 0;
        this.occupiedColor = "";
        this.removePiece = function(){
            if(this.occupied == true){
                p = chessPieces[this.occupiedId];
                p.location = 0;
            }
        }
        this.occupy = function(pieceString, pieceId, pieceColor){
            this.removePiece();
            if(document.getElementById(this.id).classList.contains("bEnPess")){
                chessSquares[this.id + 10].unOccupy()
                document.getElementById(this.id).classList.remove("bEnPess")
            }
            if(document.getElementById(this.id).classList.contains("wEnPess")){
                chessSquares[this.id - 10].unOccupy()
                document.getElementById(this.id).classList.remove("wEnPess")
            }
            this.occupied = true;
            this.occupiedBy = pieceString;
            this.occupiedId = pieceId;
            this.occupiedColor = pieceColor;
            if(pieceId < 30){
                this.occupiedColor = "white"
            }
            else{
                this.occupiedColor = "black"
            }
            params = "'"+pieceString+"', '"+this.id+"', '"+pieceId+"', '"+this.occupiedColor+"'";
            document.getElementById(this.id).innerHTML = '<span class = "piece">'+pieceString+'</span>'
        }
        this.unOccupy = function(){
            this.removePiece();
            this.occupied = false;
            this.occupiedBy = "";
            this.occupiedColor = "";
            document.getElementById(this.id).innerHTML = ""
        }
        this.highlight = function(){
            myClass = document.getElementById(this.id);
            myClass.className += " highlighted";
            this.highlighted = true;
        }
        this.unHighlight = function(){
            myClass = document.getElementById(this.id);
            myClass.classList.remove("highlighted");
            this.highlighted = false;
        }
        // have a function similar to  highlight that marks a square for en passant
        //add something to track if a square is marked for en passant
    }
    //square array
    chessSquares = [];

    //piece constructor
    function ChessPiece(name, color, location){
        this.name = name;
        this.color = color;
        this.location = location;
        this.id = location;
        this.code = getStartCode(location);
        this.startLoc = function(){
            chessSquares[this.location].occupy(this.code, this.id, this.color);
        }   
        this.changeLoc = function(newLoc){
            chessSquares[this.location].unOccupy();
            chessSquares[newLoc].occupy(this.code, this.id);
            this.location = newLoc;
            justSelected = newLoc;
            if(turn == true){
            kingLoc = chessPieces[83].location
                if(checkCheck(kingLoc) == false){
                    blackChecked = true;
                }
                else{
                    blackChecked = false;
                }
            }
            if(turn == false){
            kingLoc = chessPieces[13].location
                if(checkCheck(kingLoc) == false){
                    whiteChecked = true;
                    //need new algorithm to check for checkmate
                }
                else{
                    whiteChecked = false;
                }
            }

            turn = !turn;
            if(turn == false){
                turnNo++;
                //make change to dom indicating new turn
            }

        }
        this.getMoves = function(){
            //needs to iterate through chess squares and unhighlight all squares
            for(i in chessSquares){
                v = chessSquares[i];
                if(v.highlighted == true){
                    v.unHighlight()
                }
            }
            for(i in enPessants){
                v = enPessants[i]
                document.getElementById(v).classList.remove("bEnPess")
                document.getElementById(v).classList.remove("wEnPess")
            }
            //highlight selected square
            chessSquares[this.location].highlight();
            //checks kings moves
            if(this.name == "King"){
                checkCheck(this.location);
                var i = this.location+10;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location+11;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location+9;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location-10;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location-11;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location-9;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location+1;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                var i = this.location-1;
                if(chessSquares[i]){
                    if(checkCheck(i)){
                        if((chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)) && checkProhibit(i) == false){
                            //technically we should check for check Try iterating through all black pieces to see if this square comes up
                            chessSquares[i].highlight();
                        }
                    }
                }
                //check for castling. Needs to see if their is a threat that passes through path
                // if(location == id){
                //  if(this.color == "white"){
                //      if(chessPieces[17].location == chessPieces[17].id){
                //          i = abs(chessPieces[17].location - chessPieces[17].id);
                //          for(j = 2; j > i; j++){
                //              s = location-j;
                //              if(chessSquares[s].occupied == true
                //          }
                //      }
                //  }
                // }
            }
            //checks knight
            if(this.name == "Knight"){
                var i = this.location+21;
                if(chessSquares[i]){
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location+19;
                if(chessSquares[i]){
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location-21;
                if(chessSquares[i]){
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location-19;
                if(chessSquares[i]){
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location+12;
                if(chessSquares[i]){
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location+8;
                if(chessSquares[i]){    
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location-12;
                if(chessSquares[i]){
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
                var i = this.location-8;

                if(chessSquares[i]){        
                    if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color)){
                        chessSquares[i].highlight();
                    }
                }
            }
            //checks bishop
            if(this.name == "Bishop" || this.name == "Queen"){
                //top left diagonal
                forward = true;
                for(var i = this.location + 11; i < 90  && i%10 >= 0 && i%10 <= 7; i+=11){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
                //bottom left diagonal
                forward = true;
                for(var i = this.location-11; i > 9 && i%10 >= 0 && i%10 <= 7; i-=11){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                            
                    }
                    else{
                        forward = false;
                    }
                }
                //top right diagonal
                forward = true;
                for(var i = this.location+9; i < 90 && i%10 >= 0 && i%10 <= 7; i+=9){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i] && chessSquares[i].occupied == true && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
                //bottom right diagonal
                forward = true;
                for(var i = this.location-9; i > 9 && i%10 >= 0 && i%10 <= 7; i-=9){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
            }

            //checks rook
            if(this.name == "Rook" || this.name == "Queen"){
                forward = true;
                for(var i = this.location+10; i < 90; i+=10){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
                forward = true;
                for(var i = this.location-10; i > 9; i-=10){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
                forward = true;
                for(var i = this.location+1; i%10 <= 7 && i%10 >= 0; i++){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
                forward = true;
                for(var i = this.location-1; i%10 <= 7 && i%10 >= 0; i--){
                    if(forward && chessSquares[i].occupied == false){
                        chessSquares[i].highlight();
                    }
                    else if(forward && chessSquares[i].occupied == true && chessSquares[i] && chessSquares[i].occupiedColor != this.color){
                        forward = false;
                        chessSquares[i].highlight();                                
                    }
                    else{
                        forward = false;
                    }
                }
            }

            //checks white pawn
            if(this.name == "Pawn" && this.color == "white"){
                if(chessSquares[this.location+10].occupied == false){
                    chessSquares[this.location+10].highlight()
                    if(chessSquares[this.location+20].occupied == false && this.location - 20 <= 9){
                        chessSquares[this.location+20].highlight()
                    }
                }
                //en pessant
                if(chessSquares[this.location+1] && chessSquares[this.location+1].occupiedBy == "&#9823;" && chessSquares[this.location+1].occupiedColor == "black" && this.location - 50 <= 9 && this.location - 50 > 0){
                    chessSquares[this.location+11].highlight();
                    //mark for en pessant (add a class)
                    document.getElementById(this.location + 11).classList.add("wEnPess")
                    enPessants.push(this.location + 11)
                }
                if(chessSquares[this.location-1] && chessSquares[this.location-1].occupiedBy == "&#9823;" && chessSquares[this.location-1].occupiedColor == "black" && this.location - 50 <= 9 && this.location - 50 > 0){
                    chessSquares[this.location+9].highlight();
                    //mark for en pessant (add a class)
                    document.getElementById(this.location + 9).classList.add("wEnPess")
                    enPessants.push(this.location + 9)
                }
                if(chessSquares[this.location+11] && chessSquares[this.location+11].occupied == true && chessSquares[this.location+11].occupiedColor == "black"){
                    chessSquares[this.location+11].highlight()
                }
                if(chessSquares[this.location+9] && chessSquares[this.location+9].occupied == true && chessSquares[this.location+9].occupiedColor == "black"){
                    chessSquares[this.location+9].highlight()
                }

            }
            //checks black pawn
            if(this.name == "Pawn" && this.color == "black"){
                if(chessSquares[this.location-10].occupied == false){
                    chessSquares[this.location-10].highlight()
                    if(chessSquares[this.location-20].occupied == false && this.location + 20 >= 90){
                        chessSquares[this.location-20].highlight()
                    }
                }
                if(chessSquares[this.location+1] && chessSquares[this.location+1].occupiedBy == "&#9817;" && chessSquares[this.location+1].occupiedColor == "white" && this.location + 50 >= 90 && this.location + 50 < 100){
                    chessSquares[this.location-9].highlight();
                    document.getElementById(this.location - 9).classList.add("bEnPess")
                    enPessants.push(this.location - 9)
                }
                if(chessSquares[this.location-1] && chessSquares[this.location-1].occupiedBy == "&#9817;" && chessSquares[this.location-1].occupiedColor == "white" && this.location + 50 >= 90 && this.location + 50 < 100){
                    chessSquares[this.location-11].highlight();
                    document.getElementById(this.location - 11).classList.add("bEnPess")
                    enPessants.push(this.location - 11)
                }
                if(chessSquares[this.location-11] && chessSquares[this.location-11].occupied == true && chessSquares[this.location-11].occupiedColor == "white"){
                    chessSquares[this.location-11].highlight()
                }
                if(chessSquares[this.location-9] && chessSquares[this.location-9].occupied == true && chessSquares[this.location-9].occupiedColor == "white"){
                    chessSquares[this.location-9].highlight()
                }

            }
        }

    } 
    //check for check - returns bool
    checkCheck = function(squareID){
        //loop through all of opposite color pieces that are not set to 0
        unChecked = true;
        if(turn == true){
            whiteCheck();
            return unChecked;
        }
        else{
            blackCheck();
            return unChecked;
        }
        return unChecked;
        function whiteCheck(){          
            for(s in chessPieces){
                if(chessPieces[s].location != 0 && chessPieces[s].id >= 70){
                    v = chessPieces[s];
                    //pawn
                    if(v.name == "Pawn" && v.color == "black"){         
                        if(chessSquares[v.location-11] && chessSquares[v.location-11].id == squareID){
                            unChecked = false;
                        }
                        if(chessSquares[v.location-9] && chessSquares[v.location-9].id == squareID){
                            unChecked = false;
                        }
                    }
                        //rook
                    if(v.name == "Rook" || v.name == "Queen"){
                        forward = true;

                        for(var i = v.location+10; i < 90; i+=10){

                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+20)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                prohibited.push(i+10)
                                unChecked = false;              
                            }
                            else{
                                forward = false;
                            }
                        }
                        forward = true;
                        for(var i = v.location-10; i > 9; i-=10){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-20)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;
                                prohibited.push(i-10)               
                            }
                            else{
                                forward = false;
                            }
                        }
                        forward = true;
                        for(var i = v.location+1; i%10 <= 7 && i%10 >= 0; i++){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+2)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;
                                prohibited.push(i+1)            
                            }
                            else{
                                forward = false;
                            }
                        }
                        forward = true;
                        for(var i = v.location-1; i%10 <= 7 && i%10 >= 0; i--){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-2)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                prohibited.push(i-1)
                                unChecked = false;              
                            }
                            else{
                                forward = false;
                            }
                    
                        }


                    }
                    //bishop
                    if(v.name == "Bishop" || v.name == "Queen"){
                        //top left diagonal
                        forward = true;
                        for(var i = v.location + 11; i < 90  && i%10 >= 0 && i%10 <= 7; i+=11){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+22)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;  
                                prohibited.push(i+11)                           
                            }
                            else{
                                forward = false;
                            }
                        }
                        //bottom left diagonal
                        forward = true;
                        for(var i = v.location-11; i > 9 && i%10 >= 0 && i%10 <= 7; i-=11){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-22)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;   
                                prohibited.push(i-11)                       
                            }
                            else{
                                forward = false;
                            }
                        }
                        //top right diagonal
                        forward = true;
                        for(var i = v.location+9; i < 90 && i%10 >= 0 && i%10 <= 7; i+=9){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+18)
                                }
                            }
                            else if(forward && chessSquares[i] && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;  
                                prohibited.push(i+9)                            
                            }
                            else{
                                forward = false;
                            }
                        }
                        //bottom right diagonal
                        forward = true;
                        for(var i = v.location-9; i > 9 && i%10 >= 0 && i%10 <= 7; i-=9){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-18)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;  
                                prohibited.push(i-9)                            
                            }
                            else{
                                forward = false;
                            }
                        }
                    }
                    //knight
                    if(v.name == "Knight"){
                        var i = v.location+21;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location+19;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-21;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-19;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location+12;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location+8;
                        if(chessSquares[i] && chessSquares[i].id == squareID){      
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-12;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-8;

                        if(chessSquares[i] && chessSquares[i].id == squareID){      
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                    }
                    //king
                    if(v.name == "King"){
                        var i = v.location+10;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location+11;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location+9;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-10;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-11;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-9;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location+1;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                        var i = v.location-1;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unChecked = false;
                            }
                        }
                    }
                    
                }
            }
        }
        function blackCheck(){
            for(s in chessPieces){
                if(chessPieces[s].location != 0 && chessPieces[s].id <= 30){
                
                    v = chessPieces[s];
                    //pawn
                    if(v.name == "Pawn" && v.color == "white"){                     
                        if(chessSquares[v.location+11] && chessSquares[v.location+11].id == squareID){
                            unchecked = false;
                        }
                        if(chessSquares[v.location+9] && chessSquares[v.location+9].id == squareID){
                            unchecked = false;
                        }
                    }
                        //rook
                    if(v.name == "Rook" || v.name == "Queen"){
                        forward = true;

                        for(var i = v.location+10; i < 90; i+=10){

                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+20)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                prohibited.push(i+10)
                                unChecked = false;              
                            }
                            else{
                                forward = false;
                            }
                        }
                        forward = true;
                        for(var i = v.location-10; i > 9; i-=10){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-20)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;
                                prohibited.push(i-10)               
                            }
                            else{
                                forward = false;
                            }
                        }
                        forward = true;
                        for(var i = v.location+1; i%10 <= 7 && i%10 >= 0; i++){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+2)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;
                                prohibited.push(i+1)            
                            }
                            else{
                                forward = false;
                            }
                        }
                        forward = true;
                        for(var i = v.location-1; i%10 <= 7 && i%10 >= 0; i--){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-2)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                prohibited.push(i-1)
                                unChecked = false;              
                            }
                            else{
                                forward = false;
                            }
                    
                        }


                    }
                    //bishop
                    if(v.name == "Bishop" || v.name == "Queen"){
                        //top left diagonal
                        forward = true;
                        for(var i = v.location + 11; i < 90  && i%10 >= 0 && i%10 <= 7; i+=11){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+22)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;  
                                prohibited.push(i+11)                           
                            }
                            else{
                                forward = false;
                            }
                        }
                        //bottom left diagonal
                        forward = true;
                        for(var i = v.location-11; i > 9 && i%10 >= 0 && i%10 <= 7; i-=11){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-22)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;   
                                prohibited.push(i-11)                       
                            }
                            else{
                                forward = false;
                            }
                        }
                        //top right diagonal
                        forward = true;
                        for(var i = v.location+9; i < 90 && i%10 >= 0 && i%10 <= 7; i+=9){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i+18)
                                }
                            }
                            else if(forward && chessSquares[i] && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;  
                                prohibited.push(i+9)                            
                            }
                            else{
                                forward = false;
                            }
                        }
                        //bottom right diagonal
                        forward = true;
                        for(var i = v.location-9; i > 9 && i%10 >= 0 && i%10 <= 7; i-=9){
                            if(forward && chessSquares[i].occupied == false){
                                if(chessSquares[i].id == squareID){
                                    unChecked = false;
                                    prohibited.push(i-18)
                                }
                            }
                            else if(forward && chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i] && chessSquares[i].occupiedColor != v.color){
                                forward = false;
                                unChecked = false;  
                                prohibited.push(i-9)                            
                            }
                            else{
                                forward = false;
                            }
                        }
                    }
                    //knight
                    if(v.name == "Knight"){
                        var i = v.location+21;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location+19;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-21;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-19;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location+12;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location+8;
                        if(chessSquares[i] && chessSquares[i].id == squareID){      
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-12;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-8;

                        if(chessSquares[i] && chessSquares[i].id == squareID){      
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].id == squareID && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                    }
                    //king
                    if(v.name == "King"){
                        var i = v.location+10;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location+11;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location+9;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-10;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-11;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-9;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location+1;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                        var i = v.location-1;
                        if(chessSquares[i] && chessSquares[i].id == squareID){
                            if(chessSquares[i].occupied == false || (chessSquares[i].occupied == true && chessSquares[i].occupiedColor != v.color)){
                                unchecked = false;
                            }
                        }
                    }
                }
            }

        }
        //for each piece, check to see if they could move to squareID
        //if they can move to squareID, return true. otherwise, return false.
    }
    var checkProhibit = function(id){
        for(s in prohibited){
            k = prohibited[s];
            if(k == id){
                return true;
            }
        }
        return false;
    }
    var chessPieces = [];
    clickSquare = function(squareID){
        document.getElementById("cellCoord").innerHTML = squareID
        square = chessSquares[squareID];
        ocColor = "black";
        for(s in prohibited){
            prohibited.splice(s, 1)
        }
        if(turn == true){
            ocColor = "white";
        }
        else{
            ocColor == "black";
        }
        if(square.occupied == true && square.occupiedColor == ocColor){
            findMoves(square.occupiedBy, squareID, square.occupiedId, square.occupiedColor)
        }
        else{
            movePiece(squareID);
        }

    }
    //findmoves function
    findMoves = function(code, loc, piece, ocColor){
        if((ocColor == "white" && turn == true) || (ocColor == "black" && turn == false)){
            selectedPiece = piece;
            chessPieces[piece].getMoves();
        }
    }
    movePiece = function(squareID){
        if(chessSquares[squareID].highlighted == true){
            chessPieces[selectedPiece].changeLoc(squareID);
        if(justSelected == squareID){

            for(i in chessSquares){
                v = chessSquares[i];
                if(v.highlighted == true){
                    v.unHighlight()
                }
            } 

        }
        }
    

    }
    //instantiate new chess pieces
    getPieces = function(){
        chessPieces[87] = new ChessPiece("Rook", "black", 87);
        chessPieces[86] = new ChessPiece("Knight", "black", 86);
        chessPieces[85] = new ChessPiece("Bishop", "black", 85);
        chessPieces[84] = new ChessPiece("Queen", "black", 84);
        chessPieces[83] = new ChessPiece("King", "black", 83);
        chessPieces[82] = new ChessPiece("Bishop", "black", 82);
        chessPieces[81] = new ChessPiece("Knight", "black", 81);
        chessPieces[80] = new ChessPiece("Rook", "black", 80);

        chessPieces[77] = new ChessPiece("Pawn", "black", 77);
        chessPieces[76] = new ChessPiece("Pawn", "black", 76);
        chessPieces[75] = new ChessPiece("Pawn", "black", 75);
        chessPieces[74] = new ChessPiece("Pawn", "black", 74);
        chessPieces[73] = new ChessPiece("Pawn", "black", 73);
        chessPieces[72] = new ChessPiece("Pawn", "black", 72);
        chessPieces[71] = new ChessPiece("Pawn", "black", 71);
        chessPieces[70] = new ChessPiece("Pawn", "black", 70);

        chessPieces[27] = new ChessPiece("Pawn", "white", 27);
        chessPieces[26] = new ChessPiece("Pawn", "white", 26);
        chessPieces[25] = new ChessPiece("Pawn", "white", 25);
        chessPieces[24] = new ChessPiece("Pawn", "white", 24);
        chessPieces[23] = new ChessPiece("Pawn", "white", 23);
        chessPieces[22] = new ChessPiece("Pawn", "white", 22);
        chessPieces[21] = new ChessPiece("Pawn", "white", 21);
        chessPieces[20] = new ChessPiece("Pawn", "white", 20);

        chessPieces[17] = new ChessPiece("Rook", "white", 17);
        chessPieces[16] = new ChessPiece("Knight", "white", 16);
        chessPieces[15] = new ChessPiece("Bishop", "white", 15);
        chessPieces[14] = new ChessPiece("Queen", "white", 14);
        chessPieces[13] = new ChessPiece("King", "white", 13);
        chessPieces[12] = new ChessPiece("Bishop", "white", 12);
        chessPieces[11] = new ChessPiece("Knight", "white", 11);
        chessPieces[10] = new ChessPiece("Rook", "white", 10);
    }
    getStartCode = function(loc){
        if(loc == 87){
            return "&#9820;";
        }
        else if(loc == 86){
            return "&#9822;";
        }
        else if(loc == 85){
            return "&#9821;";
        }
        else if(loc == 84){
            return "&#9819;";
        }
        else if(loc == 83){
            return "&#9818;";
        }
        else if(loc == 82){
            return "&#9821;";
        }
        else if(loc == 81){
            return "&#9822;";
        }
        else if(loc == 80){
            return "&#9820;";
        }
        else if(loc <= 77 && loc >= 70){
            return "&#9823;";
        }
        else if(loc <= 27 && loc >= 20){
            return "&#9817;";
        }
        else if(loc == 17){
            return "&#9814;";
        }
        else if(loc == 16){
            return "&#9816;";
        }
        else if(loc == 15){
            return "&#9815;";
        }
        else if(loc == 14){
            return "&#9813;";
        }
        else if(loc == 13){
            return "&#9812;";
        }
        else if(loc == 12){
            return "&#9815;";
        }
        else if(loc == 11){
            return "&#9816;";
        }
        else if(loc == 10){
            return "&#9814;";
        }

    }
    drawboard = function(){
        board = document.getElementById("myBoard")
        boardHTML = '<table>'
        for(i = height; i >= 0; i--){
            boardHTML += '<tr>';
            if(i == 0){
                boardHTML += '<td></td>';
                boardHTML += '<td>A</td>';
                boardHTML += '<td>B</td>';
                boardHTML += '<td>C</td>';
                boardHTML += '<td>D</td>';
                boardHTML += '<td>E</td>';
                boardHTML += '<td>F</td>';
                boardHTML += '<td>G</td>';
                boardHTML += '<td>H</td>';
            }
            else{
                for(j = width; j >= 0; j--){
                    
                    if(j == width){
                        boardHTML += '<td>'+i+'</td>';
                    }
                    else{
                        squareClass = 'white';
                        if((j+i)%2 == 1){
                            squareClass = 'black';
                        }
                        squareID = i*10+j
                        chessSquares[squareID] = new ChessSquare(i, j, squareClass)
                        boardHTML += '<td class = "'+squareClass+' square" id = "'+squareID+'" onclick = "clickSquare('+squareID+')"></td>';
                    }
            
                }
            }
            boardHTML += '</tr>';
        }
        boardHTML+= '</table>'; 
        board.innerHTML = boardHTML;
        getPieces();
        for(s in chessPieces){
            chessPieces[s].startLoc();
        }
        console.log(chessSquares)
        console.log(chessSquares[47])
        console.log(chessPieces)
    }



