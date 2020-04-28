import React, {Component} from "react";
import styles from "./sign_up.module.css";
import {connect} from "react-redux";
import {signUpAction} from "../../../redux/actions/auth-actions";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.makeUser = this.makeUser.bind(this);
    }

    makeUser() {
        if (!this.username.value.length || !this.password.value.length) {
            return;
        }
        const user = {
            username: this.username.value,
            password: this.password.value,
        };
        this.password.value = '';
        this.username.value = '';
        this.props.onSignUp(user);
    }


    render() {
        let layerVisibleStyle = this.props.signUpWindow ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={layerVisibleStyle} className={styles.signUpPage}>
                <div className={styles.container}>
                    <h1 className="title">Sign Up</h1>
                    <div className={styles.form}>
                        <div className={styles.input}>
                            <input
                                type="text"
                                placeholder="username"
                                ref={(input => {
                                    this.username = input
                                })}
                            />
                        </div>
                        <div className={styles.input}>
                            <input
                                type="password"
                                placeholder="password"
                                ref={(input => {
                                    this.password = input
                                })}
                            />
                        </div>
                        <div>
                            <button onClick={this.makeUser}>
                                SignUp
                            </button>
                        </div>
                    </div>

                    <button onClick={() => {
                        this.props.onSignUpLayer();
                        this.props.onSignInLayer();
                    }}>
                        SignIn
                    </button>
                </div>
            </div>
        )
    }

}

export default connect(
    state => (
        {signUpWindow: state.modalWindow.signUpWindow.isVisible}
    ),
    dispatch => ({
        onSignUpLayer: () => {
            dispatch({type: 'HIDE_SIGN_UP_WINDOW'})
        },
        onSignInLayer: () => {
            dispatch({type: 'SHOW_SIGN_IN_WINDOW'})
        },
        onSignUp: (user) => {
            dispatch(signUpAction(user));
        }
    })
)(SignUp);