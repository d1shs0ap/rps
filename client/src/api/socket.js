import io from 'socket.io-client';

require('dotenv').config()

let socket = io(process.env.SOCKET_ENDPOINT, { 'sync disconnect on unload': true });

export default socket;
