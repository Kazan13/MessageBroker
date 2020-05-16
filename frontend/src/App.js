import React from 'react';
import SignUp from "./components/auth/sign_up/sign_up";
import SignIn from "./components/auth/sign_in/sign_in";
import Content from "./components/content/content";
import Header from "./components/content/header/header";
import Footer from "./components/content/footer/footer";
import CreateChannelWindow from "./components/content/channels/createChannelWindow/create-channel-window";
import {connect} from "react-redux";
import SplashScreen from "./components/loading-window/splash-screen/splash-screen";
import SearchChannelsWindow from "./components/content/channels/searchChannelsWindow/search-channels-window";
import styles from './App.module.css';
import BackgroundLayer from "./components/loading-window/background-layer/background-layer";

const App = (props) => {

    let messengerVisibleStyle = props.messenger ? {display: 'block'} : {display: 'none'};
    return (
        <div className={styles.App}>
            <SplashScreen/>
            <SignUp/>
            <SignIn/>
            <div style={messengerVisibleStyle}>
                <BackgroundLayer/>
                <CreateChannelWindow/>
                <SearchChannelsWindow />
                <Header/>
                <div className={styles.line}></div>
                <Content/>
                <Footer/>
            </div>
        </div>
    );
}


export default connect(store =>
    ({messenger: store.modalWindow.messenger.isVisible}))
(App);
