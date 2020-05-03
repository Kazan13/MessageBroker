const setupSocket = () => {
    const socket = new WebSocket('ws://localhost:8090');

    socket.onopen = event => {
        console.log('Соединение установлено');
    }

    socket.onmessage = event => {
        let message = JSON.parse(event.data);
        console.log(message)
    }

    socket.onclose = event => {
        if (event.wasClean) {
            console.log('Соединение закрыто');
        } else {
            console.log('Соединение разорвано');
        }
    }

    socket.onerror = event => {
        console.log(event);
    }

    return socket;
}

export default setupSocket;
