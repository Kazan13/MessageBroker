import {isTokenValid, logOut, signIn, signUp} from "../../services/http-service";
import {Types} from "../action-types/action-types";
import {getUserChannelsAction} from "./channels-actions";

/**
 *
 * @param user
 * @returns {function(...[*]=)}
 */
export const signInAction = (user) => dispatch => {
    signIn(user).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('unauthorized');
        }
    }).then(json => {
        document.cookie = `token=${json.token}`
        dispatch({type: Types.SET_TOKEN, payload: json.token});
        dispatch(getUserChannelsAction(json.token));
        dispatch({type: Types.HIDE_SIGN_IN_WINDOW});
        dispatch({type: Types.SHOW_MESSENGER});
    }).catch(err => {
        alert("Не удалось войти");
        console.log(err);
    });
};

/**
 *
 * @param user
 * @returns {function(...[*]=)}
 */
export const signUpAction = (user) => dispatch => {
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
};

/**
 *
 * @param token
 * @returns {function(...[*]=)}
 */
export const isTokenValidAction = (token) => dispatch => {
    isTokenValid(token).then(response => {
        if (response.ok) {
            dispatch({type: Types.SHOW_MESSENGER});
            dispatch({type: Types.HIDE_SPLASH_SCREEN});
            dispatch(getUserChannelsAction(token.token));
        } else {
            dispatch({type: Types.SHOW_SIGN_IN_WINDOW});
            dispatch({type: Types.HIDE_SPLASH_SCREEN});
        }

    }).catch(
        err => {
            alert('Ошибка регистрации');
            console.log(err);
        }
    );
};

/**
 *
 * @param token
 * @returns {function(...[*]=)}
 */
export const logOutAction = (token) => dispatch => {
    logOut(token).then(response => {
        if (response.ok) {
            document.cookie = 'token=token';
            dispatch({type: Types.HIDE_MESSENGER});
            dispatch({type: Types.SHOW_SIGN_IN_WINDOW});
        } else {
            dispatch({type: Types.SHOW_SIGN_IN_WINDOW});
            dispatch({type: Types.HIDE_SPLASH_SCREEN});
        }

    }).catch(
        err => {
            alert('Ошибка');
            console.log(err);
        }
    );
};