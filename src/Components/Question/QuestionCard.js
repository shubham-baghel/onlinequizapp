import React, { Component } from 'react'
import Question from "./Question";
import Options from "./Options";

class QuestionCard extends Component {
    render() {
        return (
            <div className="container-fluid" id="react-workspace">
                <div className="row mb-2 mt-2">
                    <div className="col-sm-12">
                        <div className="card">
                            <Question question={this.props.question.question} />
                            <Options
                                responses={this.props.responses}
                                options={this.props.question.options}
                                onOptionSelect={this.props.onOptionSelect} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionCard;