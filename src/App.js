import React from 'react';
import Game from './components/Game';
import Status from './components/Status';

export default class App extends React.Component {
  render() {
    //initial properties of already defined functions
    const {state, onStart, onHippieClick} = this.props;
    //initial state of already defined functions
    const {hippies, gameState, score, highScore, time} = state;

    return (
      <div className="App">
        {/*Will display the game status per each round*/}
        <Status 
          onStart={onStart}
          gameState={gameState}
          score={score}
          highScore={highScore}
          time={time}
        />       
        {/*Will display the game objects per round */}
        <Game 
          hippies={hippies} 
          onHippieClick={onHippieClick}
          gameState={gameState}
        />
      </div>
    );
  }
}