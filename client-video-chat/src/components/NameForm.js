import React, { Component } from 'react';

import '../App.css';

class NameForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit() {
        this.props.handleNameSubmit(this.state.name);
    }


    render() {
        return (
            <div className="NameForm">
                <p>Enter name:</p>
                <input value={this.state.name} type="text" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default NameForm;