JSON Usage!

0. General Info
All of these functions can be found in the updateBoard.js file.
Also, on the game page, you can click on the Get Sample Board button to run the code.
That button calls the setBoard function, which retrieves the data with the getSampleBoard function


1. Creating the JSON folder
For this assignment I logged my game data into my console as a JSON string. Then When I found a good game position,
I stored that data into my checkInThree.json folder.

2. Getting the JSON data
I used the xmlHTTPrequester function to request my JSON string. This happens in the getSampleBoard function.
I then use JSON.parse to turn the JSON into a javascript object.

3. Use the data
in setBoard, it then copies the data into my current game information. it uses the updateLoc to make changes to the board.