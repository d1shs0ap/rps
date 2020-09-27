import React from 'react';
import { Button } from 'antd';

class RPSOpponentButton extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return <Button 
      disabled style={this.props.opponentHand===this.props.hand ? {backgroundColor: '#1864AF', 'height': '300px', 'width': '300px', 'border': 'none'}: {'height': '300px', 'width': '300px', 'border': 'none'}}
      >
      {this.props.image}
    </Button>;
  }
};

export default RPSOpponentButton;