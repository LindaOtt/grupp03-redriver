import React, { Component } from 'react';

// Import NPM-modules
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from "../../../styles/SettingsStyles";
import '../../../styles/Styles.css'
import {registerStyles} from "../../../styles/AuthStyles";

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
            firstName: this.props.state.userInfo.firstName,
            surname: this.props.state.userInfo.surname,
            email: this.props.state.userInfo.email,
            streetAddress: this.props.state.userInfo.streetAddress,
            zipCode: this.props.state.userInfo.postcode,
            city: this.props.state.userInfo.city,
            socialSecurity: this.props.state.userInfo.socialSecurity,
            telephoneNumber: this.props.state.userInfo.telephoneNumber,
            relativeUsername: this.props.state.userInfo.relativeUsername,
            editDetails: false,
        };

    }

    renderForm() {

        return (
            <form style={settingsUserStyles.container} noValidate autoComplete="off">
                <TextField
                    id="userName"
                    label="Användarnamn"
                    style={settingsUserStyles.textField}
                    value={this.state.userName}
                    onChange={this.handleChange('userName')}
                    margin="normal"
                />
                <TextField
                    id="email"
                    label="Email"
                    style={settingsUserStyles.textField}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    type="email"
                />
                <TextField
                    id="firstName"
                    label="Förnamn"
                    style={settingsUserStyles.textField}
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="surname"
                    label="Efternamn"
                    style={settingsUserStyles.textField}
                    value={this.state.surname}
                    onChange={this.handleChange('surname')}
                    margin="normal"
                />
                <TextField
                    id="streetAddress"
                    label="Adress"
                    style={settingsUserStyles.textField}
                    value={this.state.streetAddress}
                    onChange={this.handleChange('streetAddress')}
                    margin="normal"
                />
                <TextField
                    id="zipCode"
                    label="Postnummer"
                    style={settingsUserStyles.textField}
                    value={this.state.zipCode}
                    onChange={this.handleChange('zipCode')}
                    margin="normal"
                    type="number"
                />
                <TextField
                    id="city"
                    label="Postort"
                    style={settingsUserStyles.textField}
                    value={this.state.city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                />
                <TextField
                    id="socialSecurity"
                    label="Personnummer"
                    style={settingsUserStyles.textField}
                    value={this.state.socialSecurity}
                    onChange={this.handleChange('socialSecurity')}
                    margin="normal"
                />
                <TextField
                    id="telephoneNumber"
                    label="Telefonnummer"
                    style={settingsUserStyles.textField}
                    value={this.state.telephoneNumber}
                    onChange={this.handleChange('telephoneNumber')}
                    margin="normal"
                    type="tel"
                />
                <TextField
                    id="relativeUsername"
                    label="Anhörigs namn"
                    style={settingsUserStyles.textField}
                    value={this.state.relativeUsername}
                    onChange={this.handleChange('relativeUsername')}
                    margin="normal"
                />
                <div className="RegisterButton">
                    <Button variant="raised" style={settingsUserStyles.button} onClick={this.handleSubmit}>
                        Registrera
                    </Button>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div className="UserDetails">

            </div>
        );
    }
}

export default SettingsUser;