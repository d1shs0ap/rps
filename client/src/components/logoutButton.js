import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Button onClick={() => logout({ returnTo: 'http://localhost:3000/logout' })}>Log Out</Button>;
};

export default LogoutButton;