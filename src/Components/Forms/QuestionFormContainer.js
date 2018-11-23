import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import QuestionService from '../../Services/QuizService/QuestionService';

export default class QuestionFormContainer extends Component {
    constructor(props) {
        super(props);
        this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
        this.onHandleAddNewQuestion = this.onHandleAddNewQuestion.bind(this);

        this.questionService = new QuestionService();
        this.state = {
            viewMode: false,
            questionFormData: {}
        }
    }

    onHandleFormSubmit(questionFormData) {
        this.questionService.postQuestion(questionFormData).then(res => {
            console.log(res);
            this.setState({ viewMode: true, questionFormData: questionFormData });
        })
            .catch(err => {
                console.log(err);
            });
    }
    onHandleAddNewQuestion(e) {
        this.setState({ viewMode: false, questionFormData: {} });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row mb-2 mt-2" >
                    <div className='col-sm-1'></div>
                    <div className="col-sm-10 card pt-3">
                        <QuestionForm questionModel={this.state.questionFormData}
                            maxOptions={(this.state.questionFormData.options||[]).length}
                            onAddNewQuestion={this.onHandleAddNewQuestion}
                            viewMode={this.state.viewMode}
                            onFormSubmit={this.onHandleFormSubmit}
                        />
                    </div>
                    <div className='col-sm-1'></div>
                </div>
            </div>
        );
    }
}