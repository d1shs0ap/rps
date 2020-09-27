import React from 'react';
import LoginButton from '../components/buttons/loginButton';

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh'
      }}
    >
        <LoginButton></LoginButton>
    </div>
  );
}

export default Login;