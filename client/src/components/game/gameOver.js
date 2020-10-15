import React from 'react';
import { withRouter } from 'react-router-dom';

import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import socket from '../../socket';

class GameOver extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1),
    }
  }

  componentDidMount(){
    socket.emit('game over', this.state.uuid);
    socket.on('winner', (winner) => {
      console.log(winner);
    })
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
        title="Game Over!"
        extra={<Link to='/'><Button>Back to Lobby</Button></Link>}
      />
    </div>
  }

}

export default withRouter(GameOver);