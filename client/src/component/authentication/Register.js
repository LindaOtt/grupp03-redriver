import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import NPM-modules
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import axios from 'axios'
import HttpsRedirect from 'react-https-redirect'

// Import styles. newPasswordStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {registerStyles} from '../../styles/AuthStyles'
import '../../styles/Styles.css'

// Import server url
import {AzureServerUrl} from '../../utils/Config'
import {validateRegister} from '../../utils/FormValidation'

/**
*  Register-component.
*
*  @author Jimmy
*/

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userName: '',
      firstName: '',
      surname: '',
      email: '',
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
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   *  Handle form-input. Input are added to this.state.
   *
   *  @author Jimmy
   */

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  /**
   *  Handle submit-button. Register-request is sent to server with form-input included.
   *
   *  @author Jimmy
   */

  handleSubmit () {
    let validation = validateRegister(this.state)
    if (validation !== false) {
      return this.props.openSnackBar(validation)
    } else {
      this.sendRequest()
        .then((response) => {
          console.log(response)
          this.setState({navigate: true})
          return this.props.openSnackBar('Registreringen lyckades. Vänligen logga in!')
        }).catch((err) => {
          if (err.response.status === 400) {
            return this.props.openSnackBar('Användarnamnet ' + this.state.userName + ' är redan registrerat!')
          }
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
    }
  }

  /**
   *  Send register request to server.
   *
   *  @author Jimmy
   */

  sendRequest () {
    let tempObj = {
      username: this.state.userName,
      firstName: this.state.firstName,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      streetAddress: this.state.streetAddress,
      postcode: this.state.zipCode,
      city: this.state.city,
      socialSecurity: this.state.socialSecurity,
      telephoneNumber: this.state.telephoneNumber
      /* relativeUsername: this.state.relativeUsername, */
    }

    console.log(JSON.stringify(tempObj))

    return axios({
      method: 'post',
      url: AzureServerUrl + '/api/account/register',
      data: JSON.stringify(tempObj),
      headers: {'Content-Type': 'application/json'}
    })
  }

  render () {
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to='/login' push />
    }

    if (this.props.state.isSignedIn === true) {
      return <Redirect to='/' />
    }

    return (
      <HttpsRedirect>
        <div className='Register'>
          <Typography
            variant='headline'
            color='default'
            align='left'
            style={registerStyles.title}
          >
            Registrera dig
          </Typography>
          <form style={registerStyles.container} noValidate autoComplete='off'>
            <TextField
              id='userName'
              label='Användarnamn'
              required
              style={registerStyles.textField}
              value={this.state.userName}
              onChange={this.handleChange('userName')}
              margin='normal'
            />
            <TextField
              id='email'
              label='Email'
              required
              placeholder='user@example.com'
              style={registerStyles.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin='normal'
              type='email'
            />
            <TextField
              id='password'
              label='Lösenord'
              required
              helperText='Måste vara minst 8 tecken, innehålla en versal och en siffra.'
              style={registerStyles.textField}
              type='password'
              autoComplete='current-password'
              onChange={this.handleChange('password')}
              margin='normal'
            />
            <TextField
              id='passwordRepeat'
              label='Bekräfta lösenord'
              required
              style={registerStyles.textField}
              type='password'
              autoComplete='current-password'
              onChange={this.handleChange('passwordConfirm')}
              margin='normal'
            />
            <TextField
              id='firstName'
              label='Förnamn'
              required
              style={registerStyles.textField}
              value={this.state.firstName}
              onChange={this.handleChange('firstName')}
              margin='normal'
            />
            <TextField
              id='surname'
              label='Efternamn'
              required
              style={registerStyles.textField}
              value={this.state.surname}
              onChange={this.handleChange('surname')}
              margin='normal'
            />
            <TextField
              id='streetAddress'
              label='Adress'
              style={registerStyles.textField}
              value={this.state.streetAddress}
              onChange={this.handleChange('streetAddress')}
              margin='normal'
            />
            <TextField
              id='zipCode'
              label='Postnummer'
              placeholder='12345'
              style={registerStyles.textField}
              value={this.state.zipCode}
              onChange={this.handleChange('zipCode')}
              margin='normal'
              type='number'
            />
            <TextField
              id='city'
              label='Postort'
              style={registerStyles.textField}
              value={this.state.city}
              onChange={this.handleChange('city')}
              margin='normal'
            />
            <TextField
              id='socialSecurity'
              label='Personnummer'
              placeholder='101010-1010'
              style={registerStyles.textField}
              value={this.state.socialSecurity}
              onChange={this.handleChange('socialSecurity')}
              margin='normal'
            />
            <TextField
              id='telephoneNumber'
              label='Telefonnummer'
              placeholder='0700123456'
              style={registerStyles.textField}
              value={this.state.telephoneNumber}
              onChange={this.handleChange('telephoneNumber')}
              margin='normal'
              type='tel'
            />
            <div className='RegisterButton'>
              <Button variant='raised' style={registerStyles.button} onClick={this.handleSubmit}>
                  Registrera
              </Button>
            </div>
          </form>
        </div>
      </HttpsRedirect>

    )
  }
}

export default Register
