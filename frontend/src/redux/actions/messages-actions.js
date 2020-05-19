import {getMessages} from "../../services/http-service";
import {Types} from "../action-types/action-types";

export const getMessagesAction = (token) => dispatch => {
    getMessages(token).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('error');
        }
    }).then(json => {
            let messages = new Map();
            for (let [key, values] of Object.entries(json)) {
                messages.set(parseInt(key), values);
            }
            console.log(messages);
            dispatch({type: Types.SET_MESSAGES, payload: messages});
        }
    ).catch(err => {
        alert("Не удается получить сообщения");
    });
}