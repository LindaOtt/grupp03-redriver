import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import '../Settings.css';

class SettingsUser extends Component {
    render() {
        return (
            <div className="SettingsUser">
                <p>User settings</p>
            </div>
        );
    }
}

export default SettingsUser;