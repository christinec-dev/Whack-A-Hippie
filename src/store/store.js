//Our Redux store will bind together all our reducer state functions to compile our app functionality

//Create a new Redux store which will tie together the state, actions, and reducers that make up our app. 
import { createStore } from 'redux';
//Lodash is a JavaScript library which provides utility functions for common programming tasks, such as simplifying strings, numbers, arrays, functions and objects. 
import _ from 'lodash';
//Our reducer file contains our new state functions
import reducer from './reducer.js';

const gameLength = 30000, //will set our game lenght to 30s
      secondLength = 1000, // this will set the time it takes for a new hippie to pop out, ie. 1s
      hippiesPerSecondLow = 1, // minimum amount of hippies per second
      hippiesPerSecondHigh = 5, // maximum amount of hippies per second
      hippieOutLengthLow = 1000, //minimum time a hippie can stay on screen
      hippieOutLengthHigh = 2500; //maximum time a hippie can stay on screen
//initializes our store by passing root reducer functions   
const store = createStore(reducer);

//Will contain the game logic for when we start the game
function startGame() {
  //gets initial state from reducer
  const gameState = store.getState().gameState;

  //if the game has started
  if (gameState !== 'started') {
    //play this sound and update the game to dispatch the GAMESTATE_START action from our reducer.js
    const audio = new Audio(process.env.PUBLIC_URL + '/whack.mp3');
    audio.play();

    //dispatch calls the reducer, saves the state, and runs the listeners
    store.dispatch({ type: 'GAMESTATE_START' });

    //dispatch the TICK action from our reducer.js to initialize the timer
    const clockInterval = setInterval(() => {
      store.dispatch({ type: 'TICK' })
    }, 1000);

    //repeats a the hippies per second at every given time-interval
    const secondsInterval = setInterval(triggerSecond, secondLength);

    // timeout function will end the round, reset game lenght, and clear up the timer/hippies per second by dispatching the GAMESTATE_END action from our reducer.js 
    setTimeout(() => {
      clearInterval(secondsInterval);
      clearInterval(clockInterval);
      store.dispatch({ type: 'GAMESTATE_END' });
    }, gameLength);
  }
}

//will contain the function to trigger the hippies upon each round second
function triggerSecond() {
  //will randomise our hippies between their 'in' and 'out' states to display on the tv, and set the min and max amount of hippies to be shown per hippie display second
  const hippies = store.getState().hippies,
        //_.filter() iterates over our hippies collection, returning an array of all hippie predicate that returns true.
        hippiesIn = _.filter(hippies, hippie => hippie.hippieState === 'in'),
        //_.map() method creates a hippiesIn array of values by running each element in our hippie collection through the iteratee.
        indexList = _.map(hippiesIn, hippie => hippie.index),
        //_.random() will return a random value which is in the hippiesPerSecondLow and hippiesPerSecondHigh range
        hippiesThisSecond = _.random(hippiesPerSecondLow, hippiesPerSecondHigh);
  
  //_.sampleSize() will return a hippie array of (n) random hippies per second
  _.sampleSize(indexList, hippiesThisSecond).forEach(triggerHippie);
}

//functio to trigger the hippies per second for each game round
function triggerHippie(index) {
  //random in and out of hippies
  const hippieOutLength = _.random(hippieOutLengthLow, hippieOutLengthHigh);
  //dispatch the HIPPIE_COMES_OUT action from our reducer.js 
  store.dispatch({ type: 'HIPPIE_COMES_OUT', index });
  
  //timeout will dispatch the 'HIPPIE_GOES_IN action to stop hippies from popping up
  setTimeout(() => {
    store.dispatch({ type: 'HIPPIE_GOES_IN', index }) 
  }, hippieOutLength);
}

//will render our action when player clicks on a hippie
function onHippieClick(index) {
  return function () {
    //will render the hippies as 'out' or displayed, and play a clicking sound when a player clicks on them
    if (store.getState().hippies[index].hippieState === 'out') {
      const audio = new Audio(process.env.PUBLIC_URL + '/click.mp3');
      audio.play();
      //dispatch the ''HIPPIE_HIT' action to add to our score
      store.dispatch({ type: 'HIPPIE_HIT', index });
    }
  }
}

//exports our store 
export default store;
export { startGame, onHippieClick };



