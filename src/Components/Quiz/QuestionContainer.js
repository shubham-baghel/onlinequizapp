'use strict';
import React, { Component } from 'react'
import QuestionCard from './QuestionCard';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import FinishButton from './FinishButton';
import { Redirect } from 'react-router-dom'

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
            currentQuestion: this.props.quizData[0] || {},
            userResponses: this.props.userResponses || {},
            fetching: true,
            isFormReview: false,
        };
    }

    handleNextClick(e) {
        let newResponses = Object.assign({}, this.state.userResponses);

        newResponses[this.state.index] = newResponses[this.state.index] || [];

        this.setState(prevState => {
            return {
                index: prevState.index + 1,
                currentQuestion: this.state.quiz[prevState.index + 1]
            }
        });
        this.state.userResponses = newResponses;
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
        
        this.props.quizData.forEach((ele,index) => {
            newResponses[index] = newResponses[index] || [];
        });

        this.state.userResponses = newResponses;
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
        debugger;
        this.setState({ userResponses: newResponses });
    }

    render() {
        console.log(this.state.userResponses);
        return (
            <div className="container-fluid">
                <div className="row mb-2 mt-2">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-1">
                                <PreviousButton onHandleClick={this.state.index > 0 ? this.handlePrevClick : () => { }} />
                            </div>
                            <div className="col-sm-10">
                                <QuestionCard
                                    responses={this.state.userResponses[this.state.index] || []}
                                    question={this.state.currentQuestion}
                                    onOptionSelect={this.onOptionSelect} />
                            </div>
                            <div className="col-sm-1">
                                {
                                    this.state.index < this.state.quiz.length - 1 ?
                                        (<NextButton onHandleClick={this.handleNextClick} />) :
                                        (<FinishButton onHandleClick={this.handleFinishClick} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card col-sm-2">
                        <div className="card-body">
                            <h5 className="card-title">Quiz-001</h5>
                            <p className="card-text">
                            {
                                this.props.quizData.map((ele,index) => {
                                    return( <div className='m-2 d-inline'>
                                             <label className={(!this.state.userResponses[index] || this.state.userResponses[index].length==0) ? "label label-default" :"label label-primary"} >{index+1}</label>
                                         </div>)
                                })
                            }
                            </p>
                            <a href="#" onClick={this.handleFinishClick} className="btn btn-primary">Finish</a>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        )
    }
}