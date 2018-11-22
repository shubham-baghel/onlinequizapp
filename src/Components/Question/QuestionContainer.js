'use strict';
import React, { Component } from 'react'
import QuestionCard from './QuestionCard';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import FinishButton from './FinishButton';
import QuestionService from '../../Services/QuizService/QuestionService';

export default class QuestionContainer extends Component {

    constructor(props) {
        super(props);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.onOptionSelect = this.onOptionSelect.bind(this);
        this.questionService = new QuestionService();
        this.state = {
            index: 0,
            quiz: {},
            isNext: true,
            isPrev: false,
            currentQuestion: {},
            userResponses: {},
            fetching : true
        };
    }

    handleNextClick(e) {
        this.setState(prevState => {
            return {
                index: prevState.index + 1, currentQuestion: this.state.quiz[prevState.index + 1]
            }
        });
    }

    handlePrevClick() {
        this.setState(prevState => {
            return {
                index: prevState.index - 1, currentQuestion: this.state.quiz[prevState.index - 1]
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

    componentWillMount = function () {
        debugger;
        this.setState({ fetching: true })
        this.questionService.getQuestionsBySubject("/gk")
            .then(res => {
                console.log(res);
                this.setState({ quiz: res, currentQuestion: res[0], fetching: false });
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        if (this.state.fetching) {
            return <div>Loading...</div>;
        }

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
                            this.state.index < this.state.quiz.length - 1 ?
                                (<NextButton onHandleClick={this.handleNextClick} />) :
                                (<FinishButton onHandleClick={this.handleFinishClick} />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}