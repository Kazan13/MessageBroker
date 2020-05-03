import React from "react";
import {connect} from "react-redux";
import {subscribeAction} from "../../../../../redux/actions/channels-actions";

const ChannelsList = (props) => (
    <div>
        {props.channels.map((channel, index) =>
            <div key={index}>
                <button onClick={() => {
                    props.onSubscribe({token: props.token, channelId: channel.id})
                }}>subscribe
                </button>
                {channel.channelName} </div>)}
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