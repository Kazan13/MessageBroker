import {addChannel, getChannels} from "../../services/http-service";
import {Types} from "../action-types/action-types";

export const getChannelsAction = (token) => dispatch => {
        getChannels(token).then(response => {
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
}


export const addChannelAction = (newChannelMessage) => dispatch => {
    addChannel(newChannelMessage).then(response => {
        if (response.ok) {
            dispatch({type: Types.HIDE_CREATE_CHANNEL_WINDOW});
            dispatch(getChannelsAction(newChannelMessage.token));
        } else {
            throw new Error('Error');
        }
    }).catch(err => {
        alert("Не удалось создать канал");
        dispatch({type: Types.HIDE_CREATE_CHANNEL_WINDOW});
        console.log(err)
    });
}