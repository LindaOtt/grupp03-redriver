import React, { Component } from 'react'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import axios from 'axios'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'

/**
 *  UserDetails-component.
 *
 *  @author Jimmy
 */

class SettingsUser extends Component {
  constructor (props) {
    super(props)

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
      formDisabled: true
    }
  }

    /**
     *  Handle form-input. Inputs are added to this.state.
     *
     *  @author Jimmy
     */

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      })
    };

    /**
     *  Open forms for edit or disable them
     *
     *  @author Jimmy
     */

    handleEditButton (action) {
      this.setState({
        formDisabled: action
      })
      console.log(this.state)
    }

    /**
     *  Handle submit-button for change details.
     *
     *  @author Jimmy
     */

    handleSubmit () {
      if (this.state.userName === '' || this.state.email === '' || this.state.surname === '' || this.state.firstName === '') {
        return this.props.openSnackBar('Formuläret ej korrekt ifyllt!')
      }

      if (this.state.password !== this.state.passwordConfirm) {
        return this.props.openSnackBar('Lösenorden matchar inte!')
      }

      // ToDo.. Add this when function to change users details is implemented on server.
      /* this.sendRequest()
            .then((response) => {

                console.log(response);
                this.setState({navigate: true,});
                return this.props.openSnackBar('Registreringen lyckades. Vänligen logga in!');

            }).catch((err) => {
            console.log(err);
            return this.props.openSnackBar('Något gick fel. Försök igen!');
        }); */

      this.handleEditButton(true)
    }

    /**
     *  Render form. Form is disabled when user isn't editing details.
     *
     *  @author Jimmy
     */

    renderForm () {
      return (
        <form style={settingsUserStyles.container} noValidate autoComplete='off'>
          <TextField
            id='userName'
            label='Användarnamn'
            style={settingsUserStyles.textField}
            value={this.state.userName}
            onChange={this.handleChange('userName')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='email'
            label='Email'
            style={settingsUserStyles.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin='normal'
            type='email'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='firstName'
            label='Förnamn'
            style={settingsUserStyles.textField}
            value={this.state.firstName}
            onChange={this.handleChange('firstName')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='surname'
            label='Efternamn'
            style={settingsUserStyles.textField}
            value={this.state.surname}
            onChange={this.handleChange('surname')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='streetAddress'
            label='Adress'
            style={settingsUserStyles.textField}
            value={this.state.streetAddress}
            onChange={this.handleChange('streetAddress')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='zipCode'
            label='Postnummer'
            style={settingsUserStyles.textField}
            value={this.state.zipCode}
            onChange={this.handleChange('zipCode')}
            margin='normal'
            type='number'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='city'
            label='Postort'
            style={settingsUserStyles.textField}
            value={this.state.city}
            onChange={this.handleChange('city')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='socialSecurity'
            label='Personnummer'
            style={settingsUserStyles.textField}
            value={this.state.socialSecurity}
            onChange={this.handleChange('socialSecurity')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='telephoneNumber'
            label='Telefonnummer'
            style={settingsUserStyles.textField}
            value={this.state.telephoneNumber}
            onChange={this.handleChange('telephoneNumber')}
            margin='normal'
            type='tel'
            disabled={this.state.formDisabled}
          />
          <TextField
            id='relativeUsername'
            label='Anhörigs namn'
            style={settingsUserStyles.textField}
            value={this.state.relativeUsername}
            onChange={this.handleChange('relativeUsername')}
            margin='normal'
            disabled={this.state.formDisabled}
          />
        </form>
      )
    }

    render () {
      return (
        <div className='UserDetails'>
          {this.state.formDisabled ? (
            <div>
              {this.renderForm()}
              <Button variant='raised' style={settingsUserStyles.button} onClick={() => this.handleEditButton(false)}>
                            Ändra uppgifter
              </Button>
            </div>
          ) : (
            <div>
              {this.renderForm()}
              <div>
                <Button variant='raised' style={settingsUserStyles.button} onClick={() => this.handleEditButton(true)}>
                                Ångra
                </Button>
                <Button variant='raised' style={settingsUserStyles.button} onClick={() => this.handleSubmit()}>
                                Ok
                </Button>
              </div>
            </div>
          )}
        </div>
      )
    }
}

export default SettingsUser
