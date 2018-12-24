'use strict';
import React, { Component } from 'react'
import QuestionCard from './QuestionCard';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import FinishButton from './FinishButton';
import QuizStatus from './QuizStatus';
import { throws } from 'assert';

export default class QuestionContainer extends Component {

    constructor(props) {
        super(props);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.onOptionSelect = this.onOptionSelect.bind(this);
        this.handleOnQuestionStatusLabel = this.handleOnQuestionStatusLabel.bind(this);
        this.onQuizTimeOut=this.onQuizTimeOut.bind(this);   
        this.onQuizClockStart=this.onQuizClockStart.bind(this);

        this.state = {
            index: 0,
            currentQuestion: this.props.quizData[0] || {},
            userResponses: this.props.userResponses || []
        };
        this.handleTimer=null;
    }

    onQuizClockStart(handleTimer){
        this.handleTimer=handleTimer;
        if(this.props.onQuizClockStart){
            this.props.onQuizClockStart();
        }
    }

    onQuizTimeOut(){
        this.handleFinishClick();
    }

    handleNextClick(e) {
        let newResponses = Object.assign({}, this.state.userResponses);

        newResponses[this.state.index] = newResponses[this.state.index] || [];

        this.setState(prevState => {
            return {
                index: prevState.index + 1,
                currentQuestion: this.props.quizData[prevState.index + 1]
            }
        });
        this.state.userResponses = newResponses;
    }

    handlePrevClick() {
        this.setState(prevState => {
            return {
                index: prevState.index - 1, currentQuestion: this.props.quizData[prevState.index - 1]
            }
        });
    }

    handleFinishClick() {
        let newResponses = Object.assign({}, this.state.userResponses);
        newResponses[this.state.index] = newResponses[this.state.index] || [];

        this.props.quizData.forEach((ele, index) => {
            newResponses[index] = newResponses[index] || [];
        });
        
        this.state.userResponses = newResponses;

        if(this.handleTimer){
            clearInterval(this.handleTimer);
        }

        this.props.onFinishQuiz(this.state.userResponses);
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

    handleOnQuestionStatusLabel(index) {
        this.setState({ index: index, currentQuestion: this.props.quizData[index] });
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        
    }

    render() {
        console.log(this.state.userResponses);
        return (
            <div className="container-fluid full-height-container">
                <div className="row m-1">
                <div className="col-sm-1 col-lg-1 col-xl-1"></div>
                    <div className="col-sm-7 col-lg-7 col-xl-7 card m-1">
                        <div className="row mt-2">
                            <div className="col-sm-1 col-lg-1 col-xl-1"></div>
                            <div className="col-sm-10 col-lg-10 col-xl-10">
                                <QuestionCard
                                    responses={this.state.userResponses[this.state.index] || []}
                                    question={this.state.currentQuestion}
                                    onOptionSelect={this.onOptionSelect} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-1 col-lg-1 col-xl-1"></div>
                            <div className="col-sm-10 col-lg-10 col-xl-10">
                                <ul className="pager">
                                    <li className="previous"><a onClick={this.state.index > 0 ? this.handlePrevClick : () => { }} href="#">Previous</a></li>
                                    {
                                    this.state.index < this.props.quizData.length - 1 ?
                                        ( <li className="next"><a onClick={this.handleNextClick} href="#">Next</a></li>) :
                                        ( <li className="next"><a onClick={this.handleFinishClick} href="#">Finish</a></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-lg-3 col-xl-3 p-0 m-1">
                        <QuizStatus
                            QuizTimer={{
                                quizInfo:this.props.quizInfo.quiz||{},
                                allowTimer:this.props.allowTimer,
                                startQuiz:this.props.startQuiz,
                                quizDuration:this.props.quizInfo.quizDuration||1,
                                onQuizClockStart: this.onQuizClockStart,
                                onQuizTimeOut:this.onQuizTimeOut
                            }}
                            currentIndex={this.state.index}
                            handleOnQuestionStatusLabel={this.handleOnQuestionStatusLabel}
                            handleFinishClick={this.handleFinishClick}
                            dontallowjump={this.props.dontallowjump}
                            quizData={this.props.quizData}
                            userResponses={this.state.userResponses} />
                    </div>
                </div>
            </div>
        )
    }
}