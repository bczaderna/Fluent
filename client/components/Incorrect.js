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
        annyang.start()

        var commands = {
            'next': () => this.setState({restart: true})
        }

        annyang.addCommands(commands);
    }

    render() {
    return this.state.restart === true ? <Prompt /> :(
    <div>
        <ul>
          <div>You said: {this.props.text}</div>
          <li>
            INCORRECT! Here is the correct text:{this.props.suggestedText}
          </li>
          <li>Suggestion: {this.props.message}</li>
          <li>Grammar rule to review: {this.props.ruleDescription}</li>
        </ul>
        To try again, say "Next!"
      </div>
    )
    }
}

export default Incorrect;