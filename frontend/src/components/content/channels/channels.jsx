import React, {Component} from "react";
import styles from "./channels.module.css";
import Channel from "./channel/channel";

class Channels extends Component {
    render() {
        return (
            <div className={styles.channels}>
                {this.props.channels.map(channel => (
                    <Channel channel={channel} />
                ))}
            </div>
        )
    }
}


export default Channels;