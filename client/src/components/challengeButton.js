import React from 'react';
import { Button } from 'antd';
import socket from '../api/socket';

class ChallengeButton extends React.Component {

  constructor(props){
    super(props)
  }

  challengeUser() {
    socket.emit('challenge', this.props.username);
    console.log('Challenged', this.props.username);
  }

  render() {
    return <Button onClick={() => this.challengeUser()}>Challenge</Button>
  }
}

export default ChallengeButton;