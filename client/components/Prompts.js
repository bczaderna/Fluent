import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import annyang from 'annyang'
import Axios from 'axios'
import Incorrect from './Incorrect'
import Correct from './Correct'
const querystring = require('querystring')

class Prompt extends Component {
  constructor() {
    super()

    this.state = {
      language: 'en-US',
      text: '',
      suggestedText: '',
      message: '',
      ruleDescription: '',
      restart: false,
      allcorrect: false
    }

    this.prompts = [
      'Sally might have forgotten her glasses. What would you ask her to make sure she remembered them?',
      'I want to have if you have tried my favorite passtimes. How would I ask you if you have tried the one I am currently doing?',
      'Michael and Lucy played the game. They had ___ the game.',
      'I have just organized all the books on the shelf. The kids have just come back into the classroom. They need not ___ them.'
    ]

    this.checkGrammar = this.checkGrammar.bind(this)
    this.replaceWithCorrections = this.replaceWithCorrections.bind(this)
    this.addCapsAndPunctuation = this.addCapsAndPunctuation.bind(this)
  }

  addCapsAndPunctuation(string) {
    let questionWords = [
      'Which',
      'What',
      'Whose',
      'Who',
      'Whom',
      'Whose',
      'Where',
      'When',
      'How',
      'Why',
      'Is',
      'Are',
      'Do',
      "What's",
      "How's",
      "Who's",
      "Where's",
      "Don't",
      "Aren't",
      "When's"
    ]
    if (typeof string !== 'string') return ''
    let capitalized = string.charAt(1).toUpperCase() + string.slice(2)
    let arr = capitalized.split(' ')
    if (questionWords.includes(arr[0])) {
      return capitalized + '?'
    } else return capitalized + '.'
  }

  componentDidMount() {
    annyang.start()
    // {autoRestart: false, continuous: false}
    var commands = {
      'try again': () => this.setState({restart: true})
    }
    //add our commands to annyang
    annyang.addCommands(commands)

    annyang.addCallback('result', userSaid => {
      let bestGuess = userSaid[0]

      let bestGuessWithPunc = this.addCapsAndPunctuation(`${bestGuess}`)

      console.log(bestGuessWithPunc, 'best guess with punc')

      bestGuessWithPunc = this.state.text + ' ' + bestGuessWithPunc

      this.setState({
        text: bestGuessWithPunc
      })
    })
  }

  replaceWithCorrections(text, feedback) {
    console.log(text, 'text in func')
    let textArr = text.split('')
    console.log(textArr, 'text arr')
    console.log(feedback, 'feedback arr in func')
    let correctedArr = []
    for (let i = 0; i < feedback.length; i++) {
      let currentFeedbackObj = feedback[i]
      let index = currentFeedbackObj.index
      let length = currentFeedbackObj.length

      let replaceThis = textArr.slice(index, index + length).join('')
      console.log(replaceThis, 'replace this')

      let replaceWithThis = currentFeedbackObj.replacement
      console.log(replaceWithThis, 'replace with this')

      let textStr = textArr.join('')
      console.log(textStr, 'text string')
      let corrected = textStr.replace(replaceThis, replaceWithThis)

      this.setState({
        message: currentFeedbackObj.message,
        ruleDescription: currentFeedbackObj.ruleDescription
      })

      correctedArr.push(corrected)
    }
    return correctedArr
  }

  async checkGrammar() {
    let language = this.state.language
    let text = this.state.text
    let queryString = querystring.stringify({language, text})

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

    let feedback = correctionInfo.matches.map(function(match) {
      let length = match.length
      let message = match.message
      let index = match.offset
      let replacement = match.replacements[0].value
      // let replacement = match.replacements[0].value
      let ruleId = match.rule.id
      let ruleDescription = match.rule.description
      let feedbackObj = {
        length,
        message,
        index,
        replacement,
        ruleId,
        ruleDescription
      }

      return feedbackObj
    })

    console.log(feedback, 'feedback')

    let correctedPiece = this.replaceWithCorrections(
      this.state.text,
      feedback
    ).join('')

    if (!feedback.length) {
      this.setState({
        allcorrect: true
      })
    }

    console.log(this.state.allcorrect, 'allcorrect state -- should be true')

    this.setState({
      suggestedText: correctedPiece
    })

    return correctedPiece
  }

  generatePrompt() {
    let randomIndex = Math.floor(Math.random() * this.prompts.length)
    console.log(randomIndex, 'random index')
    let randomPrompt = this.prompts[randomIndex]
    return randomPrompt
  }

  render() {
    //if there have been no answers submitted yet....
    return !this.state.suggestedText && this.state.allcorrect === false ? (
      <div>
        <h1>PROMPT</h1>

        <button
          className="button"
          onClick={() => {
            this.checkGrammar(this.state.text)
          }}
        >
          Check My Grammar
        </button>
      </div>
    ) : this.state.suggestedText !== ''? (
      <div>
      <Incorrect text={this.state.text} suggestedText={this.state.suggestedText} message= {this.state.message} rule={this.state.ruleDescription}/></div>
    ) : this.state.suggestedText === '' && this.state.allcorrect === true? (
      <div>
      <Correct text={this.state.text}/></div>
    ) 
  : null
}
}

export default Prompt;
