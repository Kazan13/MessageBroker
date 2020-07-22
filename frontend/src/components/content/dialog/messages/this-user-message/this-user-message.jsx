import React from "react";
import styles from "./this-user-message.module.css"
import {getFormattedDateString} from "../../../../../util/getFormattedDateString";

const ThisUserMessage = (props) => {
    return (
        <div className={styles.message}>
            <div className={styles.messageInf}>
                <div className={styles.senderName}>
                    {props.receivedMessage.senderName}
                </div>

                <div className={styles.sentTime}>
                    {getFormattedDateString(props.receivedMessage.date)}
                </div>

            </div>

            <div className={styles.messageImg}>
                <div className={styles.avatar}>
                    <div>{`${props.receivedMessage.senderName.charAt(0)}${props.receivedMessage.senderName.charAt(1)}`}</div>
                </div>

                <div className={styles.messageText}>
                    {props.receivedMessage.message}
                </div>
            </div>
        </div>
    )
};


export default ThisUserMessage;