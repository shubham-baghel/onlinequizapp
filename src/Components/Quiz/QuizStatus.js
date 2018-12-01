import React, { Component } from 'react';
import { FormatNumberLength } from '../Common/Utility';
import { throws } from 'assert';

export default class QuizStatus extends Component {
    constructor(props) {
        super(props);

        this.intervalHandle=null;
        this.startCountDown = this.startCountDown.bind(this);
        this.tick = this.tick.bind(this);

        this.state = {
            secondsRemainingTotal:0,
            minutesRemaining:0,
            secondsRemaining:0,
            ticking:false,
        }
    }

    tick() {
        var min = Math.floor(this.state.secondsRemainingTotal / 60);
        var sec = this.state.secondsRemainingTotal - (min * 60);
        this.setState({
            minutesRemaining: min,
            secondsRemaining: sec
        })
        if (min === 0 & sec === 0) {
            this.state.ticking=false;
            clearInterval(this.intervalHandle);
            this.props.QuizTimer.onQuizTimeOut();
        }
        this.state.secondsRemainingTotal--;
    }

    startCountDown(time) {
        this.intervalHandle = setInterval(this.tick, 1000);
        this.props.QuizTimer.onQuizClockStart(this.intervalHandle);
        this.state.secondsRemainingTotal=time*60;
        this.state.ticking=true;
    }

    componentDidMount(){
        if(this.props.QuizTimer.allowTimer && !this.state.ticking && this.props.QuizTimer.startQuiz){
            this.startCountDown(this.props.QuizTimer.quizDuration);
        }
    }

    componentWillUnmount(){
        this.state.ticking=false;
        clearInterval(this.intervalHandle);
    }

    render() {
        
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Quiz-001</h4>
                    {
                        this.props.QuizTimer.allowTimer?
                            (<label className= {"card-title label "+(this.state.secondsRemainingTotal<30?"label-danger":"label-warning")}>
                            {FormatNumberLength(this.state.minutesRemaining,2)}:
                            {FormatNumberLength(this.state.secondsRemaining,2)} /&nbsp;
                            {FormatNumberLength(this.props.QuizTimer.quizDuration,2)}:00
                            </label>):<label></label>
                    }
                   
                    <div className="card-text mb-2">
                        {
                            this.props.quizData.map((ele, index) => {
                                return (<div key={index} className='m-2 d-inline'>
                                    <label role={this.props.dontallowjump ? null : "button"} onClick={this.props.dontallowjump ? null : () => this.props.handleOnQuestionStatusLabel(index)} className={(!this.props.userResponses[index] || this.props.userResponses[index].length == 0) ? "label label-default" : "label label-primary"} >{index + 1}</label>
                                </div>)
                            })
                        }
                    </div>
                    <button disabled={this.props.dontallowjump && this.props.currentIndex < this.props.quizData.length - 1} onClick={this.props.handleFinishClick} className="btn btn-primary btn-sm">Finish</button>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{FormatNumberLength(this.props.currentIndex + 1, 2)} / {FormatNumberLength(this.props.quizData.length, 2)}</h4>
                    <div className="card-text">
                        <div className='m-2'>
                            <label className="label label-default">Not Attempted</label>
                        </div>
                        <div className='m-2'>
                            <label className="label label-primary">Attempted</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 