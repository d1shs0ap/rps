import React from 'react';
import { messsage, message } from 'antd';
import { withAuth0 } from '@auth0/auth0-react';

import NavBar from '../components/navBar';
import UsersList from '../components/usersList';
import ChallengeNotif from '../components/challengeNotif';
import StartGame from '../components/startGame';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      loadingButton: null,
    }
  }

  componentDidMount() {
    const loadingButton = message.loading('Loading...', 0);
    this.setState({
      loadingButton
    })
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.props.auth0;
    if(isAuthenticated) setTimeout(this.state.loadingButton, 0)
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.auth0;
    if(isLoading) {
      return <></>;
    }
    return (
      isAuthenticated && <>
        <NavBar></NavBar>
        <UsersList></UsersList>
        <ChallengeNotif></ChallengeNotif>
        <StartGame></StartGame>
      </>
    );
  }
}

export default withAuth0(Home);