import React, { Component } from 'react'
import Question from "./Question";
import Options from "./Options";

class QuestionCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <Question question={this.props.question.question} />
                </div>
                <div className="card-body">
                    <Options
                        responses={this.props.responses}
                        options={this.props.question.options}
                        onOptionSelect={this.props.onOptionSelect} />
                </div>
            </div>
        )
    }
}

export default QuestionCard;