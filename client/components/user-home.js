import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import Prompt from './Prompt'
import ReviewHistory from './ReviewHistories'
import annyang from 'annyang'


class UserHome extends Component {
  //map state to props for grammar score for this person
  constructor(props) {
    super(props)

    this.state = {
      start: false,
      review: false
    }
  }

  componentDidMount() {
    if (annyang) {
      //define a command
      var commands = {
        'start': () => this.setState({start: true}),
        'review': () => this.setState({review: true})
      }
      //add our commands to annyang
      annyang.addCommands(commands);

      //start listening
      annyang.start();
    }
  }
  // const {email} = props

  render() {
    //can I do a string of ternaries like this?

    return this.state.start === false && this.state.review === false? (
    <div>
      <h3>Welcome, Bianca! </h3>
      <h1>Your current grammar score is: {5}</h1>
      <h2>If you're ready to start, say, "Start!"</h2>
      <h2>If you want to review your previous mistakes, say, "Review!"</h2>
    </div> ) : (
      
      this.state.start ? <Prompt /> : this.state.review ? <ReviewHistory /> : null )
  
    
  }
}
  // return (
  //   <div>
  //     <h3>Welcome, {email}</h3>
  //     <h1>Your current grammar score is: {5}</h1>
  //     <h2>If you're ready to start, say, "Start!"</h2>
  //     <h2>If you want to review your previous mistakes, say, "Review!"</h2>
  //   </div>
    
  // )


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// 
