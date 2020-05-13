import React from "react";
import styles from "./messages.module.css"
import {connect} from "react-redux";

const Messages = (props) =>{
        return (
            <div className={styles.message}>
                {props.messages.map(message => (
                    <div>{message}</div>
                ))}
            </div>
        )
};


export default connect(
    state => ({
        messages: state.messenger.messages.get(state.messenger.currentChannel),
        currentChannel: state.messenger.currentChannel
    }),
    dispatch => ({

    })
)(Messages);