import React, { Component } from 'react';
import QuestionService from '../../../Services/QuizService/QuestionService';
import { Link } from 'react-router-dom';
import {ATTEMPT_MODE} from '../../../AppConstant';

export default class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.handleOnQuizClick = this.handleOnQuizClick.bind(this);

        this.questionService = new QuestionService("loggedUserxxx");
        this.state = {
            loading: false,
            quizList: [],
            clicked: 0
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
        this.setState({ clicked: index });
    }

    render() {
        return (
            <div className="container-fluid full-height-container">
                {this.state.loading ? (<div>loading...</div>) :
                    (<div className="row mt-4" >
                        <div className='col-sm-1'></div>
                        <div className='col-sm-3'>
                            <div className="alert alert-info btn-sm">Quick Links</div>
                            <hr />
                            <div className="container-fluid text-left">
                                <div> <Link className="App-link" to={"/quiz/add?url=" + encodeURIComponent(window.location.pathname)}><span>Add Quiz</span></Link></div>
                                <div> <Link className="App-link" to={"/q/add?url=" + encodeURIComponent(window.location.pathname)}><span>Add Question</span></Link></div>
                                {
                                    (this.state.quizList || []).length>0?(
                                        <div className="alert single-line-wrap">Selected: <span>{this.state.quizList[this.state.clicked].name}</span>
                                        <div > <Link className="App-link" to={"/q/show/" + this.state.quizList[this.state.clicked]._id}><span>map questions</span></Link></div>
                                        <div> <Link className="App-link" to="/"><span>modify</span></Link></div>
                                        <div>  <Link className="App-link" to={"/quiz?am="+ATTEMPT_MODE.VIEW+"&qz_id=" + this.state.quizList[this.state.clicked]._id}><span>Quiz View</span></Link></div>
                                        <div> <Link className="App-link" to="/"><span>delete</span></Link></div>
                                    </div>
                                    ):('')
                                }
                                <hr/>
                            </div>
                            <hr />
                        </div>
                        <div className='col-sm-3'>
                            <div className="alert alert-info btn-sm">Quizes</div>
                            <hr />
                            {this.state.quizList.length == 0 ? ('No Quizes are added.') : ('')}
                            <div className="container-fluid text-left">
                                {

                                    (this.state.quizList || []).map((q, index) => {
                                        return (<div key={index} title={q.name} className="single-line-wrap"><span className={"btn-sm " + (this.state.clicked == index ? "btn-light" : "btn-link")} role={"button"} onClick={() => this.handleOnQuizClick(index)}>{q.name}</span>

                                        </div>)
                                    })
                                }
                            </div>
                            <hr />
                        </div>
                        <div className="col-sm-4">
                            <div className="alert alert-info btn-sm">Quiz Detail</div>
                            <hr />
                            {
                                this.state.quizList.length == 0 ? ('No Quiesz are added.') :
                                    (
                                        <div>
                                            <div className="container-fluid text-left">
                                                <div>Quiz Name - {this.state.quizList[this.state.clicked].name}</div>
                                                <div>Quiz Mode - {this.state.quizList[this.state.clicked].quizMode}</div>
                                                <div>Quiz Duration - {this.state.quizList[this.state.clicked].quizDuration}</div>
                                                <div>No of Questions - {this.state.quizList[this.state.clicked].numOfQuestions}</div>
                                                <div>Quiz Min Level - {this.state.quizList[this.state.clicked].minLevel}</div>
                                                <div>Quiz Language - {this.state.quizList[this.state.clicked].language}</div>
                                                <div>Quiz Subjects - {(this.state.quizList[this.state.clicked].subjects || []).join(', ')}</div>
                                                <div>Quiz Tags - {(this.state.quizList[this.state.clicked].tags || []).join(', ')}</div>
                                                <div>Modified On - {this.state.quizList[this.state.clicked].modifiedDate}</div>
                                                <div>Modified By - {this.state.quizList[this.state.clicked].modifiedBy}</div>
                                                <div>Created On - {this.state.quizList[this.state.clicked].createdDate}</div>
                                                <div>Created By - {this.state.quizList[this.state.clicked].createdBy}</div>
                                                <hr />
                                            </div>
                                        </div>
                                    )
                            }
                            <hr />
                        </div>
                        <div className='col-sm-1'>
                        </div>
                    </div>)}
            </div>
        );
    }
}