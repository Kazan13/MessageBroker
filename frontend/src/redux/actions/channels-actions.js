import {addChannel, getAllChannels, getUserChannels, subscribe} from "../../services/http-service";
import {Types} from "../action-types/action-types";

/**
 * get user channels
 * @param token
 * @returns {function(...[*]=)}
 */
export const getUserChannelsAction = (token) => dispatch => {
    getUserChannels(token).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('error');
        }
    }).then(json => {
            let channels = new Map();
            json.channels.forEach(channel => {
                channels.set(channel.id, channel)
            })
            dispatch({type: Types.SET_CHANNELS, payload: channels});
        }
    ).catch(err => {
        alert("Не удается получить список каналов");
    });
};

/**
 * get all channels
 * @param token
 * @returns {function(...[*]=)}
 */
export const getAllChannelsAction = (token) => dispatch => {
    getAllChannels(token).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('error');
        }
    }).then(json => {
            let channels = new Map();
            json.channels.forEach(channel => {
                channels.set(channel.id, channel)
            })
            dispatch({type: Types.SET_ALL_CHANNELS, payload: channels});
            dispatch({type: Types.SHOW_SEARCH_CHANNEL_WINDOW});
        }
    ).catch(err => {
        alert("Не удается получить список каналов");
    });
};

/**
 * add new channel
 * @param newChannelMessage
 * @returns {function(...[*]=)}
 */
export const addChannelAction = (newChannelMessage) => dispatch => {
    addChannel(newChannelMessage).then(response => {
        if (response.ok) {
            dispatch({type: Types.HIDE_CREATE_CHANNEL_WINDOW});
            dispatch({type: Types.HIDE_BG_LAYER});
            dispatch(getUserChannelsAction(newChannelMessage.token));
        } else {
            throw new Error('Error');
        }
    }).catch(err => {
        alert("Не удалось создать канал");
        dispatch({type: Types.HIDE_CREATE_CHANNEL_WINDOW});
        console.log(err)
    });
};

/**
 * subscribe
 * @param subscribeMessage
 * @returns {function(...[*]=)}
 */
export const subscribeAction = (subscribeMessage) => dispatch => {
    subscribe(subscribeMessage).then(response => {
        if (response.ok) {
            dispatch({type: Types.HIDE_SEARCH_CHANNEL_WINDOW});
            dispatch({type: Types.HIDE_BG_LAYER})
            dispatch(getUserChannelsAction(subscribeMessage.token));
        } else {
            throw new Error('Error');
        }
    }).catch(err => {
        alert("Не удалось подписаться на канал");
        dispatch({type: Types.HIDE_SEARCH_CHANNEL_WINDOW});
        console.log(err)
    });
};