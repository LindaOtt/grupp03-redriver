import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import NPM-modules
import { CircularProgress } from 'material-ui/Progress'

// Import styles. settingsStyles for all imported components with a style attribute and CSS-file for classNames and id.
// import {settingsStyles} from '../../styles/SettingsStyles'
import '../../styles/Styles.css'

// Import pages for all different user settings.
import User from './user/SettingsUser'
import SuperUser from './superUser/SettingsSuperUser'
import Admin from './admin/SettingsAdmin'

/**
 *  Settings-component. Start page for settings. Users role is included in props from App.js and the
 *  user is redirected to settings based on role.
 *
 *  @author Jimmy
 */

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userRole: this.props.state.userRole
    }

    this.toggleUser = this.toggleUser.bind(this)
  }

  /**
     *  Check users role and redirect to settings based on role.
     *
     *  @author Jimmy
     */

  toggleUser () {
    switch (this.state.userRole) {
      case 'SuperUser':
        return <SuperUser state={this.props.state} />

      case 'Admin':
        return <Admin state={this.props.state} />

      case 'User':
        return <User state={this.props.state} />

      default:
        return <User state={this.props.state} />
    }
  }
  render () {
    if (this.props.state.isSignedIn === false) {
      return <Redirect to='/login' />
    }

    return (
      <div className='Settings'>
        {this.state.userRole ? (
          <div>
            {this.toggleUser()}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>

    )
  }
}

export default Settings
