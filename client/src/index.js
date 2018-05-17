import React from 'react'
import ReactDOM from 'react-dom'
import './styles/Styles.css'
import App from './App'
import { MuiThemeProvider } from 'material-ui/styles'
import {theme} from './styles/Styles'

ReactDOM.render(<MuiThemeProvider theme={theme} ><App /></MuiThemeProvider>, document.getElementById('root'))
