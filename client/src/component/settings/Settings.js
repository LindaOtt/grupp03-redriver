import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './Settings.css';

import User from './user/SettingsUser';
import SuperUser from './superUser/SettingsSuperUser';
import Admin from './admin/SettingsAdmin';

class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
        };

        this.toggleUser = this.toggleUser.bind(this);
    }

    toggleUser() {

        switch(this.state.user) {
            case 'SuperUser':
                return <SuperUser/>;

            case 'Admin':
                return <Admin/>;

            default:
                return <User/>;
        }

    }
    render() {
        return (
            <Router>
                <div className="Settings">
                    {this.state.user ? (
                        <div>
                            {this.toggleUser}
                        </div>
                    ) : (
                        <p>Loading</p>
                    )}
                </div>
            </Router>

        );
    }
}

export default Settings;