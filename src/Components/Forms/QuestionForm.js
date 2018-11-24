import React, { Component } from 'react';

export default class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onMarkAnswer = this.onMarkAnswer.bind(this);
        this.onAddMoreOption = this.onAddMoreOption.bind(this);
        this.onRemoveOption = this.onRemoveOption.bind(this);
        this.onFormInputQuestionChange = this.onFormInputQuestionChange.bind(this);
        this.onFormInputOptionChange = this.onFormInputOptionChange.bind(this);
        this.onFormInputSubjectChange = this.onFormInputSubjectChange.bind(this);
        this.onFormInputTagChange = this.onFormInputTagChange.bind(this);
        this.handleonAddNewQuestion = this.handleonAddNewQuestion.bind(this);
        this.onFormLanguageChange = this.onFormLanguageChange.bind(this);
        this.onFormQuestionLevelChange = this.onFormQuestionLevelChange.bind(this);
        this.initializeForm = this.initializeForm.bind(this);

        this.initializeForm(props.questionModel || {}, props.minoptions, props.maxOptions, true);
    }

    initializeForm(questionModel, minoptions, maxOptions, initial) {
        questionModel = questionModel || {};
        let options = questionModel.options || [];
        minoptions = (options.length || minoptions) || 2;

        if (options.length == 0) {
            for (let i = 1; i <= minoptions; i++) {
                options.push({ id: i, o: '' });
            }
        }
        let stateObject = {
            _id: questionModel._id || '',
            question: questionModel.question || '',
            options: options,
            answers: questionModel.answers || [],
            minoptions: minoptions,
            maxOptions: maxOptions || 5,
            subjects: questionModel.subjects || ['General'],
            tags: questionModel.tags || [],
            isError: false,
            message: '',
            language: questionModel.language || 'English',
            level: questionModel.level || 1
        };
        if (initial || false) {
            this.state = stateObject;
        } else {
            this.setState(stateObject);
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.answers.length == 0) {
            this.setState({ isError: true, message: "Please mark at least one Option as an Answer!" });
        } else {
            this.props.onFormSubmit({
                _id: this.state._id,
                question: this.state.question || '',
                options: this.state.options || [],
                answers: this.state.answers || [],
                tags: this.state.tags || [],
                subjects: this.state.subjects || ['General'],
                language: this.state.language,
                level: this.state.level
            });
        }
    }

    handleonAddNewQuestion(e) {
        e.preventDefault();
        this.initializeForm();
        this.props.onAddNewQuestion();
    }

    onMarkAnswer(id, mark) {
        let ans = Object.assign(this.state.answers || []);
        if (mark) {
            if (this.state.answers.filter((o) => { return o.id == parseInt(id); }).length == 0) {
                ans.push({ id: id });
            }
        } else {
            ans = ans.filter((v) => v.id != id);
        }
        this.setState({ answers: ans });
    }

    onAddMoreOption(e) {
        let id = e;
        if (id <= this.state.maxOptions) {
            let newOptions = Object.assign(this.state.options);
            newOptions.push({ id: parseInt(id), o: '' });
            this.setState({ options: newOptions });
        }
    }

    onRemoveOption(e) {
        let id = e;
        let newOptions = Object.assign(this.state.options);
        let ans = Object.assign(this.state.answers || []);
        let newAns = [];
        newOptions = newOptions.filter((o) => { return o.id != parseInt(id); });
        newOptions.forEach((val, i) => {
            if (ans.filter((a) => a.id == val.id).length) {
                newAns.push({ id: i + 1 });
            }
            val.id = i + 1;
        })
        this.setState({ options: newOptions, answers: newAns });
    }

    onFormInputQuestionChange(e) {
        let q = e.target.value;
        this.setState({ question: q });
    }

    onFormLanguageChange(e) {
        let l = e.target.value;
        this.setState({ language: l });
    }

    onFormInputSubjectChange(e) {
        if (e.key == "Enter" || e.key == " ") {
            let sval = e.target.value;
            sval = (sval || "").trim();
            if (sval != "") {
                let subjects = Object.assign(this.state.subjects || []);
                if (subjects.filter((s) =>
                    s.trim().toLowerCase() == sval.toLowerCase()).length == 0) {
                        subjects.push(sval);
                    this.setState({ subjects: subjects });
                }
                e.currentTarget.value = "";
                e.preventDefault();
            }
        }
    }

    onFormQuestionLevelChange(e) {
        let level = e.target.value;
        this.setState({ level: level });
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

    onFormInputOptionChange(e, id) {
        let op = e.target.value;
        let newOptions = Object.assign(this.state.options);
        newOptions.filter((o) => o.id == id)[0].o = op;
        this.setState({ options: newOptions });
        if ((op || '').trim() == '') {
            this.onMarkAnswer(id, false);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-1">
                            <label className=''><span class="glyphicon glyphicon-hand-right"></span></label>
                        </div>
                        <div className="col-sm-1">
                            <label className='label label-default' htmlFor="question">Question</label>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-8">
                            <textarea disabled={this.props.viewMode || false} required={true} onChange={this.onFormInputQuestionChange} className="form-control" id="question" value={this.state.question} placeholder="Enter question here" />
                        </div>
                    </div>
                    {
                        this.state.options.map((val, index) => {
                            return (
                                <div className="form-group row" key={index + 1}>
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-1">
                                        <label className='label label-default' htmlFor={"option" + index + 1}> Option {index + 1} </label>
                                    </div>
                                    <div className="col-sm-1">
                                        {
                                            index == this.state.minoptions - 1 ?
                                                (<button disabled={this.props.viewMode || false} title="add more options" type="button" className="btn btn-sm btn-light ml-3" onClick={() => this.onAddMoreOption(this.state.options.length + 1)}>
                                                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>)
                                                : ('')

                                        }
                                        {
                                            index > this.state.minoptions - 1 ?
                                                (<button disabled={this.props.viewMode || false} title="remove this option" type="button" className="btn btn-sm btn-light ml-3" onClick={() => this.onRemoveOption(index + 1)}>
                                                    <span className="glyphicon glyphicon-minus" aria-hidden="true"></span></button>)
                                                : ('')

                                        }
                                    </div>
                                    <div className="col-sm-8">
                                        <input disabled={this.props.viewMode || false} required={true} value={val.o} onChange={(e) => this.onFormInputOptionChange(e, index + 1)} type="text" className="form-control" id={"option" + index + 1} placeholder="Enter option here" />
                                    </div>
                                    <div className="col-sm-1">
                                        {
                                            this.state.answers.filter((op) => op.id == val.id).length > 0 ?
                                                (<button disabled={this.props.viewMode || false} type="button" className="btn btn-sm btn-light" onClick={() => this.onMarkAnswer(index + 1, false)}>
                                                    <span className="glyphicon glyphicon-saved" aria-hidden="true"></span>
                                                </button>) :
                                                (<button disabled={(this.props.viewMode || false) || val.o == ""} type="button" className="btn btn-sm btn-light" onClick={() => this.onMarkAnswer(index + 1, true)}>
                                                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                                </button>)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            <label className='label label-default' htmlFor="subject">Subjects</label>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-8">
                            <input disabled={this.props.viewMode || false}  onKeyPress={this.onFormInputSubjectChange} className="form-control" id="subject"  placeholder="Enter subject here" />
                        </div>
                    </div>
                    {
                        (this.state.subjects || []).length > 0 ?
                            (<div className="form-group row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1">
                                </div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-9 text-left">
                                    {
                                        (this.state.subjects || []).map((val, index) => {
                                            return (<div key={index} className="label label-default mr-2 pr-2 card">
                                                <span>{val}</span>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>) : ''
                    }
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            <label className='label label-default' htmlFor="tags">Tags</label>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-8">
                            <input disabled={this.props.viewMode || false} onKeyPress={this.onFormInputTagChange} className="form-control" id="tags" placeholder="Enter tag here" />
                        </div>
                    </div>
                    {
                        (this.state.tags || []).length > 0 ?
                            (<div className="form-group row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1">
                                </div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-9 text-left">
                                    {
                                        (this.state.tags || []).map((val, index) => {
                                            return (<div key={index} className="label label-default mr-2 pr-2 card">
                                                <span>{val}</span>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>) : ''
                    }
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            <label className='label label-default' htmlFor="level">Level</label>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-8">
                            <select required={true} disabled={this.props.viewMode || false} value={this.state.level || 1} className="form-control" id="level" onChange={this.onFormQuestionLevelChange}>
                                <option value={1}>Easy</option>
                                <option value={2}>Walking</option>
                                <option value={3}>Medium</option>
                                <option value={4}>Running</option>
                                <option value={5}>Expert</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            <label className='label label-default' htmlFor="language">Language</label>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-8">
                            <select required={true} disabled={this.props.viewMode || false} value={this.state.language || 'English'} className="form-control" id="language" onChange={this.onFormLanguageChange}>
                                <option value="English">English</option>
                                <option value="Hindi">हिन्दी</option>
                            </select>
                        </div>
                    </div>
                    {
                        (this.state.isError || false) || (this.props.isMsg || false) ?
                            (<div className="form-group row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-8">
                                    {
                                        (this.state.isError || false) ?
                                            (<h4><label className='label label-danger'>{this.state.message}</label></h4>) :
                                            (<h4><label className='label label-success'>{this.props.message || ''}</label></h4>)
                                    }
                                </div>
                            </div>) : ''
                    }
                    {this.state.isError = false}
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            {
                                (this.props.viewMode || false) ?
                                    (<button id="addnew" type="button" onClick={this.handleonAddNewQuestion} className="btn btn-info">Add More</button>) :
                                    (<button id="sunmit" type="submit" className="btn btn-primary">Submit</button>)
                            }
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}