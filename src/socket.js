import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://94.103.83.213:443";

export const socket = io(URL);