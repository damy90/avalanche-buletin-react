import React, {Component} from 'react';

function getRequestData(state, defaultState) {
    let data = {};
    
    for (let key of Object.keys(defaultState)) {
        data[key] = state[key];
    }

    return data;
}

export default function withFormManager(Form, model, submitter, redirect) {
    return class FormManager extends Component {
        constructor(props) {
            super(props);
            this.dataModel = {
                ...model.defaultState,
                ...this.props.extraState
            };

            this.state = {
                error: '',
                ...this.dataModel
            }

            this.success = this.props.success || submitter.success.bind(this);
            this.fail = this.props.fail || submitter.fail.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.setState = this.setState.bind(this);
        }

        componentWillReceiveProps = (nextProps) => {
            let newState = {};
            for (let key of Object.keys(nextProps.extraState || {})) {
                newState[key] = nextProps.extraState[key];
            }

            this.setState(newState);
        }

        handleChange = ev => {
            let fieldName = ev.target.name;
            let fieldValue = ev.target.value;

            this.setState({ [fieldName] : fieldValue });
        }

        handleSubmit = ev => {
            ev.preventDefault();
            
            let data = getRequestData(this.state, this.dataModel);

            if (model.validate) {
                let error = model.validate(data);
                if (error) {
                    this.setState({ error });
                    return;
                }
            }

            submitter.send(data)
                .then(this.success)
                .then(()=>{
                    if(redirect)
                        this.props.history.push(redirect)})
                .catch(this.fail);
        }

        render = () => {
            //console.log('FormManager', this.state);
            return (<Form
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                setState={this.setState}
                {...this.state} {...this.props}/>
            )
        }
    }
}