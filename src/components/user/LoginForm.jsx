import React, {Component} from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import authentication from '../../infrastructure/authentication';
import userModel from '../../models/userModel';
import withFormManager from './../../hocs/withFormManager';

class LoginForm extends Component {
    render = () => {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h1>Log in</h1>
                <form onSubmit={this.props.handleSubmit}>
                    <span className="text-danger" if="form-error">
                        {this.props.error}
                    </span>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input  onChange={this.props.handleChange} name="username" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.props.handleChange} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default withFormManager(LoginForm, userModel, authentication.logIn, '/');