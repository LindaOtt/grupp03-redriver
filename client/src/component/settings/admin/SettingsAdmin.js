import React, { Component } from 'react';

import {settingsAdminStyles} from "../../../styles/SettingsStyles";

class SettingsAdmin extends Component {
    render() {
        return (
                <div style={settingsAdminStyles.admin}>
                    <p>Admin settings</p>
                </div>
        );
    }
}

export default SettingsAdmin;