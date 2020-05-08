import {store} from "./../redux/store";
import {Types} from "./../redux/action-types/action-types";
import {webSocket} from './web-socket';

class WebSocketController  {

    constructor() {
        this.sendMessage = this.sendMessage.bind(this);
        this.setupSocket = this.setupSocket.bind(this);
    }

    setupSocket () {
        let socket = webSocket.socket;

        socket.onopen = event => {
            console.log('Соединение установлено');
        };

        socket.onmessage = event => {
            console.log(event.data);
            // let message = JSON.parse(event.data);
            // store.dispatch({type: Types.NEW_MESSAGE, payload: message});
        };

        socket.onclose = event => {
            if (event.wasClean) {
                console.log('Соединение закрыто');
            } else {
                console.log('Соединение разорвано');
            }
        };

        socket.onerror = event => {
            console.log(event);
        };

        return socket;
    };


    sendMessage(message) {
        let ws = this.setupSocket();
        ws.send(message);
    };

}

export default WebSocketController;
