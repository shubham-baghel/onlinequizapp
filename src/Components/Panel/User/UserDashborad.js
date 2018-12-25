import React, { Component } from 'react';
import QuestionService from '../../../Services/QuizService/QuestionService';
import { Link } from 'react-router-dom';

export default class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.handleOnQuizClick = this.handleOnQuizClick.bind(this);
        this.deleteQuiz=this.deleteQuiz.bind(this);

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
                this.setState({ quizList: quizes, loading: false, clicked:0 });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleOnQuizClick(index) {
        this.setState({ clicked: index });
    }

    deleteQuiz(e,quiz_id){
        e.preventDefault();
        if (window.confirm("Are you sure? you want to delete Quiz.")) {
            this.questionService.deleteQuizs([quiz_id])
            .then(res => {
                console.log(res);
                this.componentWillMount();//Again load
            })
            .catch(err => {
                console.log(err);
            });
        } 
    }

    render() {
        let qObject=this.state.quizList[this.state.clicked];
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
                                        <div className="alert single-line-wrap">Selected: <span>{qObject.name}</span>
                                        <div > <Link className="App-link" to={"/q/show/" + qObject._id}><span>map questions</span></Link></div>
                                        <div> <Link className="App-link" to="/"><span>modify quiz</span></Link></div>
                                        <div> <a href="/" className="App-link"><span onClick={(e)=>this.deleteQuiz(e,qObject._id)}>delete quiz</span></a></div>
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
                                            <div className="container-fluid">
                                                {
                                                    Object.keys(qObject).map(function(key, index) {
                                                    return ((key=="_id"||key=="__v")?(''):
                                                        <div  key={index}><div className="row text-left">
                                                            <div className="col-sm-5"><span>{key}</span></div>
                                                            <div className="col-sm-7"><span>{qObject[key]}</span></div>
                                                        </div></div>)
                                                     })
                                                }
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