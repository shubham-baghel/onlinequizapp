import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import QuestionService from '../../Services/QuizService/QuestionService';
import { Switch, Route, Redirect } from 'react-router-dom';
var parse = require('url-parse')

export default class QuestionFormContainer extends Component {
    constructor(props) {
        super(props);
        this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
        this.onHandleAddNewQuestion = this.onHandleAddNewQuestion.bind(this);

        this.questionService = new QuestionService("loggedUserxxx");
        this.state = {
            viewMode: false,
            questionFormData: {},
            isMsg:false,
            message:''
        }
    }

    onHandleFormSubmit(questionFormData) {
       
        this.questionService.postQuestion(questionFormData).then(res => {
            console.log(res);
            var query=parse(this.props.location.search,true).query;
            if(query.url && query.url!=null&& query.url!=''){
                this.props.history.push(decodeURIComponent(query.url));
            }else{
                this.setState({isMsg:true,message:'Question added successfully.', viewMode: true, questionFormData: questionFormData });
            }
        }).catch(err => {
                console.log(err);
                this.setState({isMsg:true,message:'Some error occured while adding question.', viewMode: false, questionFormData: questionFormData });
            });
    }

    onHandleAddNewQuestion(e) {
        this.setState({isMsg:false, viewMode: false, questionFormData: {} });
    }

    render() {
        console.log(this.state.query);
        return (
            <div className="container-fluid full-height-container">
                <div className="row mb-2 mt-2" >
                        <div className='col-sm-2'></div>
                        <div className="col-sm-8 pt-3">
                            <QuestionForm questionModel={this.state.questionFormData}
                                maxOptions={(this.state.questionFormData.options||[]).length}
                                onAddNewQuestion={this.onHandleAddNewQuestion}
                                viewMode={this.state.viewMode}
                                onFormSubmit={this.onHandleFormSubmit}
                                isMsg={this.state.isMsg}
                                message={this.state.message}
                            />
                        </div>
                        <div className='col-sm-2'></div>
                    </div>
            </div>
        );
    }
}