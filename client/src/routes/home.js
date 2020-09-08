import React from 'react';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from '../components/logoutButton';
import NavBar from '../components/navBar';

const ENDPOINT = "http://localhost:5000";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  
  const [response, setResponse] = React.useState("");
  
  React.useEffect(() => {
    const socket = io(ENDPOINT, { 'sync disconnect on unload': true });
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  if(isLoading) {
    return <>Loading... </>
  }
  
  return (
    isAuthenticated && (
      <>
        <NavBar></NavBar>
        <p>
          It's <time dateTime={response}>{response}</time>
        </p>
      </>
    )
  );
}

export default Home;