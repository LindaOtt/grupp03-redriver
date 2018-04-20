import React, { Component } from 'react';

// Import NPM-modules
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import List, {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

// Import icons.
import NotificationIcon from '@material-ui/icons/Notifications';

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from "../../../styles/SettingsStyles";
import '../../../styles/Styles.css'

import UserDetails from './UserDetails';
import ChangePassword from './ChangePassword'

/**
 *  SettingsUser-component.
 *
 *  @author Jimmy
 */

class SettingsUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            expanded: null,
            notificationToggle: false,
        };
    }

    /**
     *  Expand and close panels
     *
     *  @author Jimmy
     */

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    /**
     *  Handle notification switch. On or off
     *
     *  @author Jimmy
     */

    handleNotificationChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {

        const { expanded } = this.state;

        return (
            <div className="SettingsUser">
                <Typography
                    variant="headline"
                    color="default"
                    align="left"
                    style={settingsUserStyles.title}
                >
                    Inställningar
                </Typography>
                <div className="SettingsUser-Inner">
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} style={settingsUserStyles.expansionPanel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Användaruppgifter</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <UserDetails state={this.props.state}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Ändra lösenord</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ChangePassword state={this.props.state}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <List>
                        <ListItem>
                            <Typography >Notifikationer</Typography>
                            <ListItemSecondaryAction>
                                <Switch
                                    checked={this.state.notificationToggle}
                                    onChange={this.handleNotificationChange('notificationToggle')}
                                    value="notificationToggle"
                                    color="primary"
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <Divider />
                        <ListItem>
                            <Typography >Fylls på med mer inställningar...</Typography>
                            <ListItemSecondaryAction>
                                <Switch
                                    value="todo"
                                    color="primary"
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>
            </div>
        );
    }
}

export default SettingsUser;