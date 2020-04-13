import React, {Component} from 'react';
import './App.module.css';
import SignUp from "./components/auth/sign_up/sign_up";
import DataController from "./redux/data-controller";
import SignIn from "./components/auth/sign_in/sign_in";
import Content from "./components/content/content";
import Header from "./components/content/header/header";
import Footer from "./components/content/footer/footer";
import CreateChannelWindow from "./components/content/channels/createChannelWindow/createChannelWindow";
import {createStore} from "redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.dataController = new DataController(this);
        this.state = this.dataController.getState();
    }

    onChannelsChange(channelsNewState) {
        this.setState({
            channels: channelsNewState.channels
        })
    }

    onTokenChange(tokenNewState) {
        this.setState({
            token: tokenNewState.token
        })
    }
    onMessengerChange(messengerNewState) {
        this.setState({
            messenger: messengerNewState.messenger
        });
    }

    onSignUpLayerChange(signUpLayerNewState) {
        this.setState({
            signUpLayer: signUpLayerNewState.signUpLayer
        });
    }

    onSignInLayerChange(signInLayerNewState) {
        this.setState({
            signInLayer: signInLayerNewState.signInLayer
        });
    }

    onChannelIdChanged(channelIdState) {
        this.setState({
            channelId: channelIdState.channelId
        })
    }

    onCreateNewChannelWindowChanged(newWindowState) {
        this.setState({
            createNewChannelWindow: newWindowState.createNewChannelWindow
        })
    }

    render() {
        let messengerVisibleStyle = this.state.messenger ? {display: 'block'} : {display: 'none'};
        return (
            <div className="App">
                <SignUp dataController={this.dataController}
                        signUpLayer={this.state.signUpLayer}/>
                <SignIn dataController={this.dataController}
                        signInLayer={this.state.signInLayer}/>
                <div style={messengerVisibleStyle}>
                    <CreateChannelWindow
                        dataController={this.dataController}
                        window={this.state.createNewChannelWindow}
                        token={this.state.token}/>
                    <Header
                        dataController={this.dataController}/>
                    <Content
                        channelId={this.state.channelId}
                        channels={this.state.channels}/>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
