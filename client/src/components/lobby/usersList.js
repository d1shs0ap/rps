import React from 'react';
import { List } from 'antd';
import ChallengeButton from '..//buttons/challengeButton';

import { withAuth0 } from '@auth0/auth0-react';
import socket from '../../api/socket';


class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      users: [] 
    };
  }

  updateUsers(newUsers, curUsername){
    this.setState({
      users: newUsers.filter(e => e !== curUsername),
    });
  }


  componentDidMount() {
    const { user, isAuthenticated } = this.props.auth0;
    
    if(isAuthenticated) {
      const curUsername = user['https://matthewyng.com/username'];

      socket.emit('user', curUsername);

      socket.on('updated users', users => {
        this.updateUsers(users, curUsername);
      });

    }

  };

  render() {
    // return (null);
    return <List
      bordered
      locale={{ emptyText: 'No one\'s here... Ask a friend to log on!' }}
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
