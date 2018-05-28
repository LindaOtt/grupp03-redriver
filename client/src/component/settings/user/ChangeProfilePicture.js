import React, { Component } from 'react'

// Import NPM-modules
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'

import {uploadProfilePicture} from '../../../utils/ApiRequests'
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
      uploaded: true,
      avatarUrl: this.props.state.userInfo.avatarUrl
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

    renderAvatar () {
      if (this.props.state.userInfo.avatarUrl) {
        return <img align='center' src={this.state.avatarUrl} alt='Current profile picture' width='200' />
      } else {
        return <img align='center' src={profilePhoto} alt='Current profile picture' width='200' />
      }
    }

  /**
   *  Check image size and return error if to large.
   *
   *  @author Jimmy
   */

    checkImageSize () {
      return new Promise((resolve, reject) => {
        let tempImg = new Image()
        tempImg.onload = () => {
          if (tempImg.height > 800 || tempImg.width > 800) {
            reject()
          }
          resolve()
        }
        tempImg.src = window.URL.createObjectURL(this.state.file)
      })
    }

    /**
     *  Handle submit-button for change profile picture
     *
     *  @author Sofia
     *  @update Jimmy (Added validation for image size and type)
     */

    handleSubmit () {
      if (this.state.file === null) {
        return this.props.openSnackBar('Formuläret ej korrekt ifyllt!')
      }

      if (this.state.file.type !== 'image/jpg' && this.state.file.type !== 'image/jpeg' && this.state.file.type !== 'image/png') {
        this.setState({ file: null })
        return this.props.openSnackBar('Den uppladdade bilden måste vara av typen JPG eller PNG!')
      }

      this.checkImageSize()
        .then(() => {
          this.setState({
            uploaded: false,
            avatarUrl: null
          })

          const formData = new FormData()
          formData.append('file', this.state.file)

          uploadProfilePicture(formData, this.props.state.token)
            .then((response) => {
              this.setState({
                avatarUrl: this.props.state.userInfo.avatarUrl
              })
              return this.props.openSnackBar('Bilden laddades upp!')
            }).catch((err) => {
              return this.props.openSnackBar('Något gick fel. Försök igen!')
            })
        })
        .catch(() => {
          this.setState({ file: null })
          return this.props.openSnackBar('Den uppladdade bildens höjd och bredd får inte överstiga 800 pixlar!')
        })
    }

    render () {
      return (
        <div className='PictureDetails'>
          <Typography
            variant='subheading'
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
          <br />
          <br />
          <Typography
            variant='subheading'
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
            className='PictureDetails-Input'
          />
            <Button variant='raised' onClick={() => this.handleSubmit()} color={'primary'} style={settingsUserStyles.button}>
              Ladda upp
            </Button>
        </div>
      )
    }
}

export default ChangeProfilePicture
