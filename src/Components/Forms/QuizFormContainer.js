import React, { Component } from 'react';
import QuizForm from './QuizForm';
import QuestionService from '../../Services/QuizService/QuestionService';
import { Redirect,Router } from 'react-router-dom';
var parse = require('url-parse');

export default class QuizFormContainer extends Component {
    constructor(props) {
        super(props);
        this.onHandleFormSubmit = this.onHandleFormSubmit.bind(this);
        this.onHandleAddNewQuiz = this.onHandleAddNewQuiz.bind(this);

        this.questionService = new QuestionService("loggedUserxxx");
        this.state = {
            viewMode: false,
            quizFomData: {},
            isMsg:false,
            message:''
        }
    }

    onHandleFormSubmit(quizFomData) {
        let props=this.props;
        this.questionService.postQuiz(quizFomData).then(res => {
            console.log(res);
            var query=parse(props.history.location.search,true).query;
            if(query.url && query.url!=null&& query.url!=''){
                props.history.push(decodeURIComponent(query.url));
            }else{
                this.setState({isMsg:true,message:'Quiz added successfully.', viewMode: true, quizFomData: quizFomData });
            }
        }).catch(err => {
                console.log(err);
                this.setState({isMsg:true,message:'Some error occured while adding quiz.', viewMode: false, quizFomData: quizFomData });
            });
    }

    onHandleAddNewQuiz(e) {
        this.setState({isMsg:false, viewMode: false, quizFomData: {} });
    }

    render() {
        return (
            <div className="container-fluid full-height-container">
                <div className="row mb-2" >
                    <div className='col-sm-3'></div>
                    <div className="col-sm-6">
                        <QuizForm quizModel={this.state.quizFomData}
                            onAddNewQuiz={this.onHandleAddNewQuiz}
                            viewMode={this.state.viewMode}
                            onFormSubmit={this.onHandleFormSubmit}
                            isMsg={this.state.isMsg}
                            message={this.state.message}
                        />
                    </div>
                    <div className='col-sm-3'></div>
                </div>
            </div>
        );
    }
}