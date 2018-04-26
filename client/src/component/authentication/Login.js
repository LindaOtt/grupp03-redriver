import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import axios from 'axios/index'

// Import styles. loginStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {loginStyles} from '../../styles/AuthStyles'
import '../../styles/Styles.css'

import {AzureServerUrl} from '../../utils/Config'

import Register from './Register'
import NewPassword from './NewPassword'

/**
 *  Login-component.
 *
 *  @author Jimmy
 */

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userName: '',
      password: '',
      email: 'test1@example.com'
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
     *  Handle submit-button. A login-request is sent to server with form-input included.
     *
     *  @author Jimmy
     */

    handleSubmit () {
      console.log(this.state)

      if (this.state.userName === '' || this.state.password === '' || this.state.email === '') {
        return this.props.openSnackBar('Formuläret ej korrekt ifyllt!')
      }

      this.sendRequest()
        .then((response) => {
          localStorage.setItem('token', JSON.stringify(response.data.token))
          return this.props.openSnackBar('Välkommen ' + this.state.userName + '!')
        }).then(() => {
          return <Redirect to='/' />
        }).catch((err) => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
    }

    /**
     *  Send login request to server
     *
     *  @author Jimmy
     */

    sendRequest () {
      let tempObj = {
        username: this.state.userName,
        password: this.state.password,
        email: this.state.email
      }

      console.log(JSON.stringify(tempObj))

      return axios({
        method: 'post',
        url: AzureServerUrl + '/api/account/login',
        data: JSON.stringify(tempObj),
        headers: {'Content-Type': 'application/json'}
      })
    }

    render () {
      if (this.props.state.isSignedIn === true) {
        return <Redirect to='/' />
      }

      return (
        <div className='Login'>
          <Typography
            variant='headline'
            color='default'
            align='left'
            style={loginStyles.title}
          >
                    Logga in
          </Typography>
          <form style={loginStyles.container} noValidate autoComplete='off'>
            <TextField
              id='userName'
              label='Användarnamn'
              style={loginStyles.textField}
              value={this.state.userName}
              onChange={this.handleChange('userName')}
              margin='normal'
            />
            <TextField
              id='email'
              label='Email'
              style={loginStyles.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin='normal'
            />
            <TextField
              id='password'
              label='Lösenord'
              style={loginStyles.textField}
              type='password'
              autoComplete='current-password'
              onChange={this.handleChange('password')}
              margin='normal'
            />
            <div className='LoginButton'>
              <Button variant='raised' style={loginStyles.button} onClick={this.handleSubmit}>
                            Logga in
              </Button>
              <div style={loginStyles.loginLinkContainer}>
                <div style={loginStyles.loginLinkDivLeft}>
                  <Link style={loginStyles.loginLink} to='/register'>Registrera ny användare</Link>
                </div>
                <div style={loginStyles.loginLinkDivRight}>
                  <Link style={loginStyles.loginLink} to='/password'>Glömt lösenord?</Link>
                </div>
              </div>
            </div>
          </form>
        </div>

      )
    }
}

export default Login
