'use strict';
import React, {Component} from 'react';
import QuestionContainer from './QuestionContainer';
import QuestionService from '../../Services/QuizService/QuestionService';
import RevisitForm from './RevisitForm';
import QuizResult from './QuizResult';
import AuthService from '../../Services/AuthService';
import {QUIZ_MODE,ATTEMPT_MODE} from '../../AppConstant';
var parse = require('url-parse');

class QuizContainer extends Component {
     constructor(props){
         super(props);
         this.handleOnSubmitQuiz = this.handleOnSubmitQuiz.bind(this);
         this.handleOnRevisitQuiz = this.handleOnRevisitQuiz.bind(this);
         this.onQuizClockStart=this.onQuizClockStart.bind(this);
         this.hadleOnFinishQuiz=this.hadleOnFinishQuiz.bind(this);
         this.handleOnStartNew=this.handleOnStartNew.bind(this);

        this.questionService = new QuestionService();
        this.authService = new AuthService();
         this.state = {
             quizInfo:{},
             quizData : {},
             userResponse : {},
             quizMode:QUIZ_MODE.FETCHING,
             query:{}
         }
     }

     componentWillMount = function () {
        this.state.query=parse(this.props.location.search,true).query;
        console.log(this.state.query);
        if(this.state.query && this.state.query.qz_id)
        {
            this.questionService.getQuizCompleteDetail(this.state.query.qz_id)
            .then(detail => {
                console.log(detail);
                this.setState({ quizInfo: detail, quizData: detail.questions , quizMode: QUIZ_MODE.NEW });
            })
            .catch(err => {
                console.log(err);
            });
        }

        else{
            let filterCriteria = (this.props.location.state && this.props.location.state.quizCriteria.selectedSubjects.join("/")) || "gk";
            this.questionService.getQuestionsBySubject(filterCriteria)
                .then(questions => {
                    console.log(questions);
                    this.setState({ quizData: questions, quizMode: QUIZ_MODE.NEW });
                })
                .catch(err => {
                    console.log(err);
                });
        }
       
    }

    onQuizClockStart(){
        this.state.quizMode =QUIZ_MODE.ONGOING;
    }

    handleOnRevisitQuiz(){
        this.setState({quizMode : QUIZ_MODE.REVISIT})
    }

    hadleOnFinishQuiz(userResponse) {
        this.setState({quizMode : QUIZ_MODE.FINISHED, userResponse : userResponse});
    }

    handleOnSubmitQuiz(){
        this.setState({quizMode : QUIZ_MODE.SUBMIT})
    }

    handleOnStartNew(){
        this.componentWillMount();
    }

     render(){
        if(this.state.quizMode==QUIZ_MODE.FETCHING){
            return <div className="full-height-container">Quiz is Loading...</div>;
        }

        if(this.state.quizMode==QUIZ_MODE.FINISHED){
            return ( 
                <RevisitForm 
                onRevisitQuiz ={this.handleOnRevisitQuiz} 
                userRes = {this.state.userResponse} 
                onSubmitQuiz = {this.handleOnSubmitQuiz}/>
            )
         }

        if(this.state.quizMode==QUIZ_MODE.SUBMIT){
            return ( <QuizResult 
                quizData = {this.state.quizData} 
                userResponse = {this.state.userResponse}
                onStartNew={this.handleOnStartNew} />
            )
        }
        
        return (
            <QuestionContainer 
            dontallowjump={false}
            startQuiz={this.state.quizMode==QUIZ_MODE.NEW}
            allowTimer={this.state.quizMode==QUIZ_MODE.NEW && this.state.query.am==ATTEMPT_MODE.ASSESS}
            quizDuration={1}
            quizData = {this.state.quizData} 
            quizInfo={this.state.quizInfo||{}} 
            onFinishQuiz={this.hadleOnFinishQuiz}
            onQuizClockStart={this.onQuizClockStart} 
            userResponses = {this.state.userResponse}/>
        )
     }
 }


 export default QuizContainer;