import React from 'react';
import { Button } from 'antd';

class RPSOpponentButton extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return <Button 
      disabled style={this.props.opponentHand===this.props.hand ? {backgroundColor: '#1360AC', 'height': '20vmin', 'width': '20vmin', 'border': 'none'}: {'height': '20vmin', 'width': '20vmin', 'border': 'none'}}
      >
      {this.props.image}
    </Button>;
  }
};

export default RPSOpponentButton;