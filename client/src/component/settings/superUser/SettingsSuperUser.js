import React, { Component } from 'react';

import {settingsSuperUserStyles} from "../../../styles/SettingsStyles";

class SettingsSuperUser extends Component {
    render() {
        return (
            <div style={settingsSuperUserStyles.superUser}>
                <p>Superuser settings</p>
            </div>
        );
    }
}

export default SettingsSuperUser;