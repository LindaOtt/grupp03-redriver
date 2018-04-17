import React, { Component } from 'react';

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from "../../../styles/SettingsStyles";
import '../../../styles/Styles.css'

/**
 *  SettingsUser-component.
 *
 *  @author Jimmy
 */

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