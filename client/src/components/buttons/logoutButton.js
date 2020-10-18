import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Button onClick={() => logout({ returnTo: `${process.env.REACT_APP_AUTH0_REDIRECT_URI}/logout` })}>Log Out</Button>;
};

export default LogoutButton;