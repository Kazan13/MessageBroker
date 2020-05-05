class WebSocketService  {

    constructor(store) {
        this.store = store;
        this.setupSocket = this.setupSocket.bind(this);
    };

    setupSocket() {
        this.socket = new WebSocket('ws://localhost:8090');

        this.socket.onopen = event => {
            console.log('Соединение установлено');
        };

        this.socket.onmessage = event => {
            let message = JSON.parse(event.data);
            console.log(message)
        };

        this.socket.onclose = event => {
            if (event.wasClean) {
                console.log('Соединение закрыто');
            } else {
                console.log('Соединение разорвано');
            }
        };

        this.socket.onerror = event => {
            console.log(event);
        };

        return this.socket;
    };

    sendMessage(message) {
        this.socket.send(message);
    };

}

export default WebSocketService;
