import React, {Component} from "react";
import styles from "./create-channel-window.module.css"
import {connect} from "react-redux";
import {addChannelAction} from "../../../../redux/actions/channels-actions";

class CreateChannelWindow extends Component {
    constructor(props) {
        super(props);
        this.makeNewChannelMessage = this.makeNewChannelMessage.bind(this);
    }

    makeNewChannelMessage() {
        if (!this.channelName.value.length) {
            return;
        }
        const newChannelMessage = {
            token: this.props.token,
            channelName: this.channelName.value
        };
        this.channelName.value = '';
        this.props.onChannels(newChannelMessage);
    }

    render() {
        let windowVisibleStile = this.props.createChannelWindow ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={windowVisibleStile}
                 className={styles.layer}>
                <div className={styles.window}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Create new channel</div>
                        <div
                            className={styles.closeButton}
                            onClick={this.props.onCreateChannelWindow}>
                            X
                        </div>
                    </div>

                    <div className={styles.form}>
                        <input
                            type="text"
                            placeholder="channel name"
                            ref={(input => {
                                this.channelName = input
                            })}/>
                        <button onClick={this.makeNewChannelMessage}>create</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        createChannelWindow: state.modalWindow.createChannelWindow.isVisible,
        token: state.auth.token.token
    }),
    dispatch => ({
        onChannels: (newChannelMessage) => {
            dispatch(addChannelAction(newChannelMessage))
        }
    })
)(CreateChannelWindow);