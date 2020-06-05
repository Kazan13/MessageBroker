import React from "react";
import CreateChannelWindow from "../content/channels/createChannelWindow/create-channel-window";
import Header from "../content/header/header";
import styles from "./messenger.module.css";
import Content from "../content/content";
import Footer from "../content/footer/footer";
import {connect} from "react-redux";
import SearchChannelsWindow from "../content/channels/searchChannelsWindow/search-channels-window";
import BackgroundLayer from "../loading-window/background-layer/background-layer";

const Messenger = (props) => {
    let messengerVisibleStyle = props.messenger ? {display: 'flex'} : {display: 'none'};

    return (
        <div style={messengerVisibleStyle} className={styles.messenger}>
            <BackgroundLayer/>
            <SearchChannelsWindow/>
            <CreateChannelWindow/>
            <div className={styles.page}>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        </div>
    )
};

export default connect(store =>
    ({messenger: store.modalWindow.messenger.isVisible}))
(Messenger);