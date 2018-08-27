import React, {Component} from 'react';
import TestsMap from '../common/Map';
import reuqester from '../../infrastructure/requester';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testsData: []
        };

        this.onData = this.onData.bind(this);
    }

    onData(testsData) {
        if (this.map) {
            this.map.onData(testsData);
        }
    }

    getPosts = () => {
        reuqester.get('appdata', 'avalanche-tests', 'kinvey')
            .then(this.onData)
    }

    componentDidMount = () => this.getPosts();

    render = () => {
        return (
            <TestsMap
                ref={instance => {
                    this.map = instance;
                }}
            />
        )
    }
}