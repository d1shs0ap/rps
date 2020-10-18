import io from 'socket.io-client';

let socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, { 'sync disconnect on unload': true });

export default socket;
