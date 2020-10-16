import React from 'react';
import { withRouter } from 'react-router-dom';
import { Progress, Row } from 'antd';
import { withAuth0 } from '@auth0/auth0-react';

import RPSButton from '../buttons/rpsButton';
import RPSOpponentButton from '../buttons/rpsOpponentButton';

import rock from './rock.png';
import paper from './paper.png';
import scissors from './scissors.png';

import socket from '../../api/socket';

class Game extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentHand: 'rock',
      opponentHand: 'rock',
      progress: 0,
      uuid: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1),
      startedCounter: 0,
      username: '',
    }
  }

  componentDidMount() {
    socket.emit('ready', this.state.uuid);
    const { user, isAuthenticated } = this.props.auth0;
    if(isAuthenticated){
      const username = user['https://matthewyng.com/username'];
      this.setState({
        username: username,
      })
    }

    // handles the shared starting time for progress bar
    socket.on('readied', (startTime) => {
      if (this.state.startedCounter == 1){
        console.log('Game started at:',startTime)

        socket.emit('confirmed start time', this.state.uuid, startTime, this.state.username);

        const progressBar = setInterval(() => {
          // change scene to page if we're done
          if(this.state.progress > 100){
            clearInterval(progressBar);
            this.props.changeGameState('game over');
          }
          
          this.setState({
            progress: (new Date().getTime() - startTime)/8000*100,
          })
        }, 1000);
      }
      this.setState({
        startedCounter : this.state.startedCounter + 1
      })

    })

    socket.on('receive hand', (hand) => {
      this.setState({
        opponentHand: hand,
      })
    });
  }

  //checks if user is winning
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

  // change page colour based on if user is winning
  pageColor(){
    const win = this.isWinning()
    if(win==='yes'){
      return { height: '100vh', background: '#96E196' };
    } else if(win==='no'){
      return { height: '100vh', background: '#E19696' };
    } else if (win==='tie'){
      return { height: '100vh', background: '#E1DB96' };
    }
  }

  handleClick(hand){
    this.setState(
      {
        currentHand : hand,
      }
    )
    socket.emit('give hand', this.state.username, hand, this.state.uuid);
  }

  render () {
    return <div style={this.pageColor()}>
      <Row justify='center' style={{'padding': '60px', 'marginLeft': '70px', 'marginRight':'70px'}}>
        <Progress percent={this.state.progress} showInfo={false}></Progress>
      </Row>
      <Row justify='center' style={{'padding': '50px'}}>
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

export default withRouter(withAuth0(Game));