import React from 'react';
import io from 'socket.io-client';
import { withAuth0 } from '@auth0/auth0-react';

import LogoutButton from '../components/logoutButton';
import NavBar from '../components/navBar';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

const ENDPOINT = "http://localhost:5000";

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
    }

  }

  componentDidUpdate() {
    const { user, isAuthenticated } = this.props.auth0;
    
    if(isAuthenticated) {
      const socket = io(ENDPOINT, { 'sync disconnect on unload': true });

      socket.on('connect', () => {
        socket.emit('user', user.name, user.email, user.nickname);
      });

      socket.on('message', nickname => {
        console.log(nickname);
      })
    }

  };

  render() {
    const { user, isAuthenticated, isLoading } = this.props.auth0;
    if(isLoading) {
      return <>Loading... </>
    }
    return (
      isAuthenticated && (
        <>
          <NavBar></NavBar>
        </>
      )
    );
  }
}

export default withAuth0(Home);