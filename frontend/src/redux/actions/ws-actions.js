import setupSocket from "../../services/web-socket-service";

export const sendMessageAction = (message) => dispatch => {
    let socket = setupSocket();
    // Отправка сообщений
}