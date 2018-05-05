import React, { Component } from 'react'

// Import NPM-modules
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'

import {AzureServerUrl, LocalServerUrl} from '../../../utils/Config'
import {uploadProfilePicture} from '../../../utils/ApiRequests'

/**
 *  Change Profile Picture-component.
 *
 *  @author Sofia
 */

class ChangeProfilePicture extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: null
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
     *  Handle submit-button for change profile picture
     *
     *  @author Sofia
     */

    handleSubmit () {
      if (this.state.file === null) {
        return this.props.openSnackBar('Formuläret ej korrekt ifyllt!')
      }

      const formData = new FormData();
      formData.append('file', this.state.file);

      uploadProfilePicture(formData, this.props.state.token)
        .then((response) => {
          return this.props.openSnackBar('Bilden laddades upp!')
        }).catch((err) => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
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
        <img align='center' src={AzureServerUrl + '/images/' + this.props.state.userInfo.username + '.JPG'} alt='Current profile picture' width='200'/>
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
            <Button variant='raised' onClick={() => this.handleSubmit()}>
              Upload
            </Button>
          </label>
        </div>
      )
    }
}

export default ChangeProfilePicture
