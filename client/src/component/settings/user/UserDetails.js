import React, { Component } from 'react';

// Import NPM-modules
import Typography from 'material-ui/Typography';
import axios from 'axios';

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from "../../../styles/SettingsStyles";
import '../../../styles/Styles.css'

/**
 *  UserInfo-component.
 *
 *  @author Jimmy
 */

class SettingsUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            userName: this.props.state.userInfo.username,
            firstName: '',
            surname: '',
            email: this.props.state.userInfo.username,
            password: '',
            passwordConfirm: '',
            streetAddress: '',
            zipCode: '',
            city: '',
            socialSecurity: '',
            telephoneNumber: '',
            relativeUsername: '',
            image: [],
            navigate: false
        };

    }


    render() {
        return (
            <div className="UserDetails">
                <Typography
                    variant="headline"
                    color="default"
                    align="left"
                    style={settingsUserStyles.titleUserDetails}
                >
                    Användaruppgifter
                </Typography>

            </div>
        );
    }
}

export default SettingsUser;