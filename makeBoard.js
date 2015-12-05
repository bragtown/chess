

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