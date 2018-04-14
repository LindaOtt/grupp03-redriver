import React, { Component } from 'react';

import {newPasswordStyles} from "../../styles/AuthStyles";

class NewPassword extends Component {
    render() {
        return (
            <div style={newPasswordStyles.newPassword}>
                <p>Glömt lösenord</p>
            </div>

        );
    }
}

export default NewPassword;