import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

import NavBar from '../components/navBar';
import UsersList from '../components/usersList';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.auth0;
    if(isLoading) {
      return <>Loading... </>
    }
    return (
      isAuthenticated && <>
        <NavBar></NavBar>
        <UsersList></UsersList>
      </>
    );
  }
}

export default withAuth0(Home);