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
        dispatch({type: Types.SET_MESSAGES, payload: json});
        }
    ).catch(err => {
        alert("Не удается получить сообщения");
    });
}