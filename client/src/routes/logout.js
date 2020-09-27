import React from 'react';
import { Link } from 'react-router-dom';
import { message, Button } from 'antd';

const Logout = () => {
  message.success('Logged out!');

  return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: '100vh'
    }}
  >
    <Button>
      <Link to='/login'>Back to login</Link>
    </Button>
  </div>
  );
}

export default Logout;