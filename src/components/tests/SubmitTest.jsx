import React, { Component } from 'react';
import $ from 'jquery';
import "eonasdan-bootstrap-datetimepicker";
import observer from '../../infrastructure/observer';
import requester from '../../infrastructure/requester';
import authentication from '../../infrastructure/authentication';
import withAuthorization from './../../hocs/withAuthorization';

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

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount = () => {
        $('#datetimepicker1').datetimepicker({
            daysOfWeekDisabled: [0, 7]
        });

        this.setState({dateCreated: $('#dateCreated')[0].value})
    }

    handleChange = event => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value

        this.setState({[fieldName]: fieldValue});
    }

    handleSubmit = event => {
        event.preventDefault();

        requester.post('appdata', 'avalanche-tests', '', this.state)
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: 'Post created.'})
                this.props.history.push('/');
            })
            .catch(res=> {
                    observer.trigger(observer.events.notification, {
                        type: 'error',
                        message: res.responseJSON.description
                    });
                }
            )
            .then(()=> this.setState(INITIAL_STATE));
    }

    render = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset disabled={!this.state.isAuthorized}>
                    <h1>Submit avalanche test</h1>
                    <div className="form-group">
                        <label htmlFor="latitude">latitude</label>
                        <input onChange={this.handleChange} name='lat' type="number" className="form-control" id="latitude" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="longitude">latitude</label>
                        <input onChange={this.handleChange} name='lon' type="number" className="form-control" id="longitude" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="place">Place</label>
                        <input onChange={this.handleChange} 
                            name="place" type="text" 
                            className="form-control" 
                            id="place" 
                            aria-describedby="place" />
                        <small id="place" className="form-text text-muted">Mountain, resort, nearest landmark (peak, lake, etc)</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dangerLevel">Danger level</label>
                        <select onChange={this.handleChange}
                            name="dangerLevel" 
                            className="form-control" 
                            id="dangerLevel" 
                            aria-describedby="place">
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
                            aria-describedby="place" />
                    </div>

                    <div className="form-group">
                        <div className='input-group date' id='datetimepicker1'>
                            <input id="dateCreated" onChange={this.handleChange} name="dateCreated" type='text' className="form-control" />
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        )
    }
}

export default withAuthorization(SubmitTest, role);