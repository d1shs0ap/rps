import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { withAuth0 } from '@auth0/auth0-react';

import { Result, Button } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';

import socket from '../../api/socket';

class GameOver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1),
      winner: '',
      secondsWinning: 0,
      secondsLosing: 0,
      username: '',
      resultMessage: '',
    }
  }

  componentDidMount(){
    const { user, isAuthenticated } = this.props.auth0;
    if(isAuthenticated){
      const username = user['https://matthewyng.com/username'];
      this.setState({
        username: username,
      })
    }
    socket.emit('game over', this.state.uuid);
    socket.on('winner', (winner, secondsWinning, secondsLosing) => {
      this.setState({
        winner: winner,
      });
      if (this.state.winner == 'Tie'){
        this.setState({
          secondsWinning: secondsWinning,
          secondsLosing: secondsLosing,
          resultMessage: 'Tie!',
        });
      } else if (this.state.winner === this.state.username){
        this.setState({
          secondsWinning: secondsWinning,
          secondsLosing: secondsLosing,
          resultMessage: 'You win!'
        });
      } else {
        this.setState({
          secondsWinning: secondsLosing,
          secondsLosing: secondsWinning,
          resultMessage: 'Rip... (You lose)'
        });
      }
    });
  }

  render() {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh'
      }}
    >

      <Result
        icon={<TrophyOutlined />}
        title={this.state.resultMessage}
        subTitle={`Out of the 8 seconds, you were winning ${(this.state.secondsWinning/1000).toFixed(3)}s, 
          losing ${(this.state.secondsLosing/1000).toFixed(3)}s, 
          tied ${(8-(this.state.secondsWinning+this.state.secondsLosing)/1000).toFixed(3)}s.`}
        extra={<Link to='/'><Button>Back to Lobby</Button></Link>}
      />
    </div>
  }

}

export default withRouter(withAuth0(GameOver));