let URL = 'ws://localhost';
let PORT = '8090';

export const webSocket = {
    socket: new WebSocket(`${URL}:${PORT}`),
}