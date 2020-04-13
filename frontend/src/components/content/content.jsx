import React, {Component} from "react";
import styles from "./content.module.css"
import Channels from "./channels/channels";
import Dialog from "./dialog/dialog";

class Content extends Component{
    render() {
        return (
            <div className={styles.content}>
                <Channels channels={this.props.channels} />
                <Dialog channelId={this.props.channelId}/>
            </div>
        )
    }
}

export default Content;