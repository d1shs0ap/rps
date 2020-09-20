import React from 'react';
import {Button, Row, Col} from 'antd';
import rock from '../rock.png';
import paper from '../paper.png';
import scissors from '../scissors.png';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected
    }
  }

  render () {
    return <>
      <Row justify='center' style={{'padding': '120px'}}>
        <Button disabled style={{'height': '300px', 'width': '300px'}}>
          <img src={scissors} height='250px'/>
        </Button>
        <Button disabled style={{'height': '300px', 'width': '300px'}}>
          <img src={paper} height='250px'/>
        </Button>
        <Button disabled style={{'height': '300px', 'width': '300px'}}>
          <img src={rock} height='150px'/>
        </Button>
      </Row>

      <Row justify='center' style={{}}>
        <Button style={{'height': '300px', 'width': '300px'}}>
          <img src={scissors} height='250px'/>
        </Button>
        <Button style={{'height': '300px', 'width': '300px'}}>
          <img src={paper} height='250px'/>
        </Button>
        <Button style={{'height': '300px', 'width': '300px'}}>
          <img src={rock} height='150px'/>
        </Button>
      </Row>
    </>;
  }
}

export default Game;