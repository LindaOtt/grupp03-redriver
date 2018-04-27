import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import axios from 'axios'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {friendRequestStyles} from '../../styles/FriendsStyles'
import '../../styles/Styles.css'

import {AzureServerUrl} from '../../utils/Config'

/**
 *  FriendRequest-component. See friend requests and add friends.
 *
 *  @author Jimmy
 */

class FriendRequests extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendRequests: [],
      friendUserName: ''
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
     *  Handle add friend-button.
     *
     *  @author Jimmy
     */

    handleSubmit () {
      if (this.state.friendUserName === '') {
        return this.props.openSnackBar('Formuläret ej korrekt ifyllt!')
      }

      this.sendRequest()
        .then((response) => {
          console.log(response)
          return this.props.openSnackBar(this.state.friendUserName + ' lades till som vän!')
        }).catch((err) => {
          console.log(err)
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
    }

    /**
     *  Send add friend request to server.
     *
     *  @author Jimmy
     */

    sendRequest () {
      let tempObj = {
        username: this.state.friendUserName
      }

      console.log(JSON.stringify(tempObj))

      return axios({
        method: 'post',
        url: AzureServerUrl + '/api/user/addfriend',
        data: JSON.stringify(tempObj),
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.state.token}
      })
    }

    render () {
      if (this.props.state.isSignedIn === false) {
        return <Redirect to='/login' />
      }

      return (
        <div className='FriendRequests'>
          <Typography
            variant='headline'
            color='default'
            align='left'
            style={friendRequestStyles.title}
          >
                    Vänförfrågningar
          </Typography>
          <div className='FriendRequests-Inner'>
            {this.state.friendRequests.length <= 0 ? (
              <Typography >Inga nya vänförfrågningar</Typography>
            ) : (
              <div>
                <p>ToDo. Add cards for each request</p>
              </div>
            )}
          </div>
          <Divider />
          <div className='FriendRequests-Inner'>
            <TextField
              id='userName'
              label='Lägg till ny vän:'
              style={friendRequestStyles.textField}
              value={this.state.friendUserName}
              onChange={this.handleChange('friendUserName')}
              margin='normal'
            />
            <Button variant='raised' style={friendRequestStyles.button} onClick={this.handleSubmit}>
                        Skicka vänförfrågan
            </Button>
          </div>
        </div>

      )
    }
}

export default FriendRequests
