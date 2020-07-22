import React, {useState} from "react";
import styles from "./dialog.module.css"
import {connect} from "react-redux";
import {sendMessageAction} from "../../../redux/actions/ws-actions";
import Messages from "./messages/messages";
import Button from "@material-ui/core/Button";

const Dialog = (props) => {
    let visibleStyle = props.channelId ? {display: 'flex'} : {display: 'none'};
    let visibleStyleImg = !props.channelId ? {display: 'flex'} : {display: 'none'};

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
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent browser behavior
        createNewMessage();

    };

    return (
        <div className={styles.dialog}>
            <h3 style={visibleStyleImg}>Создайте чат или зайдите в существующий</h3>

            <Messages/>

            <form style={visibleStyle} className={styles.messageInputForm}
                  onSubmit={handleSubmit}>

                <input type="text"
                       placeholder="Message..."
                       ref={(input => {
                           changeMessage(input);
                       })}/>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.inputButton}>
                    Send
                </Button>
            </form>
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