import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {friendRequestStyles} from '../../styles/FriendsStyles'
import '../../styles/Styles.css'

import {addFriend, getFriends} from '../../utils/ApiRequests'

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

      if (this.state.friendUserName === this.props.state.userInfo.username) {
        return this.props.openSnackBar('Det går inte att lägga till sig själv som vän!')
      }

      getFriends(this.props.state.token)
        .then((response) => {
          let data = response.data.friendList

          for (let i = 0; i < data.length; i++) {
            if (this.state.friendUserName === data[i]) {
              return this.props.openSnackBar(data[i] + ' finns redan i din vänlista!')
            }
          }

          addFriend(this.state.friendUserName, this.props.state.token)
            .then((response) => {
              return this.props.openSnackBar(this.state.friendUserName + ' lades till som vän!')
            }).catch((err) => {
              if (err.response.status === 404) {
                return this.props.openSnackBar('Finns ingen med användarnamnet ' + this.state.friendUserName + '!')
              }
              return this.props.openSnackBar('Något gick fel. Försök igen!')
            })
        }).catch(() => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
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
