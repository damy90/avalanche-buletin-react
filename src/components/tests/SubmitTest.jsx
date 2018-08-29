import React, { Component } from 'react';
import $ from 'jquery';
import "eonasdan-bootstrap-datetimepicker";
import observer from '../../infrastructure/observer';
import withAuthorization from '../../hocs/withAuthorization';
import TestsMap from '../common/Map';
import testService from '../../services/testService';
import withFormManager from '../../hocs/withFormManager';
import testModel from '../../models/testModel';

//required role
let role = 'Registered';
class SubmitTest extends Component {
    constructor(props) {
        super(props)

        this.isNew = !this.props.match.params || !this.props.match.params.id;
    }
    
    componentDidMount = () => {
        var properties = {
            date: this.isNew ? new Date() : ''
        }
        $('#datetimepicker1').datetimepicker(properties);

        this.props.setState({dateCreated: $('#dateCreated')[0].value})
    }

    componentWillMount = () => {
        if(!this.isNew) {
            let id = this.props.match.params.id
            testService.details.send(id)
                .then(res=>{
                    this.props.setState(res);

                    if (this.map) {
                        this.map.onData([res]);
                    }
                })
                .catch(testService.details.fail);
        }
    }

    handleUpdatePosition = (lat, lon) => {
        this.props.setState({ lat, lon });
    };

    render = () => {
        return (
            <div>
                <div className="col-md-7">
                    <TestsMap
                        handleUpdatePosition={this.handleUpdatePosition}
                        showLocation={this.isNew}
                        ref={instance => {
                            this.map = instance;
                        }}
                    />
                </div>
                <form className="col-md-5" onSubmit={this.props.handleSubmit}>
                    <h1>
                        {this.isNew ? 'Submit' : 'Edit'} avalanche test
                    </h1>
                    <span className="text-danger" if="form-error">
                        {this.props.error}
                    </span>
                    <fieldset disabled={!this.props.isAuthorized}>
                        <div className="form-group">
                            <label htmlFor="latitude">latitude</label>
                            <input onChange={this.props.handleChange} name='lat' type="number" className="form-control" id="latitude" value={this.props.lat}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">latitude</label>
                            <input onChange={this.props.handleChange} name='lon' type="number" className="form-control" id="longitude"  value={this.props.lon}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="place">Place</label>
                            <input onChange={this.props.handleChange} 
                                name="place" type="text" 
                                className="form-control" 
                                id="place" 
                                aria-describedby="place"
                                value={this.props.place} />
                            <small id="place" className="form-text text-muted">Mountain, resort, nearest landmark (peak, lake, etc)</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dangerLevel">Danger level</label>
                            <select onChange={this.props.handleChange}
                                name="dangerLevel" 
                                className="form-control" 
                                id="dangerLevel" 
                                aria-describedby="place"
                                value={this.props.dangerLevel}>
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
                                onChange={this.props.handleChange}
                                type="text" 
                                className="form-control" 
                                id="content"
                                value={this.props.content}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateCreated">Date created</label>
                            <div className='input-group date' id='datetimepicker1'>
                                <input id="dateCreated" onChange={this.props.handleChange} name="dateCreated" type='text' className="form-control" value={this.props.dateCreated}/>
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