import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import annyang from 'annyang'

class Prompt extends Component {
    constructor (props) {
        super(props)

        this.state = {
            //state stuff
        }
    }

    //annyang.start({autoRestart: false})

    componentDidMount() {
        if (annyang) {
            annyang.addCallback('result', function (userSaid, commandText, phrases) {
                console.log('user said',userSaid)
                let bestGuess = userSaid[0];
                console.log(bestGuess, 'best guess')
               
                //now I need to call a thunk that would send this phrase to the database/grammar-checker app
            })
        }

        annyang.start()
    }
    render () {
        return (
            <div>
            <h1>RANDOM PROMPT HERE</h1>
            {/* <h2>{spokenText}</h2> */}
            </div>
            
        )
    }
}

export default Prompt