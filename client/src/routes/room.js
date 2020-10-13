import React from 'react';

import Game from '../components/game/game';
import GameOver from '../components/game/gameOver';


class Room extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: 'in game',
    };
  }

  changeGameState(gameState){
    this.setState({
      gameState
    })
  }

  render(){
    if(this.state.gameState=='in game'){
      return <Game changeGameState={(gameState) => this.changeGameState(gameState)}></Game>;
    } 
    return <GameOver></GameOver>
  }
}

export default Room;