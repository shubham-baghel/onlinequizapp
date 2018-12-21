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
        this.storeQuizMapping=this.storeQuizMapping.bind(this);

        this.state = {
            loading: false,
            loadingdetail:false,
            questionsList: [],
            questionsListMapped: [],
            questionToMap: [],
            questionToUnMap: [],
            quizDetail:{},
            urlPath:{}
        }
    }

    componentWillMount = function () {
        console.log(this.props.match.params);
        this.setState({ loading: true })
        this.questionService.getQuestionsByUser()
            .then(questions => {
                console.log(questions);
                this.setState({ questionsList: questions, loading: false });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({ loadingdetail: true })
        this.questionService.getQuizCompleteDetail(this.props.match.params._quiz_id)
            .then(detail => {
                console.log(detail);
                this.setState({ quizDetail: detail, questionsListMapped: detail.questions, loadingdetail: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    storeQuizMapping(e){
        let mappingData={
            quiz_id: this.state.quizDetail.quiz._id,
            questions_ids:this.state.questionsListMapped.map((q)=>q._id)
        }
        this.questionService.saveQuizMapping(mappingData)
            .then(mapped => {
                console.log(mapped);
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
            var questionToMap=this.state.questionToMap;
            var questionsListMapped=this.state.questionsListMapped;

            var toMap=this.state.questionsList.filter((q,i)=>{return questionToMap.includes(q._id)});
            var notMappedYet= toMap.filter((q,i)=>{return !questionsListMapped.some((qm)=> qm._id==q._id)});
            this.setState({questionsListMapped:questionsListMapped.concat(notMappedYet)});
           
        }else{
            var questionToUnMap=this.state.questionToUnMap;
            var questionsListMapped=this.state.questionsListMapped;

            var remainingList=questionsListMapped.filter((q)=>!questionToUnMap.includes(q._id));
            this.setState({questionsListMapped:remainingList,questionToUnMap:[]});
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
                                <div> <Link className="App-link" to={"/q/add?url="+encodeURIComponent(window.location.pathname)}><span>Add Question</span></Link></div>
                            </div>
                            <hr />
                        </div>
                        <div className='col-sm-4'>
                            <div className="alert alert-info btn-sm">Available Questions</div>
                            <hr />
                            <div className="container-fluid text-left">
                                { (this.state.questionsList || []).length==0?(<div className="text-center">No Questions Available to map</div>):('')}
                                {
                                    (this.state.questionsList || []).map((q, index) => {
                                        return (<div key={index}>
                                            <div className="m-2"><input id={"map"+index} type="checkbox" onChange={(e) => this.onSelectQuestion(e, q._id , true)}></input> <span className="alert"> {q.question}</span></div>
                                        </div>)
                                    })
                                }
                                {
                                    (this.state.questionsList || []).length > 0 ?
                                        (<div><button onClick={()=>this.onMapUnMapQuestions(true)} disabled={this.state.questionToMap.length==0} className="btn btn-sm btn-info col-sm-5 m-2">Map</button></div>) : ('')
                                }
                            </div>
                            <hr />
                        </div>
                        <div className='col-sm-4'>
                            <div className="alert alert-info btn-sm">Mapped Quiz-Questions</div>
                            <hr />
                            <div className="container-fluid text-left">
                                { (this.state.questionsListMapped || []).length==0?(<div className="text-center">No Questions mapped yet</div>):('')}
                                {
                                    (this.state.questionsListMapped || []).map((q, index) => {
                                        return (<div key={index}>
                                            <div className="m-2"><input id={"unmap"+index} type="checkbox" onChange={(e) => this.onSelectQuestion(e, q._id, false)}></input> <span className="alert"> {q.question}</span></div>
                                        </div>)
                                    })
                                }
                                {
                                    (this.state.questionsListMapped || []).length > 0 ?
                                        (<div>
                                             <button onClick={()=>this.onMapUnMapQuestions(false)} disabled={this.state.questionToUnMap.length==0} className="btn btn-sm btn-info col-sm-5 m-2">Revert</button>
                                             <button onClick={this.storeQuizMapping} className="btn btn-sm btn-info col-sm-5 m-2">Store</button>
                                        </div>) : ('')
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