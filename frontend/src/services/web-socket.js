let URL = 'ws://localhost';
let PORT = '8090';

export const webSocketService = {
    socket: new WebSocket(`${URL}:${PORT}`),
}