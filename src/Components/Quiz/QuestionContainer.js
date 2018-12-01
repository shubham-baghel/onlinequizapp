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
            <div className="container-fluid">
                <div className="row mb-2 mt-2">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-1">
                                <PreviousButton onHandleClick={this.state.index > 0 ? this.handlePrevClick : () => { }} />
                            </div>
                            <div className="col-sm-10 p-0">
                                <QuestionCard
                                    responses={this.state.userResponses[this.state.index] || []}
                                    question={this.state.currentQuestion}
                                    onOptionSelect={this.onOptionSelect} />
                            </div>
                            <div className="col-sm-1">
                                {
                                    this.state.index < this.props.quizData.length - 1 ?
                                        (<NextButton onHandleClick={this.handleNextClick} />) :
                                        (<FinishButton onHandleClick={this.handleFinishClick} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 p-0">
                        <QuizStatus
                            QuizTimer={{
                                allowTimer:this.props.allowTimer,
                                startQuiz:this.props.startQuiz,
                                quizDuration: this.props.quizDuration,
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
                    <div className="col-sm-2"></div>
                </div>
            </div>
        )
    }
}