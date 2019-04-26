import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'

class Prompt extends Component {
  constructor() {
    super()

    this.state = {
      bestGuessText: '',
      language: 'en-US'
    }
    this.checkGrammar = this.checkGrammar.bind(this)
  }

  componentDidMount() {
    annyang.start()
    // if (annyang) {
      annyang.addCallback('result', (userSaid) => {
        console.log('user said', userSaid)
        console.log(this.state, 'state')

        let bestGuess = userSaid[0];
        console.log(bestGuess, 'best guess in component did mount')

        this.setState({
            bestGuessText: bestGuess
        })
        
      })
    // }

    // annyang.start()
  }

  
  async checkGrammar() {
    // //create POST to LanguageTool API
    //try sending it as query string w/ string interpolation
    //look at axios API - sending it url encoded

    const res = await Axios.get(
        `http://api.grammarbot.io/v2/check?api_key=AF5B9M2X&text=${this.state}`
    )

    //  const res = await Axios.post(
    //  'https://languagetool.org/api/v2/check',
    //   this.state
    //  )
     const correctionInfo = res.data
    console.log(correctionInfo, 'correction info')
      
  }

  

  render() {
    console.log(this.state.bestGuessText, 'what is bestGuess on state')
    return (
      <div>
        <h1>Describe your hometown.</h1>
        
        <button
          className="button"
          onClick={() => {
            this.checkGrammar(this.state.bestGuessText)
          }}
        >
          Check My Grammar
        </button>
      </div>
    )
  }
}

export default Prompt
