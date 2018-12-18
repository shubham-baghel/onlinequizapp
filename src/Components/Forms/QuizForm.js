import React, { Component } from 'react';

export default class QuizForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFormQuizNameChange=this.onFormQuizNameChange.bind(this);
        this.onFormQuizModeChange=this.onFormQuizModeChange.bind(this);
        this.onQuizNumOfQuestionsChange=this.onQuizNumOfQuestionsChange.bind(this);
        this.onFormInputSubjectChange = this.onFormInputSubjectChange.bind(this);
        this.onFormInputTagChange = this.onFormInputTagChange.bind(this);
        this.handleonAddNewQuiz = this.handleonAddNewQuiz.bind(this);
        this.onFormLanguageChange = this.onFormLanguageChange.bind(this);
        this.onFormQuizLevelChange = this.onFormQuizLevelChange.bind(this);
        this.onSubjectRemove=this.onSubjectRemove.bind(this);
        this.onTagRemove=this.onTagRemove.bind(this);

        this.initializeForm = this.initializeForm.bind(this);

        this.initializeForm(props.quizModel || {}, true);
    }

    initializeForm(quizModel, initial) {

        quizModel = quizModel || {};
        let stateObject = {
            _id: quizModel._id || '',
            name: quizModel.name || '',
            numOfQuestions: quizModel.numOfQuestions||5,
            subjects: quizModel.subjects || ['General'],
            tags: quizModel.tags || [],
            language: quizModel.language || 'English',
            minLevel: quizModel.minLevel || 1,
            quizMode:quizModel.quizMode||1, //1 - dynamic, 2- mapping
        };

        if (initial || false) {
            this.state = stateObject;
        } else {
            this.setState(stateObject);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit({
            _id: this.state._id,
            name: this.state.name,
            numOfQuestions: this.state.numOfQuestions,
            subjects: this.state.subjects,
            tags: this.state.tags,
            language: this.state.language,
            minLevel: this.state.minLevel,
            quizMode:this.state.quizMode
        });
    }

    handleonAddNewQuiz(e) {
        e.preventDefault();
        this.initializeForm();
        this.props.onAddNewQuiz();
    }

    onFormQuizNameChange(e) {
        let q = e.target.value;
        this.setState({ name: q });
    }
    
    onFormQuizModeChange(e){
        let q = e.target.value;
        this.setState({ quizMode: q });
    }

    onQuizNumOfQuestionsChange(e){
        let q = e.target.value;
        this.setState({ numOfQuestions: q });
    }

    onFormQuizLevelChange(e) {
        let level = e.target.value;
        this.setState({ level: level });
    }

    onFormLanguageChange(e) {
        let l = e.target.value;
        this.setState({ language: l });
    }

    onFormInputSubjectChange(e) {
        let sval = e.target.value;
        sval = (sval || "").trim();
        if (sval != "" && sval.toLowerCase()!="Select Subject") {
            let subjects = Object.assign(this.state.subjects || []);
            if (subjects.filter((s) =>
                s.trim().toLowerCase() == sval.toLowerCase()).length == 0) {
                subjects.push(sval);
                this.setState({ subjects: subjects });
            }
            e.currentTarget.value = "Select Subject";
        }
    }

    onFormInputTagChange(e) {
        if (e.key == "Enter" || e.key == " ") {
            let tval = e.target.value;
            tval = (tval || "").trim();
            if (tval != "") {
                let tags = Object.assign(this.state.tags || []);
                if (tags.filter((t) =>
                    t.trim().toLowerCase() == tval.toLowerCase()).length == 0) {
                    tags.push(tval);
                    this.setState({ tags: tags });
                }
                e.currentTarget.value = "";
                e.preventDefault();
            }
        }
    }

    onTagRemove(tval){
        let tags=Object.assign(this.state.tags);
        tags=tags.filter((t) =>t.trim().toLowerCase() != tval.toLowerCase())
        this.setState({ tags: tags });
    }
    onSubjectRemove(sval){
        let subjects=Object.assign(this.state.subjects);
        subjects=subjects.filter((s) =>s.trim().toLowerCase() != sval.toLowerCase())
        this.setState({ subjects: subjects });
    }

    render() {
        const defaultSubjects=['Select Subject','General','Physics','Chemistry','Mathematics']
        return (
            <div className="container-fluid">
                <div>
                <h3>Add Quiz <small> provide quiz details</small></h3>
                <hr className=" colorgraph"></hr>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <input type="text" disabled={this.props.viewMode || false} required={true} onChange={this.onFormQuizNameChange} className="form-control" id="QuizName" value={this.state.name} placeholder="Quiz Name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <select required={true} disabled={this.props.viewMode || false} value={this.state.quizMode || "1"} className="form-control" id="quizmode" onChange={this.onFormQuizModeChange}>
                                <option value={null}>Select quiz mode</option>
                                <option value="1">Automatic - will generate questions automatically</option>
                                <option value="2">Manualy - you need to add questions</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <select required={true} disabled={this.props.viewMode || false} value={this.state.numOfQuestions || 10} className="form-control" id="numOfQuestions" onChange={this.onQuizNumOfQuestionsChange}>
                                <option value={null}>Number of questions</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group  col-sm-12">
                        <select required={true} disabled={this.props.viewMode || false} className="form-control" id="subject" onChange={this.onFormInputSubjectChange}>
                                {
                                    defaultSubjects.map((val,index)=>{
                                        return (<option key={index} value={val}>{val}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {
                        (this.state.subjects || []).length > 0 ?
                            (<div className="row">
                                <div className="form-group col-sm-12 text-left">
                                    {
                                        (this.state.subjects || []).map((val, index) => {
                                            return (<div key={index} className="label label-info mr-2 pr-2 card">
                                                <span>{val}</span>&nbsp;&nbsp;
                                                <span value={val} role="button" onClick={()=>this.onSubjectRemove(val)} className="glyphicon glyphicon-remove"></span>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>) : ''
                    }
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <input disabled={this.props.viewMode || false} onKeyPress={this.onFormInputTagChange} className="form-control" id="tags" placeholder="Enter tags here" />
                        </div>
                    </div>
                    {
                        (this.state.tags || []).length > 0 ?
                            (<div className="row">
                                <div className="form-group col-sm-12 text-left">
                                    {
                                        (this.state.tags || []).map((val, index) => {
                                            return (<div key={index} className="label label-info mr-2 pr-2 card">
                                                <span>{val}&nbsp;&nbsp;</span>
                                                <span value={val} role="button" onClick={()=>this.onTagRemove(val)} className="glyphicon glyphicon-remove"></span>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>) : ''
                    }
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <select required={true} disabled={this.props.viewMode || false} value={this.state.minLevel || 1} className="form-control" id="level" onChange={this.onFormQuizLevelChange}>
                                <option value={null}>Select level</option>
                                <option value={1}>Easy</option>
                                <option value={2}>Walking</option>
                                <option value={3}>Medium</option>
                                <option value={4}>Running</option>
                                <option value={5}>Expert</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <select required={true} disabled={this.props.viewMode || false} value={this.state.language || 'English'} className="form-control" id="language" onChange={this.onFormLanguageChange}>
                                <option value="">Select language</option>
                                <option value="English">English</option>
                                <option value="Hindi">हिन्दी</option>
                            </select>
                        </div>
                    </div>
                    <hr className=" colorgraph"></hr>
                    <div className="form-group">
                    {
                                (this.props.viewMode || false) ?
                                    (<button id="addnew" type="button" onClick={this.handleonAddNewQuiz} className="btn btn-info">Add More</button>) :
                                    (<button id="sunmit" type="submit" className="btn btn-primary btn-block">Submit</button>)
                            }
                    </div>

                </form>
            </div>
        )
    }
}