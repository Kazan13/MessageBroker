import React from "react";
import styles from "./content.module.css"
import Channels from "./channels/channels";
import Dialog from "./dialog/dialog";


/**
 *
 * @returns {*}
 * @constructor
 */
const Content = (props) => {
        return (
            <div className={styles.content}>
                <Channels/>
                <Dialog/>
            </div>
        )
}

export default Content;