import React, {Component} from "react";
import styles from "./sign_up.module.css";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    usernameChange(e) {
        this.setState({
            ...this.state,
            username: e.target.value});
    }

    passwordChange(e) {
        this.setState({
            ...this.state,
            password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.username.length || !this.state.password.length) {
            return;
        }
        const user = {
            username: this.state.username,
            password: this.state.password,
        };


        this.props.dataController.signUp(user);

        this.setState(state => ({
            ...this.state,
            username: '',
            password: ''
        }));
    }


    render() {
        let layerVisibleStyle = this.props.signUpLayer ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={layerVisibleStyle} className={styles.signInPage}>
                <div className={styles.container}>
                    <h1 className="title">Sign Up</h1>
                    <form className={styles.form} onSubmit={this.handleSubmit}>
                        <div className={styles.input}>
                            <input
                                type="text"
                                placeholder="username"
                                onChange={this.usernameChange}
                                value={this.state.username}
                            />
                        </div>
                        <div className={styles.input}>
                            <input
                                type="password"
                                placeholder="password"
                                onChange={this.passwordChange}
                                value={this.state.password}
                            />
                        </div>
                        <div>
                            <button>
                                SignUp
                            </button>
                        </div>
                    </form>
                    <button onClick={()=>{
                        this.props.dataController.showSignInLayer();
                    }}>
                        SignIn
                    </button>
                </div>
            </div>
        )
    }

}

export default SignIn;