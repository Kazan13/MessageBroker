import React from "react";
import styles from "./splash-screen.module.css"
import {isTokenValidAction} from "../../redux/actions/auth-actions";
import {connect} from "react-redux";

/**
 * Темный фон для анимации
 */
const SplashScreen = (props) => {

    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    let token = getCookie('token');
    props.onSplashScreen({token: token});

    let visibleStyle = props.isVisible ? {display: 'flex'} : {display: 'none'};
    return (
        <div style={visibleStyle} className={styles.splashScreen}/>
    )
}

export default connect(
    state => ({
        isVisible: state.modalWindow.splashScreen.isVisible
    }),
    dispatch => ({
        onSplashScreen: (token) => {
            dispatch(isTokenValidAction(token));
        }
    })

)(SplashScreen);