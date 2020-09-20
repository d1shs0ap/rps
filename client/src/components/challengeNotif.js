import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Button, notification } from 'antd';

import socket from '../api/socket';


class ChallengeNotif extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }
  
  componentDidMount() {
    socket.on('accept challenge', username => {
      this.openNotification(username);
    });
  }
  
  openNotification = (username) => {
  
    const AcceptButton = <Button type="primary" onClick={() => this.acceptChallenge(username)}>Accept</Button>;
  
    notification.open({
      key: username,
      message: `Challenge from ${username}`,
      btn: AcceptButton,
    });
  
  }

  acceptChallenge(username) {
    // In the future, make the following change: only fetch once then put into context/composition
    const { user } = this.props.auth0;
    const curUsername = user['https://matthewyng.com/username'];
    socket.emit('accepted', username, curUsername);
    notification.close(username);

  }

  render() {
    return (null);
  }
}

export default withAuth0(ChallengeNotif);
