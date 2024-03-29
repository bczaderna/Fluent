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
            continue: false
        }
    }

    componentDidMount() {
        annyang.start({ autoRestart: false, continuous: false });

    }

    continue= () => {
        this.setState({
            continue: true
        })
    }

    render() {
    return this.state.continue === true ? <Prompt /> :(
    <div>
        
          <h2 id='incorrect'>Your answer is INCORRECT! </h2>
          <br></br>
          <h2 class='purple'>Your current grammar score is: {this.props.score}</h2>
          <br></br>
          <h2 class='purple'>
            You said: "{this.props.text}". <h2 class='incorrect'> The correct sentence is: "{this.props.suggestedText}"</h2></h2>
         
          <br></br><h2 class='purple'>{this.props.message}</h2>
          <br></br>
          <h2 class='purple'><em>Review this rule: {this.props.rule}</em></h2>
        <br></br>
        <br></br>
        <button className="button" onClick={this.continue}>
            Let's continue!
          </button>
      </div>
    )
    }
}

const mapStateToProps = state => {
    return {
      score: state.score
    }
  }

  export default connect (mapStateToProps)(Incorrect);