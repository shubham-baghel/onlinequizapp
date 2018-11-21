import React, { Component } from 'react'
import QuestionCard from './QuestionCard';
import Question from './Question';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import FinishButton from './FinishButton';

export default class QuestionContainer extends Component {

    constructor(props) {
        super(props);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.onOptionSelect = this.onOptionSelect.bind(this);
        this.state = {
            index: 0,
            quiz: this.data,
            isNext: true,
            isPrev: false,
            currentQuestion: this.data[0],
            userResponses: {}
        };
    }

    handleNextClick(e) {
        this.setState(prevState => {
            return {
                index: prevState.index + 1, currentQuestion: this.data[prevState.index + 1]
            }
        });
    }

    handlePrevClick() {
        this.setState(prevState => {
            return {
                index: prevState.index - 1, currentQuestion: this.data[prevState.index - 1]
            }
        });
    }

    handleFinishClick(e) {

    }

    onOptionSelect(e) {
        let newResponses = Object.assign({}, this.state.userResponses);
        newResponses[this.state.index] = newResponses[this.state.index] || [];

        let id = parseInt(e.target.id);
        if (newResponses[this.state.index].includes(id)) {
            newResponses[this.state.index] = newResponses[this.state.index].filter((val) => val != id);
        } else {
            if (this.state.currentQuestion.answers.length > 1) {
                newResponses[this.state.index].push(id);
            }
            else {
                newResponses[this.state.index] = [id];
            }
        }

        this.setState({ userResponses: newResponses });
    }

    data = [{
        question: "Who is the PM of India",
        options: [
            {
                "id": 1,
                "o": "Arun Jaitley"
            },
            {
                "id": 2,
                "o": "Y"
            },
            {
                "id": 3,
                "o": "Z"
            }
        ],
        answers: [
            1
        ]
    },
    {
        question: "Who is the CM of MP",
        options: [
            {
                "id": 1,
                "o": "Arun Jaitley"
            },
            {
                "id": 2,
                "o": "Y"
            },
            {
                "id": 3,
                "o": "Z"
            }
        ],
        answers: [
            1,2
        ]
    },
    {
        question: "Who is the CM of Rajasthan",
        options: [
            {
                "id": 1,
                "o": "Arun Jaitley"
            },
            {
                "id": 2,
                "o": "Y"
            },
            {
                "id": 3,
                "o": "Z"
            }
        ],
        answers: [
            1
        ]
    }]




    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-1 mb-2 mt-2 pr-0">
                        <PreviousButton onHandleClick={this.state.index > 0 ? this.handlePrevClick : () => { }} />
                    </div>
                    <div className="col-sm-10  mb-2 mt-2">
                        <QuestionCard
                                responses={this.state.userResponses[this.state.index] || []}
                                question={this.state.currentQuestion}
                                onOptionSelect={this.onOptionSelect} />
                    </div>
                    <div className="col-sm-1 mb-2 mt-2 pl-0">
                        {
                            this.state.index < this.data.length - 1 ?
                                (<NextButton onHandleClick={this.handleNextClick} />) :
                                (<FinishButton onHandleClick={this.handleFinishClick} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}