import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
const querystring = require('querystring')

class Prompt extends Component {
  constructor() {
    super()

    this.state = {
      language: 'en-US',
      text: ''
    }
    this.checkGrammar = this.checkGrammar.bind(this)
  }

  addCapsAndPunctuation(string) {
    let questionWords = [
      'Which', 'What', 'Whose', 'Who', 'Whom', 'Whose', 'Where', 'When', 'How', 'Why', 'Is', 'Are', 'Do', "What's", "How's", "Who's", "Where's", "Don't", "Aren't", "When's"
    ]
    if (typeof string !== 'string') return ''
    let capitalized = string.charAt(1).toUpperCase() + string.slice(2)
    let arr = capitalized.split(' ')
    if (questionWords.includes(arr[0])) {
      return capitalized + '?'
    } else return capitalized + '.'
  }

  componentDidMount() {
    annyang.start({autoRestart: false, continuous: false})
    // if (annyang) {
    annyang.addCallback('result', userSaid => {
      console.log('user said', userSaid)
      console.log(this.state, 'state')

      let bestGuess = userSaid[0]

      let bestGuessWithPunc = this.addCapsAndPunctuation(`${bestGuess}`)

      console.log(bestGuessWithPunc, 'best guess with punc')

      bestGuessWithPunc = this.state.text + ' ' + bestGuessWithPunc

      this.setState({
        text: bestGuessWithPunc
      })
    })
    // }

    // annyang.start()
  }

  replaceWithCorrection(spokenText, suggestedReplacement, startIndex, length) {
    console.log(spokenText, '**spokenText')
    console.log(startIndex, '**startindex')
    console.log(length, '***length')
    console.log(suggestedReplacement, '***suggestedReplacement')
    spokenText = spokenText.split('')
    console.log(spokenText, 'spokenText')
    
    let spokenTextCopy = spokenText.slice()
    let wordToReplace = spokenTextCopy.splice(startIndex, length)
    console.log(wordToReplace.join(''), 'word to replace')

    spokenText = spokenText.join('');
    console.log(spokenText, 'spokenText2')
    console.log(typeof spokenText, 'type of spoken text')
    console.log(typeof suggestedReplacement, 'type of suggested replacement')
    
    
      
    let corrected = spokenText.replace(wordToReplace.join(''), suggestedReplacement)
    console.log(corrected, 'corrected')
      
      return corrected;
    
    
    // console.log(corrected, '***corrected')
    
  }

  async checkGrammar() {

    let queryString = querystring.stringify(this.state)

    // const res = await Axios.get(
    //     `http://api.grammarbot.io/v2/check?api_key=AF5B9M2X&text=${queryString}`
    // )
    console.log(queryString, 'query string')

    const res = await Axios.post(
      'https://languagetool.org/api/v2/check',
      queryString
    )
    const correctionInfo = res.data
    console.log(correctionInfo, 'correction info')

    let feedback = correctionInfo.matches.map(match => match.message)
    console.log(feedback, 'FEEDBACK')

    let problemStartsAtIndex = correctionInfo.matches.map(match => match.offset)[0]

    console.log(problemStartsAtIndex, 'index')

    let lengthOfProblemChunk = correctionInfo.matches.map(match => match.length)[0]

    console.log(lengthOfProblemChunk, 'length of problem')

    let suggestedReplacement = correctionInfo.matches.map(match => match.replacements[0].value)[0]

    console.log(this.replaceWithCorrection(this.state.text, suggestedReplacement, problemStartsAtIndex, lengthOfProblemChunk), 'CORRECTED TEXT')

    console.log(suggestedReplacement, 'suggestedReplacement')
  }

  render() {
    console.log(this.state.bestGuessText, 'what is bestGuess on state')

    return (
      <div>
        <h1>Describe your hometown.</h1>

        <button
          className="button"
          onClick={() => {
            this.checkGrammar(this.state.text)
          }}
        >
          Check My Grammar
        </button>
      </div>
    )
  }
}

export default Prompt

