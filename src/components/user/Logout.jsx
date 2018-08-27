import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../infrastructure/requester';
import authentication from '../../infrastructure/authentication';

export default class Logout extends Component {
    logout = () => {
        requester.post('user', '_logout', 'kinvey')
            .then(res => {
                sessionStorage.removeItem('authtoken');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('roles');
                authentication.logIn.send({})
                    .then(authentication.logIn.success)
                    .catch(authentication.logIn.fail);
            });
    }

    render = () => {
        this.logout();
        return <Redirect to='/' />
    }
}