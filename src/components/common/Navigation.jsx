import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import authentication from '../../infrastructure/authentication';
import SubmitTest from './../tests/SubmitTest';
import observer from '../../infrastructure/observer';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { username: sessionStorage.getItem('username') || null };

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = username =>{
        this.setState({ username });
    }

    UserMenu = () => {
        let RegisteredMenu = () => {
            if(authentication.isRegistered())
            {
                return (<li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Log out</NavLink>
                </li>)
            } else {
                return [<li key="register" className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>,
                <li key="log-in" className="nav-item">
                    <NavLink className="nav-link" to="/log-in">Log in</NavLink>
                </li>]
            }
        }
        return (
            <ul className="nav navbar-nav navbar-right">
                <RegisteredMenu/>
            </ul>)
    }

    AdminPanel = () => {
        if(!authentication.isAuthorized('Admin')) {
            return null;
        }

        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Administration
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/admin/users">Users</NavLink>
                <NavLink className="dropdown-item" to="/admin/tests">Tests</NavLink>
                </div>
            </li>
        )
    }
    
    render = () => {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        {authentication.isRegistered() ? (<li className="nav-item">
                            <NavLink className="nav-link" to="/submit-report">Submit report</NavLink>
                        </li>) : null}
                        <this.AdminPanel/>
                    </ul>

                    <p className="nav navbar-text navbar-right">
                        Signed in as 
                        <NavLink to="/user/_me" className="navbar-link">
                            &nbsp;{this.state.username}
                        </NavLink>
                    </p>
                    
                    <this.UserMenu/>
                </div>
            </nav>
        )
    }
}