import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import QuestionService from '../../Services/QuizService/QuestionService';

export default class QuestionFormContainer extends Component {
    constructor(props) {
        super(props);
        this.onHandleFormSubmit=this.onHandleFormSubmit.bind(this);
        this.questionService = new QuestionService();
    }

    onHandleFormSubmit(questionFormData){
        this.questionService.postQuestion(questionFormData);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mb-2 mt-2" >
                    <div  className='col-sm-1'></div>
                    <div className="col-sm-10">
                        <QuestionForm maxOptions={6} minoptions={3} onFormSubmit={this.onHandleFormSubmit} />
                    </div>
                    <div className='col-sm-1'></div>
                </div>
            </div>
        );
    }

   
}