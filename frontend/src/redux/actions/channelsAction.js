import {getChannels} from "../../services/http-service";

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
                dispatch({type: 'SET_CHANNELS', payload: channels});
            }
        ).catch(err => {
            alert("Не удается получить список каналов");
        });
}