import React, {Component} from "react";
import styles from "./sign_in.module.css";
import {connect} from "react-redux";
import {getChannels, signIn} from "../../../services/http-service";
import {Types} from "../../../redux/action-types/action-types";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.makeUser = this.makeUser.bind(this);
        this.getChannels = this.getChannels.bind(this);
    }


    async getChannels() {
        await getChannels(this.props.token).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('unauthorized');
            }
        }).then(json => {
            this.props.onChannels(json.channels.channels);
        }).catch(err => {
            alert("Не удалось войти");
            console.log(err)
        });
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
            this.props.onSignInLayer();
            this.props.onMessenger();
            this.getChannels();
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
                        this.props.onSignUpLayer();
                        this.props.onSignInLayer();
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
        if (state.modalWindow && state.auth)
            return {
                signInWindow: state.modalWindow.signInWindow.isVisible,
                token: state.auth.token.token
            }
        else if (state.auth)
            return {
                signInWindow: true,
                token: state.auth.token.token
            }
        else if(state.modalWindow)
            return {
                signInWindow: state.modalWindow.signInWindow.isVisible,
                token: ""
            }
    },
    dispatch => ({
        onSignUpLayer: () => {
            dispatch({type: 'SHOW_SIGN_UP_LAYER'})
        },
        onSignInLayer: () => {
            dispatch({type: 'HIDE_SIGN_IN_LAYER'})
        },
        onMessenger: () => {
            dispatch({type: 'SHOW_MESSENGER'})
        },
        onToken: (token) => {
            dispatch({type: 'SET_TOKEN', payload: token})
        },
        onChannels: (channels) => {
            dispatch({type: 'SET_CHANNELS', payload: channels})
        }
    })
)(SignIn);