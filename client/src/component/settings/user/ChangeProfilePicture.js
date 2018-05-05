import React, { Component } from 'react'

// Import NPM-modules
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'

import {AzureServerUrl, LocalServerUrl} from '../../../utils/Config'
import {uploadProfilePicture, verifyJWT} from '../../../utils/ApiRequests'
import profilePhoto from '../../../temp/user.jpg'

/**
 *  Change Profile Picture-component.
 *
 *  @author Sofia
 */

class ChangeProfilePicture extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: null,
      uploaded: true
    }
  }

    /**
     *  Handle form-input. Inputs are added to this.state.
     *
     *  @author Jimmy
     */

    handleChange = name => event => {
      this.setState({
        [name]: event.target.files[0]
      })
    };

  /**
   *  Render image tag for profile picture. A default picture renders if image url is null.
   *
   *  @author Jimmy
   */

  renderAvatar() {

    if (this.props.state.userInfo.avatarUrl) {

      // Use this when server returns the correct avatar url.
      //return <img align='center' src={this.props.state.userInfo.avatarUrl} alt='Current profile picture' width='200'/>
      return <img align='center' src={this.state.avatarUrl} alt='Current profile picture' width='200'/>
    } else {
      return <img align='center' src={profilePhoto} alt='Current profile picture' width='200'/>
    }
  }

    /**
     *  Handle submit-button for change profile picture
     *
     *  @author Sofia
     */

    handleSubmit (e) {
      if (this.state.file === null) {
        return this.props.openSnackBar('Formuläret ej korrekt ifyllt!')
      }

      this.setState({
        uploaded: false,
        avatarUrl: null
      })

      const formData = new FormData();
      formData.append('file', this.state.file);

      uploadProfilePicture(formData, this.props.state.token)
        .then((response) => {
          this.updateAvatarUrl()
          return this.props.openSnackBar('Bilden laddades upp!')
        }).catch((err) => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
    }

  /**
   * Update picture after a new is uploaded.
   *
   *  @author Jimmy
   */

    updateAvatarUrl() {
      verifyJWT(this.props.state.token)
        .then((response) => {
          console.log(response)
          this.setState({
            avatarUrl: response.data.avatarUrl,
            uploaded: true
          })
        })
    }

    componentWillMount() {
      this.updateAvatarUrl()
    }

    render () {
      return (
        <div className='PictureDetails'>
        <Typography
          variant='menu'
          color='default'
          align='center'
        >
          Din nuvarande profilbild:
        </Typography>
          {this.state.uploaded ? (
            <div>
              {this.renderAvatar()}
            </div>
          ) : (
            <div className='AppLoadingDiv'>
              <CircularProgress />
            </div>
          )}
        <br/>
        <br/>
        <Typography
          variant='menu'
          color='default'
          align='center'
        >
          Välj en bild att ladda upp som din profilbild:
        </Typography>
          <input
            align='center'
            accept='image/*'
            id='raised-button-file'
            type='file'
            name='files'
            onChange={this.handleChange('file')}
          />
          <label htmlFor='raised-button-file'>
            <Button variant='raised' onClick={(e) => this.handleSubmit(e)}>
              Upload
            </Button>
          </label>
        </div>
      )
    }
}

export default ChangeProfilePicture
