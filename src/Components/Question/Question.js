import React, { Component } from 'react'


class Question extends Component {
    render() {

        return (
            <div className="card-header">{this.props.question}</div>
        )
    }
}

export default Question;