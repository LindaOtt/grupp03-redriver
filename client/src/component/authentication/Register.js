import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ImagesUploader from 'react-images-uploader';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import './Authentication.css';
import {appStyles, registerStyles} from "../../styles/MUIStyles";

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            address: '',
            zipCode: '',
            city: '',
            personalIdentityNumber: '',
            telephoneNumber: '',
            nameRelative: '',
            image: [],
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div className="Register">
                <Typography
                    variant="headline"
                    color="default"
                    align="left"
                    style={registerStyles.title}
                >
                    Registrera dig
                </Typography>
                <form style={registerStyles.container} noValidate autoComplete="off">
                    <TextField
                        id="name"
                        label="Användarnamn"
                        style={registerStyles.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="email"
                        label="Email"
                        style={registerStyles.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        type="email"
                    />
                    <TextField
                        id="password"
                        label="Lösenord"
                        style={registerStyles.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <TextField
                        id="passwordRepeat"
                        label="Bekräfta lösenord"
                        style={registerStyles.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('passwordRepeat')}
                        margin="normal"
                    />
                    <TextField
                        id="firstName"
                        label="Förnamn"
                        style={registerStyles.textField}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                    />
                    <TextField
                        id="lastName"
                        label="Efternamn"
                        style={registerStyles.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                    />
                    <TextField
                        id="address"
                        label="Adress"
                        style={registerStyles.textField}
                        value={this.state.address}
                        onChange={this.handleChange('address')}
                        margin="normal"
                    />
                    <TextField
                        id="zipCode"
                        label="Postnummer"
                        style={registerStyles.textField}
                        value={this.state.zipCode}
                        onChange={this.handleChange('zipCode')}
                        margin="normal"
                    />
                    <TextField
                        id="city"
                        label="Postort"
                        style={registerStyles.textField}
                        value={this.state.city}
                        onChange={this.handleChange('city')}
                        margin="normal"
                    />
                    <TextField
                        id="personaIdentityNumber"
                        label="Personnummer"
                        style={registerStyles.textField}
                        value={this.state.personalIdentityNumber}
                        onChange={this.handleChange('personalIdentityNumber')}
                        margin="normal"
                    />
                    <TextField
                        id="telephoneNumber"
                        label="Telefonnummer"
                        style={registerStyles.textField}
                        value={this.state.telephoneNumber}
                        onChange={this.handleChange('telephoneNumber')}
                        margin="normal"
                    />
                    <TextField
                        id="nameRelative"
                        label="Anhörigs namn"
                        style={registerStyles.textField}
                        value={this.state.nameRelative}
                        onChange={this.handleChange('nameRelative')}
                        margin="normal"
                    />
                    <ImagesUploader
                        url="http://example.com"
                        optimisticPreviews
                        multiple={false}
                        onLoadEnd={(err) => {
                            if (err) {
                                console.error(err);
                            }
                        }}
                        label="Välj profilbild"
                        styles={registerStyles.imageUpload}
                    />
                    <div className="RegisterButton">
                        <Button variant="raised" style={registerStyles.button}>
                            Registrera
                        </Button>
                    </div>
                </form>
            </div>

        );
    }
}

export default Register;
