import React from 'react';
import SignUp from "./components/auth/sign_up/sign_up";
import SignIn from "./components/auth/sign_in/sign_in";
import Content from "./components/content/content";
import Header from "./components/content/header/header";
import Footer from "./components/content/footer/footer";
import CreateChannelWindow from "./components/content/channels/createChannelWindow/create-channel-window";
import {connect} from "react-redux";

const App = (props) => {
    let messengerVisibleStyle = props.messenger ? {display: 'block'} : {display: 'none'};
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


export default connect(store =>
    ({messenger: store.modalWindow.messenger.isVisible}))
(App);
