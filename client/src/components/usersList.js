import React from 'react';
import { List } from 'antd';
import ChallengeButton from '../components/challengeButton';

import { withAuth0 } from '@auth0/auth0-react';
import socket from '../api/socket';


class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state = { users: [] };
  }

  updateUsers(newUsers, curUsername){
    const curIndex = newUsers.indexOf(curUsername);
    newUsers.splice(curIndex, 1);
    this.setState({
      users: newUsers,
    });
  }


  componentDidMount() {
    const { user, isAuthenticated } = this.props.auth0;
    
    if(isAuthenticated) {
      const curUsername = user['https://matthewyng.com/username'];

      console.log(socket);

      socket.emit('user', curUsername);

      socket.on('updated users', users => {
        this.updateUsers(users, curUsername);
        console.log(this.state.users);
      });

    }

  };

  render() {
    // return (null);
    return <List
      bordered
      dataSource={this.state.users}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={item}></List.Item.Meta>
          <ChallengeButton username={item}></ChallengeButton>
        </List.Item>)}
    />;
  };

}

export default withAuth0(UsersList);