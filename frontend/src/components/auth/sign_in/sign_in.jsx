import React, {Component} from "react";
import styles from "./sign_in.module.css";
import {connect} from "react-redux";
import {getChannels, signIn} from "../../../services/http-service";
import {Types} from "../../../redux/action-types/action-types";
import {getChannelsAction} from "../../../redux/actions/channelsAction";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.makeUser = this.makeUser.bind(this);
    }

    async signIn(user) {
        await signIn(user).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('unauthorized');
            }
        }).then(json => {
            this.props.onToken(json.token);
            this.props.onSignInWindow();
            this.props.onMessenger();
            this.props.onChannels(this.props.token);
        }).catch(err => {
            alert("Не удалось войти");
            console.log(err)
        });
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

        this.signIn(user);
    }


    render() {
        let layerVisibleStyle = this.props.signInWindow ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={layerVisibleStyle} className={styles.signInPage}>
                <div className={styles.container}>
                    <h1 className="title">Sign In</h1>
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
                                SignIn
                            </button>
                        </div>
                    </div>

                    <button onClick={() => {
                        this.props.onSignUpWindow();
                        this.props.onSignInWindow();
                    }}>
                        SignUp
                    </button>
                </div>
            </div>
        )
    }

}

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
        onMessenger: () => {
            dispatch({type: Types.SHOW_MESSENGER})
        },
        onToken: (token) => {
            dispatch({type: Types.SET_TOKEN, payload: token})
        },
        onChannels: (token) => {
            dispatch(getChannelsAction(token))
        }
    })
)(SignIn);