import React from "react";
import styles from "./splash-screen.module.css"
import {isTokenValidAction} from "../../redux/actions/auth-actions";
import {connect} from "react-redux";
import {getCookie} from "../../redux/getCookie";

/**
 * SplashScreen для проверки необходимости
 * аутентификации
 *
 * @param props
 * @returns {*}
 * @constructor
 */

const SplashScreen = (props) => {
    if (props.isVisible) {
        let token = getCookie('token');
        props.onSplashScreen({token: token});
    }
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