import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
const querystring = require('querystring')
import Prompt from './Prompt'
import {addedScore} from '../store/scoreReducer'

class  Correct extends Component{
    constructor(props) {
        super(props)

        this.state = {
            continue: false
        }
    }

    componentDidMount() {
        annyang.start();

        this.props.addedScore();
    }

    continue= () => {
        this.setState({
            continue: true
        })
    }

    render() {
        console.log(this.props.score, 'CURRENT SCORE')
        console.log(this.state.continue, 'continue on state in Correct')
        console.log(this.props.continue, 'continue on props in Correct')
    return this.state.continue === true ? <Prompt /> : (
    <div>
        <h2>
            Great job! Your answer is CORRECT!
          </h2><br>
          </br>
          <h2>You said: "{this.props.text}"</h2>
          <h2>Your current grammar score is: {this.props.score}</h2>
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
  
  const mapDispatchToProps = dispatch => {
    return {
      addedScore: () => dispatch(addedScore(1))
    }
  }

export default connect (mapStateToProps, mapDispatchToProps)(Correct);
