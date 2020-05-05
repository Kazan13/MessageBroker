import React, {useState} from "react";
import styles from "./dialog.module.css"
import {connect} from "react-redux";
import {sendMessageAction} from "../../../redux/actions/ws-actions";

const Dialog = (props) => {


    let [messageInput, changeMessage] = useState(undefined);

    const createNewMessage = () => {
        // if (messageInput.value === '') {
        //     console.log('message.value===null')
        //     return;
        // }
        const newMessage = {
            token: props.token,
            channelId: props.channelId,
            message: messageInput.value,
            date: new Date()
        };
        props.ws.sendMessage(JSON.stringify(newMessage));

        props.sendMessage(newMessage);
        messageInput.value = '';
    }

    return (
        <div className={styles.dialog}>
            <div className={styles.messages}>

            </div>

            <div className={styles.messageInputForm}>
                <div>
                    <input className={styles.messageInput}
                        type="text"
                        placeholder="message"
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
}


export default connect(
    state => ({
        token: state.auth.token.token,
        channelId: state.messenger.currentChannel,
    }),
    dispatch => ({
        sendMessage: (message) => {
            dispatch(sendMessageAction(message))
        }
    })
)(Dialog);