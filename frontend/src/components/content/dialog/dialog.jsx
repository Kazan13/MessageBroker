import React, {Component} from "react";
import styles from "./dialog.module.css"

class Dialog extends Component {
    render() {
        return (
            <div className={styles.dialog}>
                <div className={styles.messages}>

                </div>
            </div>
        )
    }
}


export default Dialog;