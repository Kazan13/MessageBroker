import {store} from "./../redux/store";
import {Types} from "./../redux/action-types/action-types";
import {getCookie} from "../redux/getCookie";

let URL = 'ws://localhost';
let PORT = '8090';

class WebSocketController  {

    constructor(socket) {
        this.sendMessage = this.sendMessage.bind(this);
        this.setupSocket = this.setupSocket.bind(this);
        this.socket = socket;
    }

    setupSocket () {
          this.socket.onopen = event => {
            console.log('Соединение установлено');
            let authMessage = {
                type: 'AUTH',
                data: JSON.stringify({token: getCookie('token')})
            }
            getSocket().send(JSON.stringify(authMessage));
        };

        this.socket.onmessage = event => {
            let json = JSON.parse(event.data);
            if(json.type === 'NEW_MESSAGE') {
                store.dispatch({type: Types.NEW_MESSAGE, payload: JSON.parse(json.data)});
            } else {
                console.log(event.data);
            }
        };

        this.socket.onclose = event => {
            console.log('Соединение закрыто: ' + event);
        };

        this.socket.onerror = event => {
            console.log(event );
        };

        return this.socket;
    };


    sendMessage(message) {
        let ws = getSocket();
        ws.send(message);
    };

}

let socket;

export const setSocket = () => {
   socket = new WebSocketController(new WebSocket(`${URL}:${PORT}`)).setupSocket();
}

export const getSocket = () => {
    if(socket === undefined) {
        setSocket();
    }
    return socket;
};
