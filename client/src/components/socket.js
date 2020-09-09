import React from 'react';
import io from 'socket.io-client';
import { withAuth0 } from '@auth0/auth0-react';

const ENDPOINT = "http://localhost:5000";

class Socket extends React.Component {

  updateUsers(users, curUsername){
    const curIndex = users.indexOf(curUsername);
    this.setState({
      users: users.splice(curIndex, 1),
    });
  }


  componentDidMount() {
    const { user, isAuthenticated } = this.props.auth0;
    
    this.socket = io(ENDPOINT, { 'sync disconnect on unload': true });
    
    if(isAuthenticated) {
      const curUsername = user['https://matthewyng.com/username'];

      const socket = this.socket;

      socket.on('connect', () => {
        socket.emit('user', curUsername);
      });

      socket.on('updated users', users => {
        console.log(users)
        this.updateUsers(users, curUsername);
        console.log(users);
      });

    }

  };

  render() {
    return (null);
  };

}

export default withAuth0(Socket);