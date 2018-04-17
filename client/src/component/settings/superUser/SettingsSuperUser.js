import React, { Component } from 'react';

// Import styles. settingsSuperUserStyles for all imported components with a style attributes and CSS-file for classNames and id.
import {settingsSuperUserStyles} from "../../../styles/SettingsStyles";
import '../../../styles/Styles.css'

/**
 *  SettingsSuperUser-component.
 *
 *  @author Jimmy
 */

class SettingsSuperUser extends Component {
    render() {
        return (
            <div className="SettingsSuperUser">
                <p>Superuser settings</p>
            </div>
        );
    }
}

export default SettingsSuperUser;