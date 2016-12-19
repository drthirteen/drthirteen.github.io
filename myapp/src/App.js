import React, { Component } from 'react';
import './App.css';
import {Bot} from './ai';



class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      player_symbol: "X",
      ai_symbol: "O",
      currentTurn: "X",
      startTurn: "X",
      board: ["", "", "", "", "", "", "", "", ""],
      turnsPlayed: 0,
      gameOver: false,
      bot_difficulty: "Normal",
      winner: "",
      winnerShort: ""
    };
    
  };
  

  clickOnField(index){
    //make sure the user can't click on a already occupied field
    if(this.state.gameOver || this.state.board[index] !== "")
      return;

    
    //add the recently clicked field to the board
    var newBoard = this.state.board;
    newBoard[index] = this.state.currentTurn;
    
    //check if the current player won
    if(this.checkForWinner()){
      return;
    }

    //change turns
    var newTurn = (this.state.currentTurn === this.state.player_symbol) ? this.state.ai_symbol : this.state.player_symbol;
    this.state.currentTurn = newTurn;
    
    //set all the states
    this.setState({
      currentTurn: newTurn,
      board: this.state.board,
      turnsPlayed: this.state.turnsPlayed++
    });

    
  }

  componentDidUpdate(){
    //check if it's the ais turn
    if(this.state.currentTurn === this.state.ai_symbol){
      this.aiTurn();  
    }
  }

  //ai makes a move 
  aiTurn(){
    if(this.state.gameOver && this.state.currentTurn === this.state.player_symbol){
      return;
    }

    //initialize a bot class and pass over the current board, the ai and player symbol as well as the difficulty
    var ai = new Bot(this.state.board, this.state.ai_symbol, this.state.player_symbol, this.state.bot_difficulty);
    //the ai chooses a move
    this.clickOnField(ai.aiMove());
  }
  
  //restart the game and set all states
  restartGame(){
    var startingTurn = this.state.startTurn === this.state.player_symbol ? this.state.ai_symbol : this.state.player_symbol;
    this.setState({
      board: ["", "", "", "", "", "", "", "", ""],
      player_symbol: "X",
      ai_symbol: "O",
      startTurn: startingTurn,
      currentTurn: startingTurn,
      board: ["", "", "", "", "", "", "", "", ""],
      turnsPlayed: 0,
      gameOver: false,
      winnerShort: ""
    });   
  }

  //check if either player or ai is winning
  checkForWinner(){
    //if someone has a winning combination
    if(this.hasWinningCombo()){
      this.setState({
        gameOver: true,
        winner: this.state.currentTurn + " wins!",
        winnerShort: this.state.currentTurn
      });
      return true;
    }
    //if the board is full and no one its a draw
    else if(this.boardIsFull()){
      this.setState({
        gameOver: true,
        winner: " It's a draw!"
      });   
      return true;
    }
    //keep playing since no one won and the board isn't full
    else
    {
      return false;
    }
  }

  //change the difficulty
  changeDifficulty(event){
    this.setState({bot_difficulty: event.target.value});
  }

  //look through all possible winning combinations and check if the current player has won the game
  hasWinningCombo()
  {
    const winningCombos = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for(var i = 0; i < winningCombos.length; i++)
    {
      for(var j = 0; j < winningCombos[i].length; j++){
        var currentComboIndex = winningCombos[i][j];
        if(this.state.board[currentComboIndex] !== this
          .state.currentTurn)
        {
          break;
        }
        if(j >= winningCombos[i].length-1){
          return true;
        } 
      }  
    }
    return false;
  }

  //check if any player can make another move
  boardIsFull()
  {

    for (var i = 0; i < this.state.board.length; i++) {
      if (this.state.board[i] === "") {
        return false;
      }
    }
    return true;
  }

  //render the board
  render() {
    var gameOverScreen;
    if(this.state.gameOver){
      gameOverScreen = <div className="overlay">
                          <div className={"winner" + this.state.winnerShort}>{this.state.winner}</div>
                      </div>;
    }
    return (
      <div>
        {gameOverScreen}
        <div onClick={this.restartGame.bind(this)} className="restart">Restart Game</div>
        <select value={this.state.bot_difficulty} onChange={this.changeDifficulty.bind(this)} className="restart" name="difficulty">
          <option value="Easy">Easy</option>
          <option value="Normal">Normal</option>
          <option value="Unbeatable">Unbeatable</option>
        </select>
        <div className="board">
          {this.state.board.map((field, index)=>{
            return <div onClick={this.clickOnField.bind(this, index)} className={"field"+field}>{field}</div>;
          })}
        </div>
      </div> 
    );
  }
}

export default App;
