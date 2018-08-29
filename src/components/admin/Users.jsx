import React, {Component} from 'react';
import withAuthorization from './../../hocs/withAuthorization';
import authentication from '../../infrastructure/authentication';
import { NavLink } from 'react-router-dom';

let role = 'Admin';
class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {
        authentication.getAllUsers.send()
            .then(authentication.getAllUsers.success)
            .then(users => {
                this.setState({users})
            })
            .catch(authentication.getAllUsers.fail)
    }

    handleDelete = (id) => {
        authentication.remove.send(id)
            .then(authentication.remove.success)
            .then(()=>{
                let users = this.state.users.filter(user => user._id !== id);
                this.setState({users});
            })
            .catch(authentication.remove.fail)
    }
    Data = () => {
        if(!this.state.users) {
            return null;
        }

        let rows = this.state.users.map(user => {
            return (
                <tr key={user.username}>
                    <td><NavLink to={'/user/' + user._id}>{user.username}</NavLink></td>
                    <td>{user._kmd.ect}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(user._id)}>
                            Delete user
                        </button>
                        {/* &nbsp;
                        <button type="button" className="btn btn-warning" onClick={() => this.handleSuspend(user._id)}>
                            Suspend user
                        </button> */}
                    </td>
                </tr>
            )
        });

        return rows;
    }

    render = () => {
        return (
            <div>
                <h1>Users administration</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Registered on</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <this.Data/>
                    </tbody>
                </table>
            </div>
            
        )
    }
}

export default withAuthorization(Users, role);