import React from 'react';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

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
    }
  }

  componentDidMount(){
    socket.emit('game over', this.state.uuid);
    socket.on('winner', (winner, secondsWinning, secondsLosing) => {
      this.setState({
        winner: winner,
        secondsWinning: secondsWinning,
        secondsLosing: secondsLosing
      });
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
        title={this.state.winner == 'Tie' ? 'Tie!' : `${this.state.winner} Wins!`}
        subTitle={`Time winning: ${(this.state.secondsWinning/1000).toFixed(3)}, 
          Time losing: ${(this.state.secondsLosing/1000).toFixed(3)}, 
          Time tied: ${(8-(this.state.secondsWinning+this.state.secondsLosing)/1000).toFixed(3)}`}
        extra={<Link to='/'><Button>Back to Lobby</Button></Link>}
      />
    </div>
  }

}

export default withRouter(GameOver);