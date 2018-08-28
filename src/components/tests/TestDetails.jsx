import React, {Component} from 'react';
import testService from '../../services/testService';
import TestsMap from './../common/Map';
import authentication from '../../infrastructure/authentication';
import { NavLink } from 'react-router-dom';

const INITIAL_STATE = {
    lat: '',
    lon: '',
    place: '',
    content: '',
    dateCreated: '',
    dangerLevel: '',
    _id: '',
    username: '',
    isAdmin: false,
    isOwner: false
}

export default class TestDetails  extends Component {
    constructor(props) {
        super(props)

        this.state = INITIAL_STATE;
    }
    componentWillMount = () => {
        let isAdmin = authentication.isAuthorized('Admin');
        this.setState({isAdmin});
        let id = this.props.match.params.id;

        // TODO: validate id
        testService.details.send(id)
            .then(res=>{
                this.setState(res);
                let authorId = res._acl.creator;

                authentication.getUser.send(authorId)
                    .then((user) => {
                        this.setState({username: user.username});

                        if(user.username === sessionStorage.get('username')) {
                            this.setState({isOwner: true});
                        }
                    })
                    .catch(authentication.getUser.fail);

                if (this.map) {
                    this.map.onData([res]);
                }
            })
            .catch(testService.details.fail);
        this.setState({id});
    }

    Administration = () => {
        return (
            <div>
                <NavLink type="button" 
                    className="btn btn-primary" 
                    to={"/report/" + this.state._id + '/edit'}>
                        Edit
                </NavLink>
                &nbsp;
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        )
    }

    render = () => {
        return (
            <div className="container">
                <h1 className="display-4">Test details</h1>
                <div className="col-md-7">
                    <TestsMap
                        handleUpdatePosition={this.handleUpdatePosition}
                        showLocation={false}
                        ref={instance => {
                            this.map = instance;
                        }}
                    />
                </div>
                <div  className="col-md-5" id="test-details">
                    <p className="lead">
                        <span className="fieldName">Position:</span> {this.state.lat + ', ' + this.state.lon}
                    </p>
                    <p className="lead">
                        <span className="fieldName">Place:</span> {this.state.place}
                    </p>
                    <p className="lead">
                        <span className="fieldName">Danger level:</span> {this.state.dangerLevel}
                    </p>
                    <p className="lead">
                        <span className="fieldName">Details:</span> 
                    </p>
                    <p className="lead">{this.state.content}</p>
                    <p className="lead">
                        <span className="fieldName">Date created:</span> {this.state.dateCreated}
                    </p>
                    <p className="lead">
                        <span className="fieldName">Submitted by:</span> {this.state.username}
                    </p>
                    {this.state.isAdmin || this.state.isOwner ? <this.Administration/> : null}
                </div>
            </div>
        )
    }
}