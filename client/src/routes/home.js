import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

import NavBar from '../components/navBar';

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
        <>
          <NavBar></NavBar>
        </>
      </>
    );
  }
}

export default withAuth0(Home);