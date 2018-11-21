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


        let options = props.options || [];
        let minoptions = (options.length || props.minoptions) || 2;

        if (options.length == 0) {
            for (let i = 1; i <= minoptions; i++) {
                options.push({ id: i, o: '' });
            }
        }
        this.state = {
            _id:props._id||'',
            question: props.question || '',
            options: options,
            answers: props.answers || [],
            minoptions: minoptions,
            maxOptions: props.maxOptions || 5
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit({
            _id:this.state._id,
            question:this.state.question,
            options:this.state.options,
            answers:this.state.answers,
            tags:[],
            subject:"gk"//From Drop down future
        });
    }

    onMarkAnswer(id, mark) {
        let ans = Object.assign(this.state.answers || []);
        if (mark) {
            ans.push({ id: id });
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

    onFormInputOptionChange(e, id) {
        let op = e.target.value;
        let newOptions = Object.assign(this.state.options);
        newOptions.filter((o) => o.id == id)[0].o = op;
        this.setState({ options: newOptions });
    }

    render() {
        return (
            <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            <label htmlFor="question">Question</label>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-9">
                            <textarea onChange={this.onFormInputQuestionChange} className="form-control" id="question" value={this.state.question} placeholder="Enter question here" />
                        </div>
                    </div>
                    {
                        this.state.options.map((val, index) => {
                            return (
                                <div className="form-group row" key={index + 1}>
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-1">
                                        <label htmlFor={"option" + index + 1}> Option {index + 1} </label>
                                    </div>
                                    <div className="col-sm-1">
                                        {
                                            index == this.state.minoptions - 1 ?
                                                (<button title="add more options" type="button" className="btn" onClick={() => this.onAddMoreOption(this.state.options.length + 1)}>+</button>)
                                                : ('')

                                        }
                                        {
                                            index > this.state.minoptions - 1 ?
                                                (<button title="remove this option" type="button" className="btn" onClick={() => this.onRemoveOption(index + 1)}>-</button>)
                                                : ('')

                                        }
                                    </div>
                                    <div className="col-sm-8">
                                        <input value={val.o} onChange={(e) => this.onFormInputOptionChange(e, index + 1)} type="text" className="form-control" id={"option" + index + 1} placeholder="Enter option here" />
                                    </div>
                                    <div className="col-sm-1">
                                        {
                                            this.state.answers.filter((op) => op.id == val.id).length > 0 ?
                                                (<button type="button" className="btn" onClick={() => this.onMarkAnswer(index + 1, false)}>_/</button>) :
                                                (<button type="button" className="btn" onClick={() => this.onMarkAnswer(index + 1, true)}>&#xf058;</button>)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}