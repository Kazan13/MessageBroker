import React from "react";
import styles from "./channels.module.css";
import Channel from "./channel/channel";
import {connect} from "react-redux";

/**
 * User Channels List
 * @param props
 * @returns {*}
 * @constructor
 */
let Channels = (props) => {
    let channels = [];
    for (let channel of props.channels.values()) {
        channels.push(channel);
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