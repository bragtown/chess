

function ChessPiece(name, color, location){
  this.name = name;
  this.color = color;
  this.id = location;
  this.code = getStartCode(location)
  this.startLoc = function(){
  	v = curBoard[this.id];
  	v.occupiedColor = this.color;
  	v.occupiedId = this.code;
  	v.occupiedBy = this.name;
  	v.occupied = true;
  }
}
