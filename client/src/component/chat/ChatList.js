import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

// Import NPM-modules
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Chip from 'material-ui/Chip'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatListStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'
import {theme} from '../../styles/Styles'

import {getFriends} from '../../utils/ApiRequests'

/**
 *  ChatList-component. Starting page of chat.
 *
 *  @author Jimmy
 */

class ChatList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: [],
      friends: [],
      selectedFriends: [],
      isLoaded: false,
      dialog: false
    }
  }

  /**
   *  Methods for open and close new chat dialog
   *
   *  @author Jimmy
   */

  handleDialogOpen = () => {
    this.setState({ dialog: true })
  }

  handleDialogClose = () => {
    this.setState({ dialog: false })
  }

  /**
   *  Add friends when starting a new chat.
   *
   *  @author Jimmy
   */

  handleFriendsSelect = event => {
    this.setState({ selectedFriends: event.target.value })
  };

  /**
   *  Cancel new chat. Delete selected friends and close dialog
   *
   *  @author Jimmy
   */

  cancelNewChat = () => {
    this.setState({ selectedFriends: [] })
    return this.handleDialogClose()
  };

  /**
   *  Get users friends when component mounts.
   *
   *  @author Jimmy
   */

  componentDidMount () {
    getFriends(this.props.state.token)
      .then((response) => {
        response.data.friendList.forEach((i) => {
          this.state.friends.push(i)
        })
      }).then(() => {
        this.setState({
          isLoaded: true
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
      <div>
        {this.state.isLoaded ? (
          <div className='ChatList'>
            <div className='ChatList-Header'>
              <Button color='primary' onClick={this.handleDialogOpen}>
                <Icon >add</Icon>
                  Starta ny chatt
              </Button>
            </div>
            <Dialog
              open={this.state.dialog}
              onClose={this.handleDialogClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Starta en ny chatt!'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Lägg till vänner som ska delta i chatten:
                </DialogContentText>
                <FormControl className='ChatList-FormControl'>
                  <InputLabel htmlFor='select-multiple-chip'>Namn</InputLabel>
                  <Select
                    multiple
                    value={this.state.selectedFriends}
                    onChange={this.handleFriendsSelect}
                    input={<Input id='select-multiple-chip' />}
                    renderValue={selected => (
                      <div style={ChatListStyles.formControl.chips}>
                        {selected.map(value => <Chip key={value} label={value} style={ChatListStyles.formControl.chip} />)}
                      </div>
                    )}
                  >
                    {this.state.friends.map(name => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={{
                          fontWeight:
                            this.state.friends.indexOf(name) === -1
                              ? theme.typography.fontWeightRegular
                              : theme.typography.fontWeightMedium
                        }}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.cancelNewChat} color='primary'>
                  Ångra
                </Button>
                <Button onClick={this.handleDialogClose} color='primary' autoFocus>
                  Starta chatt
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div className='AppLoadingDiv'>
            <CircularProgress />
          </div>
        )}
      </div>

    )
  }
}

export default ChatList
