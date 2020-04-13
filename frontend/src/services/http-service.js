export function signIn (user) {
    return fetch("http://localhost:8080/sign-in", {
        method: 'POST',
        body: JSON.stringify(user)
    })
}


export function signUp (user) {
    return fetch("http://localhost:8080/sign-up", {
        method: 'POST',
        body: JSON.stringify(user)
    })
}