export const signIn = (user) => {
    return fetch("http://localhost:8080/sign-in", {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

export const signUp = (user) => {
    return fetch("http://localhost:8080/sign-up", {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

export const getChannels = (token) => {
    return fetch("http://localhost:8080/get-channels", {
        method: 'POST',
        body: JSON.stringify({'token': token})
    })
}

export const addChannel = (channelMessage) => {
    return fetch("http://localhost:8080/add-channel", {
        method: 'POST',
        body: JSON.stringify(channelMessage)
    })
}

export const subscribe = (channelName, token) => {
    return fetch("http://localhost:8080/subscribe", {
        method: 'POST',
        body: JSON.stringify(
            {
                'token': token,
                'channelName': channelName
            }
        )
    })
}