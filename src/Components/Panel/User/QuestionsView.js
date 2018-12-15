import React, { Component } from 'react';
import QuestionService from '../../../Services/QuizService/QuestionService';
import { Link } from 'react-router-dom';

export default class QuestionsView extends Component{
 constructor(props){
     super(props);
     this.questionService = new QuestionService("loggedUserxxx");

     this.state = {
        loading: false,
        questionsList: []
    }
 }

 componentWillMount = function () {
    this.setState({ loading: true })
    this.questionService.getQuestionsByUser()
        .then(questions => {
            console.log(questions);
            this.setState({ questionsList: questions, loading: false });
        })
        .catch(err => {
            console.log(err);
        });
}

render() {
    return (
        <div className="container-fluid full-height-container">
            {this.state.loading ? (<div>loading...</div>) :
                (<div className="row mt-4" >
                    <div className='col-sm-1'></div>
                    <div className='col-sm-3'>
                        <div className="text-left ml-4">Quick Links</div>
                        <hr/>
                        <div className="container-fluid text-left">
                            <div> <Link to="/quiz/add"><span><small>Add Quiz</small></span></Link></div>                                
                            <div> <Link to="/q/add"><span><small>Add Question</small></span></Link></div>                                
                        </div>
                        <hr/>
                    </div>
                    <div className='col-sm-7'>
                        <div className="text-left ml-4">Questions Added by You</div>
                        <hr/>
                        <div className="container-fluid text-left">
                            {
                                (this.state.questionsList || []).map((q, index) => {
                                    return (<div key={index}>
                                    <div><input type="checkbox"></input> <label> {q.question}</label></div>
                                    </div>)
                                })
                            }
                        </div>
                        <hr/>
                    </div>
                    <div className='col-sm-1'>
                    </div>
                </div>)}
        </div>
    );
}
}