import React, {Component} from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value

        this.setState({[fieldName]: fieldValue});
    }

    componentDidMount = () => {
        this.handleSubmit()
    }

    handleSubmit = event => {
        if(event)
            event.preventDefault();

        let state = this.state
        if(!this.state.username && ! this.state.password) {
            state = {
                username: 'Anonymous',
                password: 'anonymous'
            };
            this.setState(state)
        }
        requester.post('user', 'login', 'basic', state)
            .then(res => {
                observer.trigger(observer.events.loginUser, res.username);
                observer.trigger(observer.events.notification, {type: 'success', message: 'Logged in.'})
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                sessionStorage.setItem('username', res.username);
                //this.props.history.push('/catalog');
            })
            .catch(res=> {
                    observer.trigger(observer.events.notification, {
                        type: 'error',
                        message: res.responseJSON.description
                    });
                }
            )
            .then(()=> this.setState({username: '', password: ''}));
    }

    render = () => {
        return (
            <form id="loginForm" onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input onChange={this.handleChange} name="username" type="text"/>
                <label>Password:</label>
                <input onChange={this.handleChange} name="password" type="password"/>
                <input id="btnLogin" type="submit" value="Sign In"/>
            </form>
        )
    }
}