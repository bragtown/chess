
    drawboard = function(){
        board = document.getElementById("myBoard")
        boardHTML = '<table>'
        document.getElementById('userInfo').innerHTML = localStorage.getItem('cs2550timestamp');
        
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
                        curBoard[squareID] = new ChessSquare(i, j, squareClass)
                        boardHTML += '<td class = "'+squareClass+' square" id = "'+squareID+'" onclick = "clickSquare('+squareID+')"></td>';
                    }
            
                }
            }
            boardHTML += '</tr>';
        }
        boardHTML+= '</table><h2>Turn: <span id = "turn">White</span></h2>'; 
        board.innerHTML = boardHTML;
        getPieces();
        for(s in chessPieces){
            chessPieces[s].startLoc();
        }
        update();
    }

      