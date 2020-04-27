import React from "react";
import styles from "./channels.module.css";
import Channel from "./channel/channel";
import {connect} from "react-redux";

let Channels = (props) => {
    let channels = [];
    for (let [key, value] of props.channels) {
        channels.push(value.channelName);
    }
    return (
        <div className={styles.channels}>
            {channels.map((channel, index) => (
                <Channel key={index} channel={channel}/>
            ))}
        </div>
    );
}

export default connect(
     state => ({channels: state.messenger.channels})
)(Channels);