import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import Prompt from './Prompt'
import annyang from 'annyang'
import {getAverage} from '../store/scoreReducer'


class UserHome extends Component {
  //map state to props for grammar score for this person
  constructor(props) {
    super(props)

    this.state = {
      goToPrompt: false
    }
  }

  componentDidMount() {
    if (annyang) {
      //define a command
      // var commands = {
      //   'start': () => this.setState({start: true}),
      //   'review': () => this.setState({review: true})
      // }
      // //add our commands to annyang
      // annyang.addCommands(commands);

      //start listening
      annyang.start();

      this.props.getAverage()

    }
  }

  goToPrompt = () => {
    this.setState({
      goToPrompt: true
    })
  }
  // const {email} = props

  render() {
    //can I do a string of ternaries like this?
    console.log(this.state.start, 'WHAT IS START STATE IN USER HOME')

    return this.state.goToPrompt === false ? (
    <div>
      <h3>Welcome, Bianca! </h3>
     
      <h2>Your current grammar score is: {this.props.averageScore}</h2><br></br>

      <button type="button" onClick={this.goToPrompt}>
            Start!
          </button>

      
    </div> ) : <Prompt/>
  
    
  }
}


/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    email: state.user.email,
    // score: state.score.score
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAverage: () => dispatch(getAverage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
// 
