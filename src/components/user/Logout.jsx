import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../infrastructure/requester';
import authentication from '../../infrastructure/authentication';

export default class Logout extends Component {
    logout = () => {
        authentication.logout.send()
            .then(authentication.logout.finally)
            .catch((res) => {
                authentication.logout.fail(res);
                return authentication.logout.finally(res);
            })
            
    }

    render = () => {
        this.logout();
        return <Redirect to='/' />
    }
}