import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './Settings.css';

class Settings extends Component {
    render() {
        return (
            <Router>
                <div className="Settings">
                    <p>Chat list</p>
                </div>
            </Router>

        );
    }
}

export default Settings;