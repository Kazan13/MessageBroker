const URL = 'http://localhost';
const PORT = '8080';

/**
 * Запрос на подверждение правильности токена
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
 * Запрос на вход в аккаунт
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
 * Запрос на регистрацию
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
 * Выход из аккаунта
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
 * Запрос каналов, на которые подписан пользователь
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
 * Запрос всех каналов
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
 * Добавление канала
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
 * Подписка на канал
 * @param channelName
 * @param token
 * @returns {Promise<Response>}
 */
export const subscribe = (subscribeMessage) => {
    return fetch(`${URL}:${PORT}/subscribe`, {
        method: 'POST',
        body: JSON.stringify(
            {
                'token': subscribeMessage.token,
                'channelId': subscribeMessage.channelId
            }
        )
    })
};