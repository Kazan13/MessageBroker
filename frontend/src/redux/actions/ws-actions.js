import {getSocket} from "../../services/web-socket-controller";

export const sendMessageAction = (message) => dispatch => {
    let socket = getSocket();
    socket.send(JSON.stringify(message));
}