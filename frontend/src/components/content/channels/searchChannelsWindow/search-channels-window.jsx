import React, {useState} from "react";
import styles from "./search-channels-window.module.css"
import {connect} from "react-redux";
import {Types} from "../../../../redux/action-types/action-types";
import ChannelsList from "./channelsList/channels-list";

/**
 * Окно поиска каналов
 * @param props
 * @returns {*}
 * @constructor
 */
const SearchChannelsWindow = (props) => {
    let [searchInput, changeSearchChannel] = useState(undefined);

    let windowVisibleStile = props.searchChannelWindow ? {display: 'flex'} : {display: 'none'};
    return (
            <div className={styles.window} style={windowVisibleStile}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Search channels</div>
                    <div className={styles.closeButton}
                         onClick={() => {
                             props.onSearchChannelWindow();
                             searchInput.value = '';
                         }}>
                        X
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <input className={styles.searchInput}
                        type="text"
                           placeholder="channel name"
                           ref={(input => {
                               changeSearchChannel(input)
                           })}/>
                    <div className={styles.searchButton}
                         onClick={() => {
                                 props.onFindChannel(searchInput.value);
                         }}>search
                    </div>
                </div>

                <div className={styles.channels}>
                    <ChannelsList/>
                </div>
            </div>
    );
}

export default connect(
    state => {
        return {
            searchChannelWindow: state.modalWindow.searchChannelWindow.isVisible,
            token: state.auth.token.token,
        }
    },
    dispatch => ({
        onSearchChannelWindow: () => {
            dispatch({type: Types.HIDE_SEARCH_CHANNEL_WINDOW});
            dispatch({type: Types.HIDE_BG_LAYER});
        },
        onFindChannel: (channelName) => {
            dispatch({type: Types.FIND_CHANNEL, payload: channelName})
        },
    })
)(SearchChannelsWindow);