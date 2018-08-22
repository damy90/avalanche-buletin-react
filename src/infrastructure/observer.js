let subscriptions = {
    loginUser: [],
    logoutUser: [],
    notification: []
}

export default {
    events: {
        loginUser: 'loginUser',
        logoutUser: 'logoutUser',
        notification: 'notification'
    },

    subscribe: (eventName, callback) =>
        {
            subscriptions[eventName].push(callback)
        },

    trigger: (eventName, data) =>
        subscriptions[eventName].forEach(callback => callback(data))
}