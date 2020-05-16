import React from "react";
import styles from "./this-user-message.module.css"
import {getDate} from "../getDate";

const ThisUserMessage = (props) => {
    return (
        <div className={styles.message}>
            <div className={styles.messageInf}>
                <div className={styles.senderName}>
                    {props.message.senderName}
                </div>

                <div className={styles.sentTime}>
                    {getDate(props.message.date)}
                </div>

            </div>

            <div className={styles.messageImg}>
                <div className={styles.img}>
                    <img src="https://i.ibb.co/YywFDHg/2020-05-04-22-39-01.jpg" alt="img" border="0"/>
                </div>

                <div className={styles.messageText}>
                    {props.message.message}
                </div>
            </div>
        </div>
    )
};


export default ThisUserMessage;