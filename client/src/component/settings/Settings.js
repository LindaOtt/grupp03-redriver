import React, { Component } from 'react';

// Import styles. settingsStyles for all imported components with a style attributes and CSS-file for classNames and id.
import {settingsStyles} from "../../styles/SettingsStyles";
import '../../styles/Styles.css'

// Import pages for all different user settings.
import User from './user/SettingsUser';
import SuperUser from './superUser/SettingsSuperUser';
import Admin from './admin/SettingsAdmin';

/**
 *  Settings-component. Start page for settings. Users role is included in props from App.js and the
 *  user is redirected to settings based on role.
 *
 *  @author Jimmy
 */

class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
        };

        this.toggleUser = this.toggleUser.bind(this);
    }

    /**
     *  Check users role and redirect to settings based on role.
     *
     *  @author Jimmy
     */

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
                <div className="Settings">
                    {this.state.user ? (
                        <div>
                            {this.toggleUser}
                        </div>
                    ) : (
                        <p>Loading</p>
                    )}
                </div>

        );
    }
}

export default Settings;