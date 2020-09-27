import React from 'react';
import { Button } from 'antd';

class RPSButton extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return <Button 
      style={this.props.currentHand===this.props.hand ? {backgroundColor: '#188fff', 'height': '300px', 'width': '300px', 'border': 'none'}: {'height': '300px', 'width': '300px', 'border': 'none'}}
      onClick={()=>this.props.handleClick(this.props.hand)}
      >
      {this.props.image}
    </Button>;
  }
};

export default RPSButton;