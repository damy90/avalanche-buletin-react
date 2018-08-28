import React, {Component} from 'react';
import withAuthorization from './../../hocs/withAuthorization';
import authentication from '../../infrastructure/authentication';
import { NavLink } from 'react-router-dom';
import testService from '../../services/testService';

let role = 'Admin';
class Tests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersMap: {}
        };
    }

    componentWillMount = () => {
        testService.all.send()
            .then(tests => {
                this.setState({tests})
                this.userIds = {};
            })
            .catch(testService.all.fail);

        // Map user ids to user names (bulk)
        authentication.getAllUsers.send()
            .then(authentication.getAllUsers.success)
            .then(users => {
                let usersMap = {};
                users.forEach(user => {
                    usersMap[user._id] = user.username
                });
                this.setState({usersMap});
            })
            .catch(authentication.getAllUsers.fail)
    }

    handleDelete = (id) => {
        testService.remove.send(id)
            .then(testService.remove.success)
            .then(()=>{
                let tests = this.state.tests.filter(test => test._id !== id);
                this.setState({tests});
            })
            .catch(testService.remove.fail)
    }

    Data = () => {
        if(!this.state.tests) {
            return null;
        }

        let rows = this.state.tests.map(test => {
            return (
                <tr key={test._id}>
                    <td>{test.place}</td>
                    <td>{test.dateCreated}</td>
                    <td>{test.dangerLevel}</td>
                    <td>{test.content}</td>
                    <td>
                        <NavLink to={'/user/' + test._acl.creator}>
                            {this.state.usersMap[test._acl.creator]}
                        </NavLink>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(test._id)}>
                            Delete test
                        </button>
                        &nbsp;
                        <NavLink to={'/report/' + test._id + '/edit'} type="button" className="btn btn-primary">
                            Edit test
                        </NavLink>
                        {/* TODO: add show on map */}
                    </td>
                </tr>
            )
        });

        return rows;
    }

    render = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Place</th>
                        <th scope="col">Date</th>
                        <th scope="col">Danger level</th>
                        <th scope="col">Details</th>
                        <th scope="col">User</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <this.Data/>
                </tbody>
            </table>
        )
    }
}

export default withAuthorization(Tests, role);