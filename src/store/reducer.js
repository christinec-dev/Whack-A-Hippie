//Our Reducer file will contain all functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState.

//Immutable will allow our Redux state to become an immutable solution, in other words, every update creates new value, leaving the old object or value unchangeed
import Immutable from 'seamless-immutable';
//Lodash is a JavaScript library which provides utility functions for common programming tasks, such as simplifying strings, numbers, arrays, functions and objects. 
import _ from 'lodash';

//Sets the initial states of our Game
const initialState = Immutable({
  //initial state of the game is new game/unstarted
  gameState: 'unstarted',          
  //initial number of hippies(screens) to display is 10 and the hippies will be hidden(in)                  
  hippies: _.times(10, i => ({ index: i, hippieState: 'in' })),
  //initial/default time of our game is 3000ms or 30 seconds
  gameLength: 30000,
});

//exports our main reducer function and passes the actions and initialState props to it
export default function reducer(state=initialState, action) {

//actions can be thought of as an event (usually with a type) that happens in the application.

  //we will switch between the game states using action.type to see when it needs to update the immutable state
  switch (action.type) {
    //case if the game starts, we start the game with a new round
    case 'GAMESTATE_START': 
      return state
        //game has started
        .set('gameState', 'started')
        //score is equal to 0
        .set('score', 0)
        //timer is initialized
        .set('time', state.gameLength)
        //the game will store the High Score acheived by the player in the Local Browser Storage
        .set('highScore', localStorage.getItem('highScore') || 0)
        //will initialize the display of the hippies on randomized basis
        .set('hippies', state.hippies.map(hippie => hippie.set('hippieState', 'in')));

    //case if the game starts, then the timer will count down 1000ms (1s)
    case 'TICK': 
      return state.update('time', time => time - 1000);

    //if the game ends, it updates the High Score stored in the Local Browser Storage
    case 'GAMESTATE_END': 
      if (state.score > state.highScore) {
        localStorage.setItem('highScore', state.score);
      }
      //it will also end the game by updating the state to game over and hiding the hippies again
      return state
        .set('gameState', 'gameover')
        .set('hippies', state.hippies.map(hippie => hippie.set('hippieState', 'in')));

    //case if the hippies' state is 'out', then they will be displayed
    case 'HIPPIE_COMES_OUT':
      return state
        .setIn(['hippies', action.index, 'hippieState'], 'out');

    //case if the hippies' state is 'in', then they will be hidden again
    case 'HIPPIE_GOES_IN':
      return state
        .setIn(['hippies', action.index, 'hippieState'], 'in');

    ////case if the hippies' are being hit with cursor, then the score will update with 1
    case 'HIPPIE_HIT':
      return state
        .setIn(['hippies', action.index, 'hippieState'], 'hit')
        .update('score', score => score + 1);

    //default state is initialState
    default:
      return state;
  }
}