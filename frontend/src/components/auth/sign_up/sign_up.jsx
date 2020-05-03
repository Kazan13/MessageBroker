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
                <h1 className="title">Sign Up</h1>
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
                            props.onSignUp({
                                username: usernameInput,
                                password: passwordInput
                            });
                        }}>
                            SignUp
                        </button>
                    </div>
                </div>

                <button onClick={() => {
                    props.onSignUpWindow();
                    props.onSignInWindow();
                }}>
                    SignIn
                </button>
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