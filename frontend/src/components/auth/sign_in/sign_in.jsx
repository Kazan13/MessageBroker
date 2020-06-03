import React, {useState} from "react";
import styles from "./sign_in.module.css";
import {connect} from "react-redux";
import {Types} from "../../../redux/action-types/action-types";
import {signInAction} from "../../../redux/actions/auth-actions";

const SignIn = (props) => {
    let [usernameInput, changeUsername] = useState('');
    let [passwordInput, changePassword] = useState('');


    let layerVisibleStyle = props.signInWindow ? {display: 'flex'} : {display: 'none'};
    return (
        <div style={layerVisibleStyle} className={styles.signInPage}>
            <div className={styles.container}>
                <div className={styles.title}>Вход в аккаунт</div>
                <div className={styles.title2}>Пожалуйста, войдите в свой аккаунт</div>
                <div className={styles.form}>
                    <div className={styles.input}>
                        <input className={styles.usernameInput}
                               type="text"
                               placeholder="username"
                               onChange={event => {
                                   changeUsername(event.target.value);
                               }}
                        />
                    </div>
                    <div className={styles.input}>
                        <input className={styles.passwordInput}
                               type="password"
                               placeholder="password"
                               onChange={event => {
                                   changePassword(event.target.value);
                               }}
                        />
                    </div>
                    <div>
                        <div className={styles.signInButton} onClick={() => {
                            props.onSignIn({
                                username: usernameInput,
                                password: passwordInput
                            });
                        }}>
                            <p>Войти</p>
                        </div>

                        <div className={styles.signUpButton} onClick={() => {
                            props.onSignUpWindow();
                            props.onSignInWindow();
                        }}>
                            <p>Зарегистрироваться</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
};

export default connect(
    state => {
        return {
            signInWindow: state.modalWindow.signInWindow.isVisible,
            token: state.auth.token.token
        }
    },
    dispatch => ({
        onSignUpWindow: () => {
            dispatch({type: Types.SHOW_SIGN_UP_WINDOW})
        },
        onSignInWindow: () => {
            dispatch({type: Types.HIDE_SIGN_IN_WINDOW})
        },
        onSignIn: (user) => {
            dispatch(signInAction(user))
        },
    })
)(SignIn);