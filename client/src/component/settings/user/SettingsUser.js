import React, { Component } from 'react'

// Import NPM-modules
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from 'material-ui/Typography'

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from '../../../styles/SettingsStyles'
import '../../../styles/Styles.css'

// Import components
import UserDetails from './UserDetails'
import ChangePassword from './ChangePassword'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteUser from './DeleteUser'

/**
 *  SettingsUser-component.
 *
 *  @author Jimmy
 *  @update Linda (Added delete user collapsible)
 */

class SettingsUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notificationToggle: false
    }
  }

    /**
     *  Expand and close panels
     *
     *  @author Jimmy
     */

    handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false
      })
      expanded ? sessionStorage.setItem('settingsPanel', JSON.stringify(panel)) : sessionStorage.setItem('settingsPanel', JSON.stringify(false))
    };

    /**
     *  Handle notification switch. On or off
     *
     *  @author Jimmy
     */

    handleNotificationChange = name => event => {
      this.setState({ [name]: event.target.checked })
    };

    componentWillUpdate () {
      if (this.state.expanded === JSON.parse(sessionStorage.getItem('settingsPanel'))) {
        return
      }
      this.setState({expanded: JSON.parse(sessionStorage.getItem('settingsPanel')) })
    }
    componentWillMount () {
      this.setState({expanded: JSON.parse(sessionStorage.getItem('settingsPanel')) })
    }

  componentWillUnmount () {
    sessionStorage.setItem('settingsPanel', JSON.stringify(this.state.expanded))
  }

    render () {
      const { expanded } = this.state

      return (
        <div className='SettingsUser'>
          <Typography
            variant='headline'
            color='primary'
            align='left'
            style={settingsUserStyles.title}
          >
                    Inställningar
          </Typography>
          <div className='SettingsUser-Inner'>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} style={settingsUserStyles.expansionPanel}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography >Användaruppgifter</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <UserDetails state={this.props.state} openSnackBar={this.props.openSnackBar}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography >Ändra lösenord</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ChangePassword state={this.props.state} openSnackBar={this.props.openSnackBar} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel CollapseProps={{ unmountOnExit: true }} expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography >Ändra profilbild</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ChangeProfilePicture state={this.props.state} openSnackBar={this.props.openSnackBar} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel CollapseProps={{ unmountOnExit: true }} expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography >Ta bort användarkonto</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <DeleteUser state={this.props.state} openSnackBar={this.props.openSnackBar}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      )
    }
}

export default SettingsUser
