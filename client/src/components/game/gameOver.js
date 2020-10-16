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
    }
  }

  componentDidMount(){
    socket.emit('game over', this.state.uuid);
    socket.on('winner', (winner) => {
      this.setState({
        winner: winner,
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
        title={`${this.state.winner} Wins!`}
        extra={<Link to='/'><Button>Back to Lobby</Button></Link>}
      />
    </div>
  }

}

export default withRouter(GameOver);