import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
const querystring = require('querystring')
import Prompt from './Prompt'

class Incorrect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            restart: false
        }
    }

    componentDidMount() {
        annyang.start({ autoRestart: false, continuous: false });

        var commands = {
            'next': () => this.setState({restart: true})
        }

        annyang.addCommands(commands);
    }

    render() {
    return this.state.restart === true ? <Prompt /> :(
    <div>
        
          <h3>Your answer is INCORRECT! :( </h3>
          <br></br>
          <div>{this.props.message}</div>
          <ul>
          <li>
            You said: "{this.props.text}". The correct sentence is: "{this.props.suggestedText}"
          </li><br></br>
          <li>Review this rule: {this.props.rule}</li>
        </ul><br></br>
        <br></br>
        To try again, say "Next!"
      </div>
    )
    }
}

export default Incorrect;