import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
const querystring = require('querystring')
import Prompt from './Prompt'

class  Correct extends Component{
    constructor(props) {
        super(props)

        this.state = {
            prompt: false
        }
    }

    componentDidMount() {
        annyang.start()

        var commands = {
            'next': () => this.setState({prompt: true})
        }

        annyang.addCommands(commands);
    }

    render() {

    return this.state.prompt === true ? <Prompt /> : (
    <div>
          <h3>You said: {this.props.text}</h3>
          <h3>
            Great job! That's CORRECT!
          </h3>
          To go again, say "Next!"
      </div>
    )
    }
}

export default Correct;
