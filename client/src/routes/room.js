import React from 'react';

import Game from '../components/game';


class Room extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: 'ready',
      timer: null,
    };
  }

  render(){
    return <Game></Game>;
  }
}

export default Room;