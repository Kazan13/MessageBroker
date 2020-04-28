import React, {Component} from "react";
import styles from "./dialog.module.css"
import {connect} from "react-redux";

const Dialog = (props) => {
    return (
        <div className={styles.dialog}>
            <div className={styles.messages}>

            </div>

            <div className={styles.messageInput}>
                <div className="input">
                    <input type="text"/>
                </div>
                <div className="inputButton">
                    <button>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}


export default connect(
    state => ({}),
    dispatch => ({
        sendMessage: (message) => {
            dispatch(sendMessageAction(message))
        }
    })
)(Dialog);