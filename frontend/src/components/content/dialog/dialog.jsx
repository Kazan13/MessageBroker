import React, {useState} from "react";
import styles from "./dialog.module.css"
import {connect} from "react-redux";
import {sendMessageAction} from "../../../redux/actions/ws-actions";
import Messages from "./messages/messages";

const Dialog = (props) => {
    let [messageInput, changeMessage] = useState(undefined);

    const createNewMessage = () => {
        if (messageInput.value === '')
            return;

        const data = {
            token: props.token,
            channelId: props.channelId,
            message: messageInput.value,
            date: Date.now()
        };

        let PUBLISH = 'PUBLISH';
        const receivedMessage = {
            type: PUBLISH,
            data: JSON.stringify(data)
        }

        props.sendMessage(receivedMessage);
        messageInput.value = '';
    }

    return (
        <div className={styles.dialog}>

                <Messages/>

            <div className={styles.messageInputForm}>
                <div>
                    <input className={styles.messageInput}
                           type="text"
                           placeholder="receivedMessage"
                           ref={(input => {
                               changeMessage(input);
                           })}/>
                </div>
                <div className={styles.inputButton}>
                    <div onClick={() => {
                        createNewMessage();
                    }}>
                        Send
                    </div>
                </div>
            </div>
        </div>
    )
};


export default connect(
    state => ({
        token: state.auth.token.token,
        channelId: state.messenger.currentChannel,
    }),
    dispatch => ({
        sendMessage: (receivedMessage) => {
            dispatch(sendMessageAction(receivedMessage))
        }
    })
)(Dialog);