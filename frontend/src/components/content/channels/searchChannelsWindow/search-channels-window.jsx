import React, {useState} from "react";
import styles from "./search-channels-window.module.css"
import {connect} from "react-redux";
import {Types} from "../../../../redux/action-types/action-types";
import {subscribeAction} from "../../../../redux/actions/channels-actions";


const SearchChannelsWindow = (props) => {

    let [searchInput, changeSearchChannel] = useState('');


    const findChannel = () => {
        props.onFindChannel(searchInput);
        changeSearchChannel('');
    }


    let windowVisibleStile = props.searchChannelWindow ? {display: 'flex'} : {display: 'none'};
    return (
        <div style={windowVisibleStile}
             className={styles.layer}>
            <div className={styles.window}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Search channels</div>
                    <div className={styles.closeButton}
                         onClick={props.onSearchChannelWindow}>
                        X
                    </div>
                </div>

                <div className={styles.form}>
                    <input type="text"
                           placeholder="channel name"
                           onChange={event => {
                               changeSearchChannel(event.target.value);
                           }}/>
                    <button
                        onClick={findChannel}>search
                    </button>
                </div>

                <div className={styles.channels}>
                    <div>
                        {props.channels.map((channel, index) =>
                            <div key={index}>
                                <button onClick={() => {
                                    props.onSubscribe({token: props.token, channelId: channel.id})
                                }}>subscribe
                                </button>
                                {channel.channelName} </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => {
        let channels = [];
        for (let channel of state.messenger.allChannels.values()) {
            channels.push(channel);
        }

        return {
            searchChannelWindow: state.modalWindow.searchChannelWindow.isVisible,
            token: state.auth.token.token,
            channels: channels.filter(channel =>
                channel.channelName.includes(state.messenger.filterChannel))
        }
    },
    dispatch => ({
        onSearchChannelWindow: () => {
            dispatch({type: Types.HIDE_SEARCH_CHANNEL_WINDOW})
        },
        onFindChannel: (channelName) => {
            dispatch({type: Types.FIND_CHANNEL, payload: channelName})
        },
        onSubscribe: (subscribeMessage) => {
            dispatch(subscribeAction(subscribeMessage));
        }
    })
)(SearchChannelsWindow);