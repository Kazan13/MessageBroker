import React, {Component} from "react";
import styles from "./sign_up.module.css";
import {connect} from "react-redux";
import {signUp} from "../../../services/http-service";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.makeUser = this.makeUser.bind(this);
    }

    async signUp(user) {
        await signUp(user).then(response => {
            if (response.ok) {
                this.props.onSignUpLayer();
                this.props.onSignInLayer();
            } else {
                throw new Error('unauthorized');
            }
        }).catch(err => console.log(err));
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
        this.signUp(user);
    }


    render() {
        let layerVisibleStyle = this.props.signUpLayer ? {display: 'flex'} : {display: 'none'};
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
        {signUpLayer: state.signUpLayer}
    ),
    dispatch => ({
        onSignUpLayer: () => {
            dispatch({type: 'HIDE_SIGN_UP_LAYER'})
        },
        onSignInLayer: () => {
            dispatch({type: 'SHOW_SIGN_IN_LAYER'})
        }
    })
)(SignUp);