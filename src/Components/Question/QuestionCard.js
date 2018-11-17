import React, {Component} from 'react'
import Question from "./Question";
import Options from "./Options";

class QuestionCard extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="container-fluid" id="react-workspace">
                <div className="row mb-2 mt-2">
                    <div className="col-sm-12">
                        <div className="card">
                            <Question question = {this.props.question.question} />
                            <Options options = {this.props.question.options} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionCard;