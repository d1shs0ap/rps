import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Logout = () => {
  return <>
    You have logged out
    <br/>
    <Button>
      <Link to='/login'>Back to login</Link>
    </Button>
  </>;
}

export default Logout;