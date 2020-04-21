import React, {Component} from "react";
import styles from "./channels.module.css";
import Channel from "./channel/channel";
import {connect} from "react-redux";

class Channels extends Component {
    render() {
        if (this.props.channels)
            return (
                <div className={styles.channels}>
                    {this.props.channels.map((channel, index) => (
                        <Channel key={index} channel={channel}/>
                    ))}
                </div>
            );
        else return <div></div>;
    }
}

export default connect(
    state => (
        {channels: state.channels}
    )
)(Channels);