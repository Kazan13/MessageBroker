const URL = 'http://localhost';
const PORT = '8080';

/**
 *
 * @param token
 * @returns {Promise<Response>}
 */
export const isTokenValid = (token) => {
    return fetch(`${URL}:${PORT}/is-token-valid`, {
        method: 'POST',
        body: JSON.stringify(token)
    })
};

/**
 *
 * @param user
 * @returns {Promise<Response>}
 */
export const signIn = (user) => {
    return fetch(`${URL}:${PORT}/sign-in`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
};

/**
 *
 * @param user
 * @returns {Promise<Response>}
 */
export const signUp = (user) => {
    return fetch(`${URL}:${PORT}/sign-up`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
};

/**
 *
 * @param token
 * @returns {Promise<Response>}
 */
export const logOut = (token) => {
    return fetch(`${URL}:${PORT}/log-out`, {
        method: 'POST',
        body: JSON.stringify(token)
    })
};

/**
 *
 * @param token
 * @returns {Promise<Response>}
 */
export const getUserChannels = (token) => {
    return fetch(`${URL}:${PORT}/get-user-channels`, {
        method: 'POST',
        body: JSON.stringify({'token': token})
    })
};

/**
 *
 * @param token
 * @returns {Promise<Response>}
 */
export const getAllChannels = (token) => {
    return fetch(`${URL}:${PORT}/get-all-channels`, {
        method: 'POST',
        body: JSON.stringify({'token': token})
    })
};

/**
 *
 * @param channelMessage
 * @returns {Promise<Response>}
 */
export const addChannel = (channelMessage) => {
    return fetch(`${URL}:${PORT}/add-channel`, {
        method: 'POST',
        body: JSON.stringify(channelMessage)
    })
};

/**
 *
 * @param channelName
 * @param token
 * @returns {Promise<Response>}
 */
export const subscribe = (channelId, token) => {
    return fetch(`${URL}:${PORT}/subscribe`, {
        method: 'POST',
        body: JSON.stringify(
            {
                'token': token,
                'channelId': channelId
            }
        )
    })
};