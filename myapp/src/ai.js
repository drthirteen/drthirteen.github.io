
//Bot class needs the current gameboard, the ai's symbol, the player's symbol and the selected difficulty
export class Bot {
  constructor(gameBoard, ai_symbol, player_symbol, difficulty){
    this.board = gameBoard;
    this.ai_symbol = ai_symbol;
    this.player_symbol = player_symbol;
    this.difficulty = difficulty;
  }

  //choose a move depending on the selected difficulty
  aiMove(){

    if(this.difficulty === "Easy"){
      return this.aiEasyMove();
    }
    else if(this.difficulty === "Normal"){
      return this.aiNormalMove();
    }
    else{
      return this.aiPerfectMove();
    }
  }

  //only basic moves, easy to beat 
  aiEasyMove(){
    
    //check if the ai can win 
    var index = this.win()
    if(index >= 0){
      console.log("win " + index);
      return index;
    }
    //place at an empty corner
    index = this.emptyCorner();
    if(index >= 0){
      console.log("emptyCorner " + index);
      return index;
    }
    //place in the center
    index = this.center();
    if(index >= 0){
      console.log("center " + index);
      return index;
    }
    //place a symbol on an empzty side
    index = this.emptySide();
    if(index >= 0){
      console.log("emptySide " + index);
      return index;
    }
  }

  //more advanced moves, plays like the average player
  aiNormalMove(){

    //check if the ai can win 
    var index = this.win()
    if(index >= 0){
      console.log("win " + index);
      return index;
    }
    //check if the ai has to block the enemy from winning
    index = this.block();
    if(index >= 0){
      console.log("block " + index);
      return index;
    }
    //place at an empty corner
    index = this.emptyCorner();
    if(index >= 0){
      console.log("emptyCorner " + index);
      return index;
    }
    //place a symbol in the center
    index = this.center();
    if(index >= 0){
      console.log("center " + index);
      return index;
    }
    //place a symbol on an empty side
    index = this.emptySide();
    if(index >= 0){
      console.log("emptySide " + index);
      return index;
    }
  }

  //plays the perfect game and is not beatable
  aiPerfectMove(){
    //check if the ai can win 
    var index = this.win()
    if(index >= 0){
      console.log("win " + index);
      return index;
    }
    //check if the ai has to block the enemy from winning
    index = this.block();
    if(index >= 0){
      console.log("block " + index);
      return index;
    }
    //place symbol to enable a fork
    index = this.fork();
    if(index >= 0){
      console.log("fork "+ index);
      return index;
    }
     //place symbol in the center
    index = this.counterCenter();
    if(index >= 0){
      console.log("counterCenter " + index);
      return index;
    }
    //place symbol to block a possible fork from the opponent
    index = this.blockFork();
    if(index >= 0){
      console.log("blockfork " + index);
      return index;
    }
    //place a symbol at the opposite corner of the player
    index = this.oppositeCorner();
    if(index >= 0){
      console.log("oppositeCorner " + index);
      return index;
    }
    //place at an empty corner
    index = this.emptyCorner();
    if(index >= 0){
      console.log("emptyCorner " + index);
      return index;
    }
    //place symbol in the middle
    index = this.center();
    if(index >= 0){
      console.log("center " + index);
      return index;
    }
    //place a symbol on an emptyside
    index = this.emptySide();
    if(index >= 0){
      console.log("emptySide " + index);
      return index;
    }
  }
  //returns the index of a winning field
  //if there is none return -1
  win(){
    //assign current board to b just to shorten the following expressions
    var b = this.board;
    var ai = this.ai_symbol;
    //diagonal left to right
    if(b[0]===ai && b[4]===ai && b[8]==="")
      return 8;
    if(b[4]===ai && b[8]===ai && b[0]==="")
      return 0;
    if(b[0]===ai && b[8]===ai && b[4]==="")
      return 4;

    //diagonal right to left
    if(b[2]===ai && b[4]===ai && b[6]==="")
      return 6;
    if(b[4]===ai && b[6]===ai && b[2]==="")
      return 2;
    if(b[2]===ai && b[6]===ai && b[4]==="")
      return 4;

    //first row
    if(b[0]===ai && b[1]===ai && b[2]==="")
      return 2;
    if(b[0]===ai && b[2]===ai && b[1]==="")
      return 1;
    if(b[1]===ai && b[2]===ai && b[0]==="")
      return 0;

    //second row
    if(b[3]===ai && b[4]===ai && b[5]==="")
      return 5;
    if(b[3]===ai && b[5]===ai && b[4]==="")
      return 4;
    if(b[4]===ai && b[5]===ai && b[3]==="")
      return 3;

    //third row
    if(b[6]===ai && b[7]===ai && b[8]==="")
      return 8;
    if(b[7]===ai && b[8]===ai && b[6]==="")
      return 6;
    if(b[6]===ai && b[8]===ai && b[7]==="")
      return 7;

    //first column
    if(b[0]===ai && b[3]===ai && b[6]==="")
      return 6;
    if(b[3]===ai && b[6]===ai && b[0]==="")
      return 0;
    if(b[0]===ai && b[6]===ai && b[3]==="")
      return 3;

    //second column
    if(b[1]===ai && b[4]===ai && b[7]==="")
      return 7;
    if(b[1]===ai && b[7]===ai && b[4]==="")
      return 4;
    if(b[4]===ai && b[7]===ai && b[1]==="")
      return 1;

    //third column
    if(b[2]===ai && b[5]===ai && b[8]==="")
      return 8;
    if(b[2]===ai && b[8]===ai && b[5]==="")
      return 5;
    if(b[5]===ai && b[8]===ai && b[2]==="")
      return 2;

    return -1;
  }

  //returns the index of a block that would otherwise lead to a win for the opponent
  //if there is none return -1
  block(){
    //assign current board to b just to shorten the following expressions
    var b = this.board;
    var ai = this.player_symbol;
    //diagonal left to right
    if(b[0]===ai && b[4]===ai && b[8]==="")
      return 8;
    if(b[4]===ai && b[8]===ai && b[0]==="")
      return 0;
    if(b[0]===ai && b[8]===ai && b[4]==="")
      return 4;

    //diagonal right to left
    if(b[2]===ai && b[4]===ai && b[6]==="")
      return 6;
    if(b[4]===ai && b[6]===ai && b[2]==="")
      return 2;
    if(b[2]===ai && b[6]===ai && b[4]==="")
      return 4;

    //first row
    if(b[0]===ai && b[1]===ai && b[2]==="")
      return 2;
    if(b[0]===ai && b[2]===ai && b[1]==="")
      return 1;
    if(b[1]===ai && b[2]===ai && b[0]==="")
      return 0;

    //second row
    if(b[3]===ai && b[4]===ai && b[5]==="")
      return 5;
    if(b[3]===ai && b[5]===ai && b[4]==="")
      return 4;
    if(b[4]===ai && b[5]===ai && b[3]==="")
      return 3;

    //third row
    if(b[6]===ai && b[7]===ai && b[8]==="")
      return 8;
    if(b[7]===ai && b[8]===ai && b[6]==="")
      return 6;
    if(b[6]===ai && b[8]===ai && b[7]==="")
      return 7;

    //first column
    if(b[0]===ai && b[3]===ai && b[6]==="")
      return 6;
    if(b[3]===ai && b[6]===ai && b[0]==="")
      return 0;
    if(b[0]===ai && b[6]===ai && b[3]==="")
      return 3;

    //second column
    if(b[1]===ai && b[4]===ai && b[7]==="")
      return 7;
    if(b[1]===ai && b[7]===ai && b[4]==="")
      return 4;
    if(b[4]===ai && b[7]===ai && b[1]==="")
      return 1;

    //third column
    if(b[2]===ai && b[5]===ai && b[8]==="")
      return 8;
    if(b[2]===ai && b[8]===ai && b[5]==="")
      return 5;
    if(b[5]===ai && b[8]===ai && b[2]==="")
      return 2;

    return -1;
  }

