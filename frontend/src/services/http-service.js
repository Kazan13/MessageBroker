export function signIn(user) {
    return fetch("http://localhost:8080/sign-in", {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

export function signUp(user) {
    return fetch("http://localhost:8080/sign-up", {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

export function getChannels(token) {
    return fetch("http://localhost:8080/get-channels", {
        method: 'POST',
        body: JSON.stringify({'token': token})
    })
}

export function addChannel(channel) {
    return fetch("http://localhost:8080/add-channel", {
        method: 'POST',
        body: JSON.stringify(channel)
    })
}

export function subscribe(channelName, token) {
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