import React, {Component} from "react";
import styles from "./sign_in.module.css";
import {connect} from "react-redux";
import {signIn} from "../../../services/http-service";

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
            this.props.onSignInLayer();
            this.props.onMessenger();
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
        this.signIn(user);
    }


    render() {
        let layerVisibleStyle = this.props.signInLayer ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={layerVisibleStyle} className={styles.signInPage}>
                <div className={styles.container}>
                    <h1 className="title">Sign In</h1>
                    <div className={styles.form}>
                        <div className={styles.input}>
                            <input
                                type="text"
                                placeholder="username"
                                value={this.username}
                                ref={(input => {
                                    this.username = input
                                })}
                            />
                        </div>
                        <div className={styles.input}>
                            <input
                                type="password"
                                placeholder="password"
                                value={this.password}
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
    state => (
        {signInLayer: state.signInLayer}
    ),
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
            dispatch({type : 'SET_TOKEN', payload: token})
        }
    })
)(SignIn);