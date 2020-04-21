import React, {Component} from "react";
import styles from "./createChannelWindow.module.css"
import {connect} from "react-redux";
import {addChannel} from "../../../../services/http-service";

class CreateChannelWindow extends Component {
    constructor(props) {
        super(props);
        this.makeNewChannelMessage = this.makeNewChannelMessage.bind(this);
        this.addChannel = this.addChannel.bind(this);
    }

    async addChannel(newChannelMessage) {
        await addChannel(newChannelMessage).then(response => {
            if (response.ok) {
                this.props.onCreateChannelWindow();
            } else {
                throw new Error('Error');
            }
        }).catch(err => {
            alert("Не удалось создать канал");
            console.log(err)
        });
    }


    makeNewChannelMessage() {
        if (!this.channelName.value.length) {
            return;
        }
        const newChannelMessage = {
            token: this.props.token,
            channelName: this.channelName.value
        };

        this.addChannel(newChannelMessage);
    }

    render() {
        let windowVisibleStile = this.props.createChannelWindow ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={windowVisibleStile}
                 className={styles.layer}>
                <div className={styles.window}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Create new channel</div>
                        <div className={styles.closeButton}
                             onClick={
                                 this.props.onCreateChannelWindow
                             }>X
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
        createChannelWindow: state.createChannelWindow,
        token: state.token
    }),
    dispatch => ({
        onCreateChannelWindow: () => {
            dispatch({type: 'HIDE_CREATE_CHANNEL_WINDOW', payload: false})
        },
    })
)(CreateChannelWindow);