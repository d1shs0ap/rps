import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

import { Button, notification } from 'antd';
import socket from '../../api/socket';

class ChallengeButton extends React.Component {

  constructor(props){
    super(props)
  }

  // challenges user
  challengeUser() {
    const { user } = this.props.auth0;
    const curUsername = user['https://matthewyng.com/username'];

    socket.emit('challenge', this.props.username, curUsername);

    notification.open({
      message: `Challenged ${this.props.username}!`,
    });
  }

  render() {
    
    return <Button onClick={() => this.challengeUser()}>Challenge</Button>
  }
}

export default withAuth0(ChallengeButton);