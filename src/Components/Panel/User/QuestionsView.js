import React, { Component } from 'react';
import QuestionService from '../../../Services/QuizService/QuestionService';
import { Link } from 'react-router-dom';
import '../../Common/Utility';

export default class QuestionsView extends Component {
    constructor(props) {
        super(props);
        this.questionService = new QuestionService("loggedUserxxx");
        this.onSelectQuestion = this.onSelectQuestion.bind(this);
        this.onMapUnMapQuestions=this.onMapUnMapQuestions.bind(this);

        this.state = {
            loading: false,
            questionsList: [],
            questionsListMapped: [],
            questionToMap: [],
            questionToUnMap: []
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

    onSelectQuestion(e, id, map) {
        if (map) {
            var t=this.state.questionToMap;
            if (e.target.checked) {
                t.push(id);
            } else {
                t = t.remove(id);
            }
            this.setState({questionToMap:t});
        } else {
            var t=this.state.questionToUnMap;
            if (e.target.checked) {
                t.push(id);
            } else {
                t = t.remove(id);
            }
            this.setState({questionToUnMap:t});
        }
    }

    onMapUnMapQuestions(map){
        if(map){
            var toMap=this.state.questionsList.filter((i,q)=>{debugger;this.state.questionToMap.includes(i)});
           
        }else{

        }
    }

    render() {
        return (
            <div className="container-fluid full-height-container">
                {this.state.loading ? (<div>loading...</div>) :
                    (<div className="row mt-4" >
                        <div className='col-sm-1'></div>
                        <div className='col-sm-2'>
                            <div className="alert alert-info btn-sm">Quick Links</div>
                            <hr />
                            <div className="container-fluid text-left">
                                <div> <Link className="App-link" to="/quiz/add"><span>Add Quiz</span></Link></div>
                                <div> <Link className="App-link" to="/q/add"><span>Add Question</span></Link></div>
                            </div>
                            <hr />
                        </div>
                        <div className='col-sm-4'>
                            <div className="alert alert-info btn-sm">Map Questions</div>
                            <hr />
                            <div className="container-fluid text-left">
                                {
                                    (this.state.questionsList || []).map((q, index) => {
                                        return (<div key={index}>
                                            <div className="m-2"><input type="checkbox" onChange={(e) => this.onSelectQuestion(e, index , true)}></input> <span className="alert"> {q.question}</span></div>
                                        </div>)
                                    })
                                }
                                {
                                    (this.state.questionsList || []).length > 1 ?
                                        (<div><button onClick={()=>this.onMapUnMapQuestions(true)} disabled={this.state.questionToMap.length==0} className="btn btn-sm btn-info">Map</button></div>) : ('')
                                }
                            </div>
                            <hr />
                        </div>
                        <div className='col-sm-4'>
                            <div className="alert alert-info btn-sm">Mapped Quiz-Questions</div>
                            <hr />
                            <div className="container-fluid text-left">
                                {
                                    (this.state.questionsListMapped || []).map((q, index) => {
                                        return (<div key={index}>
                                            <div className="m-2"><input type="checkbox" onChange={(e) => this.onSelectQuestion(e, index, false)}></input> <span className="alert"> {q.question}</span></div>
                                        </div>)
                                    })
                                }
                                {
                                    (this.state.questionsListMapped || []).length > 1 ?
                                        (<div><button onClick={()=>this.onMapUnMapQuestions(false)} disabled={this.state.questionToUnMap.length==0} className="btn btn-sm btn-info">Revert</button></div>) : ('')
                                }
                            </div>
                            <hr />
                        </div>
                        <div className='col-sm-1'>
                        </div>
                    </div>)}
            </div>
        );
    }
}