import {signIn, signUp} from "../../services/http-service";
import {Types} from "../action-types/action-types";
import {getChannelsAction} from "./channels-actions";

export const signInAction = (user) => dispatch => {
    signIn(user).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('unauthorized');
        }
    }).then(json => {
        dispatch({type: Types.SET_TOKEN, payload: json.token})
        dispatch(getChannelsAction(json.token))
        dispatch({type: Types.HIDE_SIGN_IN_WINDOW})
        dispatch({type: Types.SHOW_MESSENGER})
    }).catch(err => {
        alert("Не удалось войти");
        console.log(err)
    });
}


export const signUpAction = (user) => dispatch =>{
    signUp(user).then(response => {
        if (response.ok) {
            dispatch({type: Types.HIDE_SIGN_UP_WINDOW});
            dispatch({type: Types.SHOW_SIGN_IN_WINDOW});
        } else {
            throw new Error('unauthorized');
        }
    }).catch(
        err => {
            alert('Ошибка регистрации');
            console.log(err);
        }
    );
}