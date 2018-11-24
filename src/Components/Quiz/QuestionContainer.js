'use strict';
import React, { Component } from 'react'
import QuestionCard from './QuestionCard';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import FinishButton from './FinishButton';
import {Redirect} from 'react-router-dom'

export default class QuestionContainer extends Component {

    constructor(props) {
        super(props);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.onOptionSelect = this.onOptionSelect.bind(this);
        this.state = {
            index: 0,
            quiz: this.props.quizData || {},
            isNext: true,
            isPrev: false,
            currentQuestion:  this.props.quizData[0] || {},
            userResponses: this.props.userResponses || {},
            fetching : true,
            isFormReview : false,
        };
    }

    handleNextClick(e) {
        let newResponses = Object.assign({},this.state.userResponses);
       
        newResponses[this.state.index] = newResponses[this.state.index] || [];

        this.setState(prevState => {
            return {
                index: prevState.index + 1, 
                currentQuestion: this.state.quiz[prevState.index + 1]
            }
        });
        this.state.userResponses=newResponses;
    }

    handlePrevClick() {
        this.setState(prevState => {
            return {
                index: prevState.index - 1, currentQuestion: this.state.quiz[prevState.index - 1]
            }
        });
    }

    handleFinishClick(e) {
        let newResponses = Object.assign({}, this.state.userResponses);
        newResponses[this.state.index] = newResponses[this.state.index] || [];
        this.state.userResponses=newResponses;
        this.props.onQuizRevisit(this.state.userResponses);
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

    render() {
        console.log(this.state.userResponses);
        return (
            <div className="container-fluid">
                <div className="row mb-2 mt-2">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-1 pr-0">
                        <PreviousButton onHandleClick={this.state.index > 0 ? this.handlePrevClick : () => { }} />
                    </div>
                    <div className="col-sm-8">
                        <QuestionCard
                                responses={this.state.userResponses[this.state.index] || []}
                                question={this.state.currentQuestion}
                                onOptionSelect={this.onOptionSelect} />
                    </div>
                    <div className="col-sm-1 pl-0">
                        {
                            this.state.index < this.state.quiz.length - 1 ?
                                (<NextButton onHandleClick={this.handleNextClick} />) :
                                (<FinishButton onHandleClick={this.handleFinishClick} />)
                        }
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        )
    }
}