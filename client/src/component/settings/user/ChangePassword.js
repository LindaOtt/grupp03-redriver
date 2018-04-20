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
 *  Change Password-component.
 *
 *  @author Jimmy
 */

class ChangePassword extends Component {

    constructor(props){
        super(props);

        this.state = {
            password: '',
            passwordConfirm: '',
        };

    }

    /**
     *  Handle form-input. Inputs are added to this.state.
     *
     *  @author Jimmy
     */

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    /**
     *  Handle submit-button for change password
     *
     *  @author Jimmy
     */

    handleSubmit() {

        if (this.state.password === '' || this.state.passwordConfirm === '') {
            return this.props.openSnackBar('Formuläret ej korrekt ifyllt!');
        }

        if (this.state.password !== this.state.passwordConfirm) {
            return this.props.openSnackBar('Lösenorden matchar inte!');
        }

        // ToDo.. Add this when function to change users password is implemented on server.
        /*this.sendRequest()
            .then((response) => {

                console.log(response);
                this.setState({navigate: true,});
                return this.props.openSnackBar('Registreringen lyckades. Vänligen logga in!');

            }).catch((err) => {
            console.log(err);
            return this.props.openSnackBar('Något gick fel. Försök igen!');
        });*/

    }

    render() {
        return (
            <div className="UserDetails">
                <form style={settingsUserStyles.container} noValidate autoComplete="off">
                    <TextField
                        id="password"
                        label="Nytt lösenord"
                        style={settingsUserStyles.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <TextField
                        id="passwordRepeat"
                        label="Bekräfta lösenord"
                        style={settingsUserStyles.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('passwordConfirm')}
                        margin="normal"
                    />
                        <Button variant="raised" style={settingsUserStyles.button} onClick={this.handleSubmit}>
                            Ok
                        </Button>
                </form>
            </div>
        );
    }
}

export default ChangePassword;