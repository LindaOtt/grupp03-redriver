import React, { Component } from 'react'

// Import NPM-modules
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'
import {validateChangePassword, validateRegister} from '../../../utils/FormValidation'
import {userChangePassword, userRegister} from '../../../utils/ApiRequests'

/**
 *  Change Password-component.
 *
 *  @author Jimmy
 */

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: true
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
     *  Handle submit-button for change password
     *
     *  @author Jimmy
     */

    handleSubmit () {

      let validation = validateChangePassword(this.state)
      if (validation !== false) {
        return this.props.openSnackBar(validation)
      } else {
        userChangePassword(this.state, this.props.state.token)
          .then((response) => {
            return this.props.openSnackBar('Ditt lösenord har ändrats!')
          }).catch((err) => {
          console.log(err)
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
      }
    }

    componentWillMount() {
      this.setState({
        password: '',
        passwordConfirm: '',
        currentPassword: ''
      })
    }

    render () {
      return (
        <div className='UserDetails'>
          <form style={settingsUserStyles.container} noValidate autoComplete='off'>
            <TextField
              id='currentPassword'
              label='Nuvarande lösenord'
              style={settingsUserStyles.textField}
              type='password'
              onChange={this.handleChange('currentPassword')}
              margin='normal'
              value={this.state.currentPassword}
            />
            <TextField
              id='password'
              label='Nytt lösenord'
              style={settingsUserStyles.textField}
              type='password'
              onChange={this.handleChange('password')}
              margin='normal'
              value={this.state.password}
            />
            <TextField
              id='passwordRepeat'
              label='Bekräfta det nya lösenordet'
              style={settingsUserStyles.textField}
              type='password'
              onChange={this.handleChange('passwordConfirm')}
              margin='normal'
              value={this.state.passwordConfirm}
            />
          </form>
          <Button variant='raised' color={'primary'} style={settingsUserStyles.passwordButton} onClick={() => this.handleSubmit()}>
            Ok
          </Button>
        </div>
      )
    }
}

export default ChangePassword
