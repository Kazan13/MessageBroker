import React, {Component} from "react";
import styles from "./content.module.css"
import Channels from "./channels/channels";
import Dialog from "./dialog/dialog";

class Content extends Component{
    render() {
        return (
            <div className={styles.content}>
                <Channels/>
                <Dialog/>
            </div>
        )
    }
}

export default Content;