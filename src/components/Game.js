import React from 'react';
import Hippie from './Hippie.js';

//main Game component
export default class Game extends React.Component {
  render () {
    //initial properties of defined functions
    const { hippies, onHippieClick } = this.props;

    return (
      <div className="Game">
        {/*Rnder all the Hippies from Hippie.js according to its state*/}
        {hippies && hippies.map((hippie) => 
          <Hippie 
            key={hippie.index} 
            hippieState={hippie.hippieState}
            onHippieClick={onHippieClick(hippie.index)}
          />
        )}
      </div>
    );
  }
}