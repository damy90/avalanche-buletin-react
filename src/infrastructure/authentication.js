import requester from "./requester";
import React, {Component} from 'react';
import observer from "./observer";
import history from "./history";

let userRoles = JSON.parse(sessionStorage.getItem('userRoles'));
let logIn = {
    send: credentials => {
        if(!credentials.username && ! credentials.password) {
            credentials = {
                username: 'Anonymous',
                password: 'anonymous'
            };
        }

        return requester.post('user', 'login', 'basic', credentials)
    },
    success: res => {
        observer.trigger(observer.events.loginUser, res.username);
        observer.trigger(observer.events.notification, { type: 'success', message: "Successs." })
        
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('username', res.username);

        let self = this;
        return requester.get('user', '_me', 'kinvey')
            .then(res => {
                userRoles = res._kmd.roles || [];
                sessionStorage.setItem('userRoles', JSON.stringify(userRoles));
            });
    },
    fail: res => {
        observer.trigger(observer.events.notification, { 
            type: 'error', 
            message: res.responseJSON.description
        });
        
        this.setState({ username: '', password: '' });
    }
}
let register = {
    send: data => requester.post('user', '', 'basic', data),
    success: logIn.success,
    fail: function(res) {
        observer.trigger(observer.events.notification, { 
            type: 'error', 
            message: res.responseJSON.description
        });

        this.setState({ username: '', password: '' });
    }
}

let getUser = {
    send: id => requester.get('user', id, 'kinvey'),
    fail: function(res) {
        observer.trigger(observer.events.notification, { 
            type: 'error', 
            message: res.responseJSON.description
        });

        this.setState({ username: '', password: '' });
    }
}

function isAuthorized (role) {
    return isLoggedIn() && userHasRole(role);
}

function isLoggedIn() {
    let authtoken = sessionStorage.getItem('authtoken');
    let username = sessionStorage.getItem('username');
    //TODO: check if user exists
    if(!authtoken || !username) {
        return false;
    }

    return true
}

function isRegistered() {
    if(!isLoggedIn())
        return false;

    let username = sessionStorage.getItem('username');
    if(username === 'Anonymous')
        return false;

    return userHasRole('Registered')
}
const roles = [
    {
        id: '755a69f3-6176-4d11-b083-3c04036186cd',
        name:'Admin',
        paths: []
    }, {
        id: '5a780717-89f0-4d76-8e05-20bc997b69ae',
        name: 'Registered',
        paths: ['/submit-eport']
    }
]

function isAuthorizedPath(path) {
    var path = window.location.pathname
    
    for(let i = 0; i<roles.length; i++) {
        if(roles[i].paths.indexOf(path) !== -1) {
            return userHasRole(roles[i].name);
        }
    }
}

function userHasRole (roleName) {
    var hasRole = false;
    var roleId = '';
    roles.forEach(role => {
        if(role.name === roleName) {
            roleId = role.id;
        }
        
    });

    if(!roleId) {
        throw new Error('Unknown role!');
    }
    userRoles.forEach(role => {
        if(role.roleId === roleId) {
            hasRole = true;
        }
    })

    return hasRole;
}
export default {
    isAuthorized,
    isLoggedIn,
    isRegistered,
    isAuthorizedPath,
    logIn,
    register,
    getUser
}