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
      allcorrect: false,
      containsError: false,
      continue: false,
      prompt: '',
      correctedPiece: ''
    }

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
    let capitalized = string.charAt(0).toUpperCase() + string.slice(1)
    console.log(capitalized, 'capitalized in the func')
    let arr = capitalized.split(' ')
    if (questionWords.includes(arr[0])) {
      console.log(arr, 'arr')
      return capitalized + '?'
    } else if (arr[arr.length - 1] !== '.') {
      return capitalized + '.'
    } else return capitalized
  }

  async componentDidMount() {
    let res = await Axios.get('/api/prompt')
    let prompt = res.data

    this.setState({
      prompt: prompt,
      bestGuess: ''
    })


    annyang.start({autoRestart: false})

    var commands = {
      continue: () =>
        this.setState({
          continue: true
        })
    }
    //add our commands to annyang
    annyang.addCommands(commands)

    annyang.addCallback('result', userSaid => {
      let bestGuess = userSaid[0]
      console.log(userSaid, 'user said')
      if (bestGuess.slice(0, 1) === ' ') {
        console.log(bestGuess, 'BEST GUESS INSIDE THE IF STATEMENT')
        bestGuess = bestGuess.slice(1);
        console.log(bestGuess, 'NEW BEST GUESS WITHOUT EMPTY SPACE')
      }
      
      let bestGuessWithPunc = this.addCapsAndPunctuation(`${bestGuess}`)

      bestGuessWithPunc = this.state.text + ' ' + bestGuessWithPunc

      console.log(bestGuessWithPunc, 'best guess with punc')

      this.setState({
        bestGuess: bestGuessWithPunc
      })
      if (bestGuessWithPunc.includes('.')) {
        bestGuessWithPunc = bestGuessWithPunc.slice(
          0,
          bestGuessWithPunc.indexOf('.') + 1
        )
      } else if (bestGuessWithPunc.includes('?')) {
        bestGuessWithPunc = bestGuessWithPunc.slice(
          0,
          bestGuessWithPunc.indexOf('?') + 1
        )
      }


      this.setState({
        text: bestGuessWithPunc
      })
    })
  }

  replaceWithCorrections(text, feedback) {
    
    let textArr = text.split('')
    
    let correctedArr = []
    for (let i = 0; i < feedback.length; i++) {
      let currentFeedbackObj = feedback[i]
      let index = currentFeedbackObj.index
      let length = currentFeedbackObj.length

      let replaceThis = textArr.slice(index, index + length).join('')
      

      let replaceWithThis = currentFeedbackObj.replacement
      

      let textStr = textArr.join('')
      
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
    //     `http://api.grammarbot.io/v2/check?api_key=AF5B9M2X&${queryString}`
    // )

    const res = await Axios.post(
      'https://languagetool.org/api/v2/check',
      queryString
    )
    const correctionInfo = res.data
    

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


    let correctedPiece = this.replaceWithCorrections(
      this.state.text,
      feedback
    ).join('')

    console.log(feedback, 'what is feedback')

    if (!feedback.length) {
      this.setState({
        allcorrect: true
      })
    } else {
      this.setState({
        containsError: true
      })
    }

    this.setState({
      correctedPiece: correctedPiece
    })

    console.log(correctedPiece, 'corrected piece')
    console.log(this.state.bestGuess, 'best guess')



    // this.setState({
    //   bestGuess: correctedPiece
    // })

    return correctedPiece
  }

  render() {
    // console.log(this.state.bestGuess, 'best guess in render')
    console.log(this.state.containsError, 'does it contain error?')
    console.log(this.state.allcorrect, 'is it all correct?')

    // let lastChar = this.state.bestGuess.substr(this.state.bestGuess.length -1);

    // console.log(lastChar, 'LAST CHAR')

    // if (lastChar !== '?') {
    //   this.state.bestGuess = this.state.bestGuess + '.'
    // }
    //if there have been no answers submitted yet....
    return this.state.allcorrect === false && this.state.containsError === false ? (
      <div>
        <h1>{this.state.prompt.text}</h1>
        <br></br>
        <h2><em>{this.state.bestGuess}</em></h2>
        <br></br>
        <br></br>
        <button
          className="button"
          onClick={() => {
            this.checkGrammar(this.state.text)
          }}
        >
          Check My Grammar
        </button>
      </div>
    ) : this.state.containsError ? (
      <div>
        <Incorrect
          text={this.state.text}
          suggestedText={this.state.correctedPiece}
          message={this.state.message}
          rule={this.state.ruleDescription}
          continue={this.state.continue}
        />
      </div>
    ) : this.state.suggestedText === '' && this.state.allcorrect === true ? (
      <div>
        <Correct text={this.state.text} continue={this.state.continue} />
      </div>
    ) : null
  }
}

export default Prompt
