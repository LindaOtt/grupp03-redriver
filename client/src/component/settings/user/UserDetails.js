import React, { Component } from 'react'

// Import NPM-modules
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'
import {validateChangeDetails} from '../../../utils/FormValidation'
import {userChangeDetails} from '../../../utils/ApiRequests'

/**
 *  UserDetails-component.
 *
 *  @author Jimmy
 */

class SettingsUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
    }

    /**
     *  Handle submit-button for change details.
     *
     *  @author Jimmy
     */

    handleSubmit () {

      let validation = validateChangeDetails(this.state)
      if (validation !== false) {
        return this.props.openSnackBar(validation)
      } else {
        userChangeDetails(this.state, this.props.state.token)
          .then((response) => {
            console.log(response)
            return this.props.openSnackBar('Användaruppgifterna ändrades!')
          }).catch((err) => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
      }
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
            type='number'
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
            id='telephoneNumber'
            label='Telefonnummer'
            style={settingsUserStyles.textField}
            value={this.state.telephoneNumber}
            onChange={this.handleChange('telephoneNumber')}
            margin='normal'
            type='tel'
            disabled={this.state.formDisabled}
          />
        </form>
      )
    }

    componentWillMount() {

      let userDetails = this.props.state.userInfo

      for (let key in userDetails) {
        // skip loop if the property is from prototype
        if (!userDetails.hasOwnProperty(key)) continue;

        if (userDetails[key] === null) {
          userDetails[key] = ''
        }
      }
      this.setState({
        firstName: userDetails.firstName,
        surname: userDetails.surname,
        email: userDetails.email,
        streetAddress: userDetails.streetAddress,
        zipCode: userDetails.postcode,
        city: userDetails.city,
        socialSecurity: userDetails.socialSecurity,
        telephoneNumber: userDetails.telephoneNumber
      })
    }

    render () {
      return (
        <div className='UserDetails'>
          {this.state.formDisabled ? (
            <div>
              {this.renderForm()}
              <Button variant='raised' color={'primary'} style={settingsUserStyles.button} onClick={() => this.handleEditButton(false)}>
                            Ändra uppgifter
              </Button>
            </div>
          ) : (
            <div>
              {this.renderForm()}
              <div>
                <Button variant='raised' color={'primary'} style={settingsUserStyles.button} onClick={() => this.handleEditButton(true)}>
                                Ångra
                </Button>
                <Button variant='raised' color={'primary'} style={settingsUserStyles.button} onClick={() => this.handleSubmit()}>
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
