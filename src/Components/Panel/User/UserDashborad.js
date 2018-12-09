import React, { Component } from 'react';
import QuestionService from '../../../Services/QuizService/QuestionService';
import { Link } from 'react-router-dom';

export default class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.handleOnQuizClick = this.handleOnQuizClick.bind(this);

        this.questionService = new QuestionService("loggedUserxxx");
        this.state = {
            loading: false,
            quizList: [],
            clicked:0
        }
    }

    componentWillMount = function () {
        this.setState({ loading: true })
        this.questionService.getQuizByUser()
            .then(quizes => {
                console.log(quizes);
                this.setState({ quizList: quizes, loading: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleOnQuizClick(index) {
        this.setState({clicked:index});
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
                        <div className='col-sm-3'>
                            <div className="text-left ml-4">Quizes</div>
                            <hr/>
                            <div className="container-fluid text-left">
                                {
                                    (this.state.quizList || []).map((q, index) => {
                                        return (<div key={index}><label className={"label "+(this.state.clicked==index?"label-info":"label-default")} role={"button"} onClick={() => this.handleOnQuizClick(index)}>{q.name}</label></div>)
                                    })
                                }
                            </div>
                            <hr/>
                        </div>
                        <div className="col-sm-4">
                             <div className="text-left ml-4">Quiz Detail</div>
                             <hr/>
                             {
                                 this.state.quizList.length==0?('No Quiz are added.'):
                                 (
                                <div className="container-fluid text-left">
                                <div>Quiz Name - {this.state.quizList[this.state.clicked].name}</div>
                                <div>Quiz Mode - {this.state.quizList[this.state.clicked].quizMode}</div>
                                <div>No of Questions - {this.state.quizList[this.state.clicked].numOfQuestions}</div>
                                <div>Quiz Min Level - {this.state.quizList[this.state.clicked].minLevel}</div>
                                <div>Quiz Language - {this.state.quizList[this.state.clicked].language}</div>
                                <div>Quiz Subjects - {(this.state.quizList[this.state.clicked].subjects||[]).join(', ')}</div>
                                <div>Quiz Tags - {(this.state.quizList[this.state.clicked].tags||[]).join(', ')}</div>
                                <div>Created On - {this.state.quizList[this.state.clicked].createdDate}</div>
                                 </div>
                                 )
                             }
                            <hr/>
                        </div>
                        <div className='col-sm-1'>
                        </div>
                    </div>)}
            </div>
        );
    }
}