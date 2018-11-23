'use strict';
import React, {Component} from 'react'
import QuestionContainer from './QuestionContainer'

import QuestionService from '../../Services/QuizService/QuestionService';
import RevisitForm from './RevisitForm';

export default class QuizContainer extends Component {
     constructor(props){
         super(props);
         this.handleQuizRevisit = this.handleQuizRevisit.bind(this);
         this.revisitQuiz = this.revisitQuiz.bind(this);
        this.questionService = new QuestionService();
         this.state = {
             isFetched : false,
             quizData : {},
             isRevisit : false,
             userResponse : {}
         }
     }

     componentWillMount = function () {
        this.setState({ isFetched: false })
        this.questionService.getQuestionsBySubject("/gk")
            .then(res => {
                console.log(res);
                this.setState({ quizData: res, isFetched: true });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleQuizRevisit(userResponse){
        debugger;
        this.setState({isRevisit : true, userResponse : userResponse});
        
    }

    revisitQuiz(){
        this.setState({isRevisit : false})
    }

     render(){
         debugger;
        if(this.state.isRevisit ){
           return ( 
           <RevisitForm  revisitQuiz ={this.revisitQuiz} userRes = {this.state.userResponse} qCount ={this.state.quizData.length}/>
           )
        }

        if(!this.state.isFetched){
            return <div>Quiz is Loading...</div>;
        }
        
        
        return (
            <QuestionContainer 
            quizData = {this.state.quizData}  
            onQuizRevisit = {this.handleQuizRevisit} 
            userResponses = {this.state.userResponse}/>
        )
     }
 }