  //a fork means two non blocked lines of 2
  fork(){
    
    //assign current board to b just to shorten the following expressions
    var b = this.board;
    var ai = this.ai_symbol;
    var pl = this.player_symbol;

    if(b[6]===ai && b[7]==="" && b[8]==="" && b[5]==="" && b[2]==="")
      return 2;
    if(b[6]===ai && b[3]==="" && b[0]==="" && b[1]==="" && b[2]==="")
      return 2;

    if(b[0]===ai && b[1]==="" && b[2]==="" && b[5]==="" && b[8]==="")
      return 8;
    if(b[0]===ai && b[3]==="" && b[6]==="" && b[7]==="" && b[8]==="")
      return 8;

    if(b[2]===ai && b[1]==="" && b[0]==="" && b[3]==="" && b[6]==="")
      return 6;
    if(b[2]===ai && b[5]==="" && b[8]==="" && b[7]==="" && b[6]==="")
      return 6;

    if(b[8]===ai && b[5]==="" && b[2]==="" && b[1]==="" && b[0]==="")
      return 0;
    if(b[8]===ai && b[7]==="" && b[6]==="" && b[3]==="" && b[0]==="")
      return 0;

    //if ai owns buttom left and top right
    if(b[6]===ai && b[2]===ai && b[5]==="" && b[7]===""&& b[8]==="")
      return 8;
    if(b[6]===ai && b[2]===ai && b[3]==="" && b[1]==="" && b[0]==="")
      return 0;

    //if ai owns buttom right and top left
    if(b[8]===ai && b[0]===ai && b[3]==="" && b[7]==="" && b[6]==="")
      return 6;
    if(b[8]===ai && b[0]===ai && b[5]==="" && b[1]==="" && b[2]==="")
      return 2;



    return -1;
  }

  //block a possible fork(two non blocked lines of 2) for the opponent
  blockFork(){

    //assign current board to b just to shorten the following expressions
    var b = this.board;
    var ai = this.ai_symbol;
    var pl = this.player_symbol;

    if(b[6]===pl && b[7]==="" && b[8]==="" && b[5]==="" && b[2]==="")
      return 2;
    if(b[6]===pl && b[3]==="" && b[0]==="" && b[1]==="" && b[2]==="")
      return 2;

    if(b[0]===pl && b[1]==="" && b[2]==="" && b[5]==="" && b[8]==="")
      return 8;
    if(b[0]===pl && b[3]==="" && b[6]==="" && b[7]==="" && b[8]==="")
      return 8;

    if(b[2]===pl && b[1]==="" && b[0]==="" && b[3]==="" && b[6]==="")
      return 6;
    if(b[2]===pl && b[5]==="" && b[8]==="" && b[7]==="" && b[6]==="")
      return 6;

    if(b[8]===pl && b[5]==="" && b[2]==="" && b[1]==="" && b[0]==="")
      return 0;
    if(b[8]===pl && b[7]==="" && b[6]==="" && b[3]==="" && b[0]==="")
      return 0;

    if(b[8]===pl && b[0]===pl && b[3] === "")
      return 3;
    if(b[8]===pl && b[0]===pl && b[7] === "")
      return 7;
    if(b[6]===pl && b[2]===pl && b[5] === "")
      return 5;
    if(b[6]===pl && b[2]===pl && b[1] === "")
      return 1;

    return -1;
  }

  emptyCorner(){
    var arrayOfOptions = [];
    if(this.board[0] === "")
      arrayOfOptions.push(0);
    if(this.board[2] === "")
      arrayOfOptions.push(2);
    if(this.board[6] === "")
      arrayOfOptions.push(6);
    if(this.board[8] === "")
      arrayOfOptions.push(8);

    if(arrayOfOptions.length > 0)
      return arrayOfOptions[Math.floor(Math.random()*arrayOfOptions.length)];
    
    return -1;
  }

  //take the center if the player placed on one of the edges
  counterCenter(){

    if((this.board[0] === this.player_symbol || this.board[2] === this.player_symbol || this.board[6] === this.player_symbol || this.board[8] === this.player_symbol) &&  this.board[4] === "")
      return 4;

    return -1;
  }
  
  center(){

    if( this.board[4] === "")
      return 4;

    return -1;
  }

  oppositeCorner(){
    if(this.board[0] === this.player_symbol && this.board[8] === "")
      return 8;
    if(this.board[8] === this.player_symbol && this.board[0] === "")
      return 0;
    if(this.board[2] === this.player_symbol && this.board[6] === "")
      return 6;
    if(this.board[6] === this.player_symbol && this.board[2] === "")
      return 2;
  }

  

  emptySide(){
   var arrayOfOptions = [];
    if(this.board[1] === "")
      arrayOfOptions.push(1);
    if(this.board[3] === "")
      arrayOfOptions.push(3);
    if(this.board[5] === "")
      arrayOfOptions.push(5);
    if(this.board[7] === "")
      arrayOfOptions.push(7);

    if(arrayOfOptions.length > 0)
      return arrayOfOptions[Math.floor(Math.random()*arrayOfOptions.length)];
    
    return -1;
  }
}
