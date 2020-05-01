import React, {Component} from "react";
import styles from "./dialog.module.css"
import {connect} from "react-redux";
import {sendMessageAction} from "../../../redux/actions/ws-actions";

class Dialog extends Component{
    constructor(props) {
        super(props);
        this.createNewMessage = this.createNewMessage.bind(this);
    }

    createNewMessage() {
        if (!this.message.value.length) {
            return;
        }
        const newMessage = {
            token: this.props.token,
            channelId: this.props.channelId,
            message: this.message.value,
            date: new Date()
        };
        this.message.value = '';
        this.props.sendMessage(newMessage);
    }


    render() {
        return (
            <div className={styles.dialog}>
                <div className={styles.messages}>

                </div>

                <div className={styles.messageInput}>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="message"
                            ref={(input => {
                                this.message = input
                            })}/>
                    </div>
                    <div className="inputButton">
                        <button onClick={this.createNewMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({}),
    dispatch => ({
        sendMessage: (message) => {
            dispatch(sendMessageAction(message))
        }
    })
)(Dialog);