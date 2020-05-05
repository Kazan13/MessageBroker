import React, {useState} from "react";
import styles from "./sign_up.module.css";
import {connect} from "react-redux";
import {signUpAction} from "../../../redux/actions/auth-actions";
import {Types} from "../../../redux/action-types/action-types";

const SignUp = (props) => {
    let [usernameInput, changeUsername] = useState('');
    let [passwordInput, changePassword] = useState('');


    let layerVisibleStyle = props.signUpWindow ? {display: 'flex'} : {display: 'none'};
    return (
        <div style={layerVisibleStyle} className={styles.signUpPage}>
            <div className={styles.container}>
                <div className={styles.title}>Регистрация</div>
                <div className={styles.title2}>Для входа в приложение, вам нужно зарегистрироваться</div>
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
                        <div className={styles.signUpButton}
                             onClick={() => {
                                 props.onSignUp({
                                     username: usernameInput,
                                     password: passwordInput
                                 });
                             }}>
                            Зарегистрироваться
                        </div>
                        <div className={styles.signInButton}
                             onClick={() => {
                                 props.onSignUpWindow();
                                 props.onSignInWindow();
                             }}>
                            Вход в аккаунт
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
};

export default connect(
    state => (
        {signUpWindow: state.modalWindow.signUpWindow.isVisible}
    ),
    dispatch => ({
        onSignUpWindow: () => {
            dispatch({type: Types.HIDE_SIGN_UP_WINDOW})
        },
        onSignInWindow: () => {
            dispatch({type: Types.SHOW_SIGN_IN_WINDOW})
        },
        onSignUp: (user) => {
            dispatch(signUpAction(user));
        }
    })
)(SignUp);