import React from 'react';
import { Redirect } from 'react-router-dom';

import socket from '../api/socket';

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      gameId: null,
    };
  }

  componentDidMount() {
    socket.on('start game', (uuid, username, curUsername) => {
      console.log('started game');
      this.setState({
        gameStarted: true,
        gameId: uuid,
      })

    });
  }

  render(){
    if(this.state.gameStarted) {
      return <Redirect to={`/room/${this.state.gameId}`}></Redirect>
    }
    return (null);
  }
}

export default StartGame;