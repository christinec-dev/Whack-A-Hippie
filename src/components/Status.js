import React from 'react';

//will display the status of our game throughout round states
export default class Status extends React.Component {
  render() {
    //initial properties of defined functions
    const { gameState, onStart, score, highScore, time } = this.props;
    //will render top piece of game (header) upon each game state
    return (
      //when you click the header, it will start the game
      <div className="Status" onClick={onStart}>
        {
          //game unstarted will render unstarted header with normal heading
          gameState === 'unstarted' ? 
            renderUnstarted()
          //game started will render started header with score and timer
          : gameState === 'started' ? 
            renderStarted(score, time)
          //game over will render over header wiuth final score and highest score
          : gameState === 'gameover' ? 
            renderGameOver(score, highScore)
          : null
        }
      </div>
    );
  }
}

//unstarted game screen with default information
function renderUnstarted() {
  return (
    <div>
      <h1>Whack-A-Hippie</h1> 
      <h3>Stop the Hipster Propaganda! Remote click <span className="clicker">here</span> to start.</h3>
      <div className="flower"></div>
    </div>
  );
}

//started game screen with timer and current score
function renderStarted(score, time) {
  const date = new Date(time),
        format = time => time < 10 ? '0' + time : time,
        minutes = format(date.getMinutes()),
        seconds = format(date.getSeconds());

  return (
    <div>
      <h2 className="score">Current Score: {score}</h2>
      <h3 className="time">Time Left: {minutes}:{seconds}</h3>
    </div>  
  );
}

//game over screen with final score and highest score acheived
function renderGameOver(score, highScore) {
  return (
    <div>
      <h1>Game Over</h1> 
      {/*Will display final score for curent round */}
      <h3 className="results"> You stopped {score} Hipsters dude!</h3>
      {/*Will show high score stored in Local Browser Storage */}
      {
        score > highScore ?
        <h2 className="groovy"> Groovy, you got a new High Score! </h2>
        : 
        <h2 className="groovy"> Groovy, your Highest Score is: {highScore} points </h2>
      }
      {/*Will allow player to restart game */}
      <h2 className="replay"><span className="clicker"><i class="fas fa-play"></i></span> Try Again? </h2>
    </div>
  );
}
