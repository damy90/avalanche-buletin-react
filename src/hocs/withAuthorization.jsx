import React, { Component } from 'react';
import authentication from '../infrastructure/authentication';

export default function withAuthorization(WrappedComponent, role) {
    return class AuthorizationManager extends Component {
        componentWillMount = () => {
            let isAuthorized = authentication.isAuthorized(role);
            this.setState({isAuthorized});
        }
        render = () => {
            return (<div>
                {this.state.isAuthorized ? null: <h1>You are not authorized!</h1>}
                <WrappedComponent />
            </div>)
        }
    }

}