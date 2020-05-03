import React, {useState} from "react";
import styles from "./create-channel-window.module.css"
import {connect} from "react-redux";
import {addChannelAction} from "../../../../redux/actions/channels-actions";
import {Types} from "../../../../redux/action-types/action-types";

/**
 * Окно создания канала
 * @param props
 * @returns {*}
 * @constructor
 */
const CreateChannelWindow = (props) => {

    let [createInput, changeCreateChannel] = useState(undefined);


    let windowVisibleStile = props.createChannelWindow ? {display: 'flex'} : {display: 'none'};
    return (
        <div style={windowVisibleStile}
             className={styles.layer}>
            <div className={styles.window}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Create new channel</div>
                    <div
                        className={styles.closeButton}
                        onClick={props.onCreateChannelWindow}>
                        X
                    </div>
                </div>

                <div className={styles.form}>
                    <input
                        type="text"
                        placeholder="channel name"
                        ref={(input => {
                            changeCreateChannel(input)
                        })}/>
                    <div className={styles.createButton} onClick={() => {
                        if (createInput.value !== '') {
                            props.onChannels(
                                {
                                    token: props.token,
                                    channelName: createInput.value
                                });
                            createInput.value = '';
                        }
                    }}>create
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    state => ({
        createChannelWindow: state.modalWindow.createChannelWindow.isVisible,
        token: state.auth.token.token
    }),
    dispatch => ({
        onChannels: (newChannelMessage) => {
            dispatch(addChannelAction(newChannelMessage))
        },
        onCreateChannelWindow: () => {
            dispatch({type: Types.HIDE_CREATE_CHANNEL_WINDOW})
        }
    })
)(CreateChannelWindow);