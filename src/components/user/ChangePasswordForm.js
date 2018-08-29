import React, {Component} from 'react';

import withFormManager from './../../hocs/withFormManager';
import authentication from '../../infrastructure/authentication';
import changePasswordModel from '../../models/changePasswordModel';
import $ from 'jquery';

class ChangePasswordForm extends Component {
    render = () => {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h1>Change password</h1>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Old password</label>
                        <input onChange={this.props.handleChange} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New password</label>
                        <input onChange={this.props.handleChange} name="newPassword" type="password" className="form-control" id="newPassword" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRepeat">Repeat password</label>
                        <input onChange={this.props.handleChange} name="passwordRepeat" type="password" className="form-control" id="passwordRepeat" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default withFormManager(ChangePasswordForm, changePasswordModel, authentication.update, '/');