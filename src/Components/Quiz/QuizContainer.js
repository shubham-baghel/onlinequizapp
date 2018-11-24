'use strict';
import React, {Component} from 'react'
import QuestionContainer from './QuestionContainer'

import QuestionService from '../../Services/QuizService/QuestionService';
import RevisitForm from './RevisitForm';
import QuizResult from './QuizResult';

export default class QuizContainer extends Component {
     constructor(props){
         super(props);
         this.handleQuizRevisit = this.handleQuizRevisit.bind(this);
         this.revisitQuiz = this.revisitQuiz.bind(this);
         this.onFinishQuiz = this.onFinishQuiz.bind(this);
        this.questionService = new QuestionService();
         this.state = {
             isFetched : false,
             quizData : {},
             isRevisit : false,
             userResponse : {},
             isFinishQuiz : false
         }
     }

     componentWillMount = function () {
         debugger;
        this.setState({ isFetched: false })
        let filterCriteria = this.props.location.state.quizCriteria || [];
        this.questionService.getQuestionsBySubject(filterCriteria.selectedSubjects.join("/"))
            .then(res => {
                console.log(res);
                this.setState({ quizData: res, isFetched: true });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleQuizRevisit(userResponse){
        
        this.setState({isRevisit : true, userResponse : userResponse});
        
    }

    revisitQuiz(){
        this.setState({isRevisit : false})
    }

    onFinishQuiz() {
        this.setState({isFinishQuiz : true})
    }

     render(){
        if(this.state.isFinishQuiz){
            return (<QuizResult 
                quizData = {this.state.quizData} 
                userResponse = {this.state.userResponse} />
            )
        }

        if(this.state.isRevisit ){
           return ( 
           <RevisitForm 
            revisitQuiz ={this.revisitQuiz} 
            userRes = {this.state.userResponse} 
            finishQuiz = {this.onFinishQuiz}/>
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
