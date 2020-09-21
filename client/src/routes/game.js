import React from 'react';
import { Button, Row} from 'antd';
import { withAuth0 } from '@auth0/auth0-react';

import RPSButton from '../components/rpsButton';
import RPSOpponentButton from '../components/rpsOpponentButton';

import rock from '../rock.png';
import paper from '../paper.png';
import scissors from '../scissors.png';

import socket from '../api/socket';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentHand: 'rock',
      opponentHand: 'rock',
    }
  }

  componentDidMount() {
    // socket.on()
  }

  isWinning() {
    const cur = this.state.currentHand;
    const opp = this.state.opponentHand;

    if(cur==='rock') {
      if(opp==='rock'){
        return 'tie';
      }
      else if(opp==='paper'){
        return 'no';
      }
      else if(opp==='scissors'){
        return 'yes';
      }
    }
    else if(cur==='paper') {
      if(opp==='rock'){
        return 'yes';
      }
      else if(opp==='paper'){
        return 'tie';
      }
      else if(opp==='scissors'){
        return 'no';
      }
    }
    else if(cur==='scissors') {
      if(opp==='rock'){
        return 'no';
      }
      else if(opp==='paper'){
        return 'yes';
      }
      else if(opp==='scissors'){
        return 'tie';
      }
    }
  }

  pageColor(){
    const win = this.isWinning()
    if(win==='yes'){
      return '#96E196';
    } else if(win==='no'){
      return '#E19696';
    } else if (win==='tie'){
      return '#E1DB96';
    }
  }

  handleClick(hand){


    this.setState(
      {
        currentHand : hand,
      }
    )
    socket.emit('updateHand', this.props.username);
  }

  render () {
    return <div style={{ height: '100vh', background: this.pageColor() }}>
      <Row justify='center' style={{'padding': '120px'}}>
        <RPSOpponentButton 
          hand='rock' 
          opponentHand={this.state.opponentHand} 
          image={<img src={rock} height='150px'/>}
        />
        <RPSOpponentButton 
          hand='paper' 
          opponentHand={this.state.opponentHand} 
          image={<img src={paper} height='250px'/>}
        />
        <RPSOpponentButton 
          hand='scissors' 
          opponentHand={this.state.opponentHand} 
          image={<img src={scissors} height='250px'/>}
        />
      </Row>

      <Row justify='center' style={{}}>
        <RPSButton 
          hand='rock' 
          currentHand={this.state.currentHand} 
          image={<img src={rock} height='150px'/>}
          handleClick={(hand)=>this.handleClick(hand)}/>
        <RPSButton 
          hand='paper' 
          currentHand={this.state.currentHand} 
          image={<img src={paper} 
          height='250px'/>}
          handleClick={(hand)=>this.handleClick(hand)}/>
        <RPSButton 
          hand='scissors' 
          currentHand={this.state.currentHand} 
          image={<img src={scissors} height='250px'/>}
          handleClick={(hand)=>this.handleClick(hand)}/>
      </Row>
    </div>;
  }
}

export default withAuth0(Game);