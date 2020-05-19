import React from "react";
import styles from "./messages.module.css"
import {connect} from "react-redux";
import Message from "./message/message";
import ThisUserMessage from "./this-user-message/this-user-message";

const Messages = (props) => {
    return (
        <div className={styles.messages}>
            {props.messages.map((receivedMessage, index) => {
                    if (receivedMessage.senderId === props.id)
                        return <ThisUserMessage key={index} receivedMessage={receivedMessage}/>;
                    return <Message key={index} receivedMessage={receivedMessage}/>;

                }
            )}
        </div>
    )
};


export default connect(
    state => ({
        messages: state.messenger.messages.get(state.messenger.currentChannel + "") ?
            state.messenger.messages.get(state.messenger.currentChannel + "") :
            [],
        currentChannel: state.messenger.currentChannel,
        id: state.auth.id
    }),
    dispatch => ({})
)(Messages);