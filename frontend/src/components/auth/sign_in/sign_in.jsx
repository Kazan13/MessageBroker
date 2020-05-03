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
                <h1 className="title">Sign In</h1>
                <div className={styles.form}>
                    <div className={styles.input}>
                        <input
                            type="text"
                            placeholder="username"
                            onChange={event => {
                                changeUsername(event.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.input}>
                        <input
                            type="password"
                            placeholder="password"
                            onChange={event => {
                                changePassword(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={() => {
                            props.onSignIn({
                                username: usernameInput,
                                password: passwordInput
                            });
                        }}>
                            SignIn
                        </button>
                    </div>
                </div>

                <button onClick={() => {
                    props.onSignUpWindow();
                    props.onSignInWindow();
                }}>
                    SignUp
                </button>
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