class WebSocketService {

    constructor() {
        this.webSocketFunc = this.webSocketFunc.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    webSocketFunc = () =>{
        this.webSocket = new WebSocket('ws://localhost:8090');

        this.webSocket.onopen = event => {
            console.log('Соединение установлено');
        }

        this.webSocket.onmessage = event => {
            let message = JSON.parse(event.data);
        }

        this.webSocket.onclose = event => {
            if (event.wasClean)  {
                console.log('Соединение закрыто');
            } else {
                console.log('Соединение разорвано');
            }
        }

        this.webSocket.onerror = event => {
            console.log(event);
        }
    }

    sendMessage = (message) => {
        this.webSocket.send(JSON.stringify(message));
    }
}