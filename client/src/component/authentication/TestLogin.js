import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class TestLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            userName: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit() {
        this.props.openSnackBar('Logga in');
    }

    render() {
        return (
            <div className="Login">
                <Typography
                    variant="headline"
                    color="default"
                    align="left"
                >
                    Logga in
                </Typography>
                <form>
                    <TextField
                        id="name"
                        label="Användarnamn"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Lösenord"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <div className="LoginButton">
                        <Button variant="raised" onClick={this.handleSubmit}>
                            Logga in
                        </Button>

                        <Router>
                        <div>
                            <div>
                                <Link to="/register">Registrera ny användare</Link>
                            </div>
                            <div>
                                <Link to="/password">Glömt lösenord?</Link>
                            </div>
                        </div>
                        </Router>

                    </div>
                </form>
            </div>

        );
    }
}

export default TestLogin;
