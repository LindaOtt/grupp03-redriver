import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

// Import NPM-modules
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import queryString from 'query-string'

// Import styles. newPasswordStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {registerStyles} from '../../styles/AuthStyles'
import '../../styles/Styles.css'

import {confirmEmail} from '../../utils/ApiRequests'
import AppStyles from '../../styles/AppStyles'

/**
*  ConfirmEmail-component.
*
*  @author Sofia
*/

class ConfirmEmail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: '',
      token: '',
      navigate: false,
      loading: true
    }
  }

  /**
   *  Handle submit-button.
   *
   *  @author Sofia
   */

  handleSubmit () {
    this.setState({loading: true})
    this.setState({navigate: true})
  }

  componentDidMount() {
    let queries = queryString.parse(this.props.location.search)

    this.setState({userId: queries.userId})
    this.setState({token: queries.code})

    confirmEmail(queries.userId, queries.code)
      .then((response) => {
        this.setState({navigate: true})
        return this.props.openSnackBar('Emailadressen har verifierats!')
      }).catch((err) => {
      this.setState({navigate: true})
      return this.props.openSnackBar('Emailadressen är redan verifierad.')
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
      <div>
        {this.state.loading ? (
          <div className='AppLoadingDiv'>
            <CircularProgress style={AppStyles.loading} />
          </div>
        ) : (
          <div className='Register'>
            <Typography
              variant='headline'
              color='primary'
              align='left'
              style={registerStyles.title}
            >
              Din email har nu verifierats!
            </Typography>
            <form style={registerStyles.container} noValidate autoComplete='off'>
              <div className='RegisterButton'>
                <Button variant='raised' color='primary' style={registerStyles.button} onClick={this.handleSubmit}>
                  Logga in
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

    )
  }
}

export default withRouter(ConfirmEmail)
