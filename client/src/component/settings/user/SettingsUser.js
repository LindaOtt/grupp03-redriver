import React, { Component } from 'react';

import {settingsUserStyles} from "../../../styles/SettingsStyles";

class SettingsUser extends Component {
    render() {
        return (
            <div style={settingsUserStyles.user}>
                <p>User settings</p>
            </div>
        );
    }
}

export default SettingsUser;