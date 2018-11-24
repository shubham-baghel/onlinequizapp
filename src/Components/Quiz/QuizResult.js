import React, { Component } from 'react'

export default class QuizResult extends Component {
    constructor(props) {
        super(props);
        this.calculateResult = this.calculateResult.bind(this);
    }

    calculateResult() {
        
        var quizData = this.props.quizData;
        var userRes = this.props.userResponse;
        var result = [];
        Object.keys(quizData).map((val, i) => {
            if (this.isAnswerCorrect(quizData[val].answers, userRes[val])) {
                result.push(true);
            } else {
                result.push(false);
            }
        })
        return result;
    }

    isAnswerCorrect(answers, response) {
        if (answers.length != response.length)
            return false;

        for (let i = 0; i < answers.length; i++) {
            if (!response.includes(answers[i].id)) {
                return false;
            }
        }
        return true;
    }

    render() {
        let result = this.calculateResult();
        return (
            <div className='container-fluid mt-2'>
                <div className='row mt-2'>
                    <div className='col-sm-5'></div>
                    <div className='col-sm-2'>
                        <label className='label label-default'> Quiz Review</label>
                    </div>
                    <div className='col-sm-5'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-2'>
                    </div>
                    <div className='col-sm-8'>
                        {
                            result.map((val, i) => {
                                return (
                                    <div className='m-2 d-inline'>
                                        <span className={result[i] == false ? "label label-default" : "label label-primary"} >{++i}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='col-sm-2'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-5'></div>
                    <div className='col-sm-2'>
                        <span>Score :</span>
                        <span>{result.filter(r => r).length} / {result.length}</span>
                    </div>
                    <div className='col-sm-5'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-5'></div>
                    <div className='col-sm-2'>
                        <button className="btn btn-primary">Quiz Again</button>
                    </div>
                    <div className='col-sm-5'></div>
                </div>
            </div>

        )
    }
}