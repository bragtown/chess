

function ChessSquare(height, width, color){
  this.height = height;
  this.width = width;
  this.color = color;
  this.makesCheck = false;
  this.id = height*10+width;
  this.highlighted = false;
  this.occupied = false;
  this.occupiedBy = "";
  this.occupiedId = 0;
  this.occupiedColor = "";
  this.hasChanged = false;
  this.unOccupy = function(){
  	this.makesCheck = false;
  	this.highlighted = false;
  	this.occupied = false;
  	this.occupiedBy = "";
  	this.occupiedId = 0;
  	this.occupiedColor = "";
    this.hasChanged = true;
  }
  this.updateLoc = function(){
    if(this.occupied == true){
    	document.getElementById(this.id).innerHTML = '<span class = "piece">'+this.occupiedId+'</span>'
    }
    if(this.occupied == false){
        document.getElementById(this.id).innerHTML = ""
    }
  }
  this.copy = function(){
  	var copyObj = new ChessSquare(height, width, color)
  	copyObj.makesCheck = this.makesCheck
  	copyObj.highlighted = this.highlighted;
  	copyObj.occupied = this.occupied;
  	copyObj.occupiedBy = this.occupiedBy;
  	copyObj.occupiedId = this.occupiedId;
  	copyObj.occupiedColor = this.occupiedColor;
  	return copyObj;
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
}
