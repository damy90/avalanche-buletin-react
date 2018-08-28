import React, {Component} from 'react';
import authentication from '../../infrastructure/authentication';
import { NavLink } from 'react-router-dom';
import Tests from '../tests/TestsManagement';

export default class Account extends Component {
    componentWillMount = () => {
        let id = this.props.match.params.id;
        let isAdmin = authentication.isAuthorized('Admin');
        this.setState({isAdmin});

        // TODO: validate id
        authentication.getUser.send(id)
            .then(res => {
                this.setState(res);

                if(res.username === sessionStorage.getItem('username')) {
                    this.setState({isOwner: true});
                }
            })
    }

    DateCreated = () => {
        let result = null;
        if(this.state._kmd) {
            var dateObj = new Date(this.state._kmd.ect);
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            result = year + "/" + month + "/" + day;
        }
        
        return result;
    }

    UserOptions = () => {
        if(this.state.isOwner) {
            return (
                <NavLink type="button" 
                    className="btn btn-primary" 
                    to={"change-password" + this.state._id + '/edit'}>
                        Change password
                </NavLink>
            )
        }
        
        return null;
    }

    AdminOptions = () => {
        if(this.state.isAdmin) {
            return (
                <div>
                    <br/>
                    <button type="button" className="btn btn-danger" onClick={this.handleDelete}>
                        Delete user
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-warning" onClick={this.handleSuspend}>
                        Suspend user
                    </button>
                </div>
            )
        }

        return null;
    }

    MyTests = () => {
        if(this.state._id){
            console.log(this.state._id)
            return <Tests userId={this.state._id }/>
        }

        return null
    }

    render = () => {
        return (
            <div>
                <h1>User profile</h1>
                <h3>{this.state.username}</h3>
                <p>Created on: <this.DateCreated/></p>
                {/* TODO: get role names */}
                <this.UserOptions/>
                <this.AdminOptions/>
                <this.MyTests/>
            </div>
        )
    }
}