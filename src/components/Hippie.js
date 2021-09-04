import React from 'react';
//will display our hippie image to be rendered
import hippieIMG from '../assets/hippie.png';

//Main hippie component that will display our hippies between game states
export default class Hippie extends React.Component {
  render() {
    //initial properties of defined functions
    const { hippieState, onHippieClick } = this.props;

    return (
      //render our screen
      <div className={getScreenClass(hippieState)} onClick={onHippieClick}>
        {/*render our hippies*/}
        <img 
          className={getHippieClass(hippieState)} 
          src={hippieIMG}
          alt="hippie"
        />
      </div>
    );
  }
}

//will render the hippie to pop out if its state is out/displayed
function getHippieClass(hippieState) {
  return `Hippie ${hippieState === 'out' ? 'Pop-out' : ''}`;
}

//will render the screen to allow player to hit the hippie if its state is out/displayed
function getScreenClass(hippieState) {
  return `Screen ${hippieState === 'hit' ? 'Hippie-hit' : ''}`;
}