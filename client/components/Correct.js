import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
const querystring = require('querystring')

const  Correct = (props) => {
    return (
    <div>
          <h3>You said: {props.text}</h3>
          <h3>
            Great job! That's CORRECT!
          </h3>
          
      </div>
    )
}

export default Correct;
