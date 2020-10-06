import io from 'socket.io-client';

// const URL: string = 'https://pscchattest.azurewebsites.net';
const URL: string = 'http://192.168.1.83:5035';
const SOCKET = io(URL);

export default SOCKET;
