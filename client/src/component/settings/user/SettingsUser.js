import React, { Component } from 'react';

// Import NPM-modules
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from 'material-ui/Typography';

// Import styles. settingsUserStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {settingsUserStyles} from "../../../styles/SettingsStyles";
import '../../../styles/Styles.css'

import UserDetails from './UserDetails';

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
        };
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
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
                        <Typography>
                            Ändra lösenord
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography >Notifikationsinställningar</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default SettingsUser;