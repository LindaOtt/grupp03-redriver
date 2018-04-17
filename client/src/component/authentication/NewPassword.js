import React, { Component } from 'react';

// Import styles. newPasswordStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {newPasswordStyles} from "../../styles/AuthStyles";
import '../../styles/Styles.css'

/**
 *  newPassword-component.
 *
 *  @author Jimmy
 */

class NewPassword extends Component {
    render() {
        return (
            <div className="NewPassword">
                <p>Glömt lösenord</p>
            </div>

        );
    }
}

export default NewPassword;