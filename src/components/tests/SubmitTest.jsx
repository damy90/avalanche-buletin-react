import React, { Component } from 'react';
import $ from 'jquery';
import "eonasdan-bootstrap-datetimepicker";
import observer from '../../infrastructure/observer';
import requester from '../../infrastructure/requester';
import authentication from '../../infrastructure/authentication';
import withAuthorization from './../../hocs/withAuthorization';
import TestsMap from './../common/Map';
import testService from '../../services/testService';
import withFormManager from './../../hocs/withFormManager';

const INITIAL_STATE = {
    lat: '',
    lon: '',
    place: '',
    content: '',
    dateCreated: '',
    dangerLevel: ''
}
//required role
let role = 'Registered';
class SubmitTest extends Component {
    constructor(props) {
        super(props)

        this.state = INITIAL_STATE;
        this.state.isNew = !this.props.match.params || !this.props.match.params.id;

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount = () => {
        var properties = {
            date: this.state.isNew ? new Date() : ''
        }
        $('#datetimepicker1').datetimepicker(properties);

        this.setState({dateCreated: $('#dateCreated')[0].value})
    }

    componentWillMount = () => {
        if(!this.state.isNew) {
            let id = this.props.match.params.id
            testService.details.send(id)
                .then(res=>{
                    var state = ((INITIAL_STATE) => (INITIAL_STATE))(res);
                    this.setState(state);

                    if (this.map) {
                        this.map.onData([res]);
                    }
                })
                .catch(testService.details.fail);
            this.setState({id});
            this.submitter = testService.edit;
        } else {
            this.submitter = testService.create;
        }
    }

    //TODO: use withFormManager or create a common Form class
    handleChange = event => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value

        this.setState({[fieldName]: fieldValue});
    }

    handleSubmit = event => {
        event.preventDefault();

        this.submitter.send(this.state)
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: 'Test submited.'})
                this.props.history.push('/');
            })
            .catch(testService.details.fail)
            .then(()=> this.setState(INITIAL_STATE));
    }

    handleUpdatePosition = (lat, lon) => {
        this.setState({ lat, lon });
    };

    render = () => {
        return (
            <div>
                <div className="col-md-7">
                    <TestsMap
                        handleUpdatePosition={this.handleUpdatePosition}
                        showLocation={this.state.isNew}
                        ref={instance => {
                            this.map = instance;
                        }}
                    />
                </div>
                <form className="col-md-5" onSubmit={this.handleSubmit}>
                    <h1>
                        {this.isNew ? 'Submit' : 'Edit'} avalanche test
                    </h1>
                    <fieldset disabled={!this.props.isAuthorized}>
                        <div className="form-group">
                            <label htmlFor="latitude">latitude</label>
                            <input onChange={this.handleChange} name='lat' type="number" className="form-control" id="latitude" value={this.state.lat}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">latitude</label>
                            <input onChange={this.handleChange} name='lon' type="number" className="form-control" id="longitude"  value={this.state.lon}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="place">Place</label>
                            <input onChange={this.handleChange} 
                                name="place" type="text" 
                                className="form-control" 
                                id="place" 
                                aria-describedby="place"
                                value={this.state.place} />
                            <small id="place" className="form-text text-muted">Mountain, resort, nearest landmark (peak, lake, etc)</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dangerLevel">Danger level</label>
                            <select onChange={this.handleChange}
                                name="dangerLevel" 
                                className="form-control" 
                                id="dangerLevel" 
                                aria-describedby="place"
                                value={this.state.dangerLevel}>
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Details</label>
                            <input name="content"
                                onChange={this.handleChange}
                                type="text" 
                                className="form-control" 
                                id="content"
                                value={this.state.content}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateCreated">Date created</label>
                            <div className='input-group date' id='datetimepicker1'>
                                <input id="dateCreated" onChange={this.handleChange} name="dateCreated" type='text' className="form-control" value={this.state.dateCreated}/>
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default withAuthorization(SubmitTest, role);