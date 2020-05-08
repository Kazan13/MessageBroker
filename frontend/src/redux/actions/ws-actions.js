// import setupSocket from "../../services/web-socket-service";

import WebSocketController from "../../services/web-socket-controller";

export const sendMessageAction = (message) => dispatch => {
    let ws = new WebSocketController();
    ws.sendMessage(JSON.stringify(message));
}