import React, {Component} from 'react';
import './App.module.css';
import SignUp from "./components/auth/sign_up/sign_up";
import SignIn from "./components/auth/sign_in/sign_in";
import Content from "./components/content/content";
import Header from "./components/content/header/header";
import Footer from "./components/content/footer/footer";
import CreateChannelWindow from "./components/content/channels/createChannelWindow/createChannelWindow";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.getChannels = this.getChannels.bind(this);
        this.getChannels();
    }

    async getChannels() {
        await signIn(this.props.token).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('unauthorized');
            }
        }).then(json => {
            let channels = new Map();
            for (let channel of json.channels) {
                channel.date = new Date(event.date);
                channels.set(channel.id, channel);
            }
            this.props.onChannels(channel);
        }).catch(err => {
            alert("Не удалось войти");
            console.log(err)
        });
    }

    render() {
        let messengerVisibleStyle = this.props.messenger ? {display: 'block'} : {display: 'none'};
        return (
            <div className="App">
                <SignUp/>
                <SignIn/>
                <div style={messengerVisibleStyle}>
                    <CreateChannelWindow/>
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => (
        {
            messenger: state.messenger,
            token: state.token
        }
    ),
    dispatch => (
        {
            onChannels: (channels) => {
                dispatch({type: 'SET_CHANNELS', payload: channels})
            }
        })
)(App);
