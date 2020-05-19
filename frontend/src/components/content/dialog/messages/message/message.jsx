import React from "react";
import styles from "./message.module.css"
import {getFormattedDateString} from "../../../../../util/getFormattedDateString";

const Message = (props) => {
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
                <div className={styles.img}>
                    <img src="https://sun9-18.userapi.com/c848520/v848520144/155526/wuo2Mf5s_MI.jpg" alt="img"
                         border="0"/>
                </div>

                <div className={styles.messageText}>
                    {props.receivedMessage.message}
                </div>
            </div>


        </div>
    )
};


export default Message;