import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import '../Settings.css';

class SettingsAdmin extends Component {
    render() {
        return (
                <div className="SettingsAdmin">
                    <p>Admin settings</p>
                </div>
        );
    }
}

export default SettingsAdmin;