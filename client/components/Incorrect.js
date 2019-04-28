import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
const querystring = require('querystring')

const  Incorrect = (props) => {
    return (
    <div>
        <ul>
          <div>You said: {props.text}</div>
          <li>
            INCORRECT! Here is the correct text:{props.suggestedText}
          </li>
          <li>Suggestion: {props.message}</li>
          <li>Grammar rule to review: {props.ruleDescription}</li>
        </ul>
        To try again, say "Try Again"
      </div>
    )
}

export default Incorrect;