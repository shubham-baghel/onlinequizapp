'use strict';
import React, {Component} from 'react'
import QuestionContainer from './QuestionContainer'

import QuestionService from '../../Services/QuizService/QuestionService';
import RevisitForm from './RevisitForm';
import QuizResult from './QuizResult';
import AuthService from '../../Services/AuthService';
import {QUIZ_MODE} from '../../AppConstant';

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
             quizData : {},
             userResponse : {},
             quizMode:QUIZ_MODE.FETCHING
         }
     }

     componentWillMount = function () {
        this.setState({ isFetched: false })
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

    }

     render(){
        if(this.state.quizMode==QUIZ_MODE.FETCHING){
            return <div>Quiz is Loading...</div>;
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
            return (<QuizResult 
                quizData = {this.state.quizData} 
                userResponse = {this.state.userResponse}
                onStartNew={this.handleOnStartNew} />
            )
        }
        
        return (
            <QuestionContainer 
            dontallowjump={false}
            startQuiz={this.state.quizMode==QUIZ_MODE.NEW}
            allowTimer={this.state.quizMode==QUIZ_MODE.NEW}
            quizDuration={1}
            quizData = {this.state.quizData}  
            onFinishQuiz={this.hadleOnFinishQuiz}
            onQuizClockStart={this.onQuizClockStart} 
            userResponses = {this.state.userResponse}/>
        )
     }
 }


 export default QuizContainer;