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
            continue: false
        }
    }

    componentDidMount() {
        annyang.start();

        var commands = {
            'continue': () => this.setState({continue: true})
        }

        annyang.addCommands(commands);
    }

    render() {
        console.log(this.state.continue, 'continue on state in Correct')
        console.log(this.props.continue, 'continue on props in Correct')
    return this.props.continue === true || this.state.continue === true ? <Prompt /> : (
    <div>
        <h3>
            Great job! Your answer is CORRECT :)!
          </h3>
          <div>You said: "{this.props.text}"</div>
          <br></br>
          <br></br>
          
          To go again, say "Continue!"
      </div>
    )
    }
}

export default Correct;
