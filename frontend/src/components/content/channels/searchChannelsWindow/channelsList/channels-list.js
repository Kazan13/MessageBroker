import React from "react";
import {connect} from "react-redux";
import {subscribeAction} from "../../../../../redux/actions/channels-actions";
import {Types} from "../../../../../redux/action-types/action-types";
import styles from "./channel-list.module.css"

const ChannelsList = (props) => (
    <div>
        {props.channels.map((channel, index) =>

            <div className={styles.subscribe}>
                <div key={index} className={styles.channel}>

                    <div className={styles.img}>
                        <img src="https://i.ibb.co/YywFDHg/2020-05-04-22-39-01.jpg" alt="img" border="0"/>
                    </div>
                    <div className={styles.channelName}>
                        {channel.channelName}
                    </div>
                </div>

                <div className={styles.subscribeButton} onClick={() => {
                    props.onSubscribe({token: props.token, channelId: channel.id})
                }}>subscribe
                </div>

            </div>
        )}
    </div>
);

export default connect(
    state => {
        let channels = [];
        for (let channel of state.messenger.allChannels.values()) {
            channels.push(channel);
        }

        return {
            token: state.auth.token.token,
            channels: channels.filter(channel =>
                channel.channelName.includes(state.messenger.filterChannel))
        }
    },
    dispatch => ({
        onSubscribe: (subscribeMessage) => {
            dispatch(subscribeAction(subscribeMessage));
        }
    })
)(ChannelsList);