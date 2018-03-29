import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import '../Settings.css';

class SettingsSuperUser extends Component {
    render() {
        return (
            <div className="SettingsSuperUser">
                <p>Superuser settings</p>
            </div>
        );
    }
}

export default SettingsAdmin;