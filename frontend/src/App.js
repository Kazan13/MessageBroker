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
    render() {
        debugger
        let messengerVisibleStyle = this.props.messenger ? {display: 'block'} : {display: 'none'};
        return (
            <div className="App">
                <SignUp/>
                <SignIn/>
                <div style={messengerVisibleStyle}>
                    <CreateChannelWindow/>
                    <Header/>
                    <Content />
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => (
        {
            messenger: state.messenger
        }
    )
)(App);
