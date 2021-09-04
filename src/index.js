import React from 'react';
import ReactDOM from 'react-dom';
//import our store
import store, { startGame, onHippieClick } from './store/store';
import App from './App';
import './index.css';

//subscribe keeps an array of listener callbacks and returns a function to remove the new callback
store.subscribe(render);

//renders our store
render();

//renders our main function whihc contains game objects
function render() {
  ReactDOM.render(
    <App 
      state={store.getState()}
      onStart={startGame}
      onHippieClick={onHippieClick}
    />, 
    document.getElementById('root')
  );
}