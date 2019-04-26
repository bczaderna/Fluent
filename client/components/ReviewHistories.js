import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

class ReviewHistory extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <h1>REVIEW HISTORY</h1>
        )
    }
}

export default ReviewHistory