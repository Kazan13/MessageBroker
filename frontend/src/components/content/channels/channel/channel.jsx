import React, {Component} from "react";
import styles from "./channel.module.css"

class Channel extends Component {
    render() {
        return (
            <div className={styles.channel}>
                <div className={styles.img}>

                </div>
                <div className={styles.channelName}>
                    {this.props.channel}
                </div>
            </div>
        )
    }
}


export default Channel;