import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class QuizLaunchByVisitor extends Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.submitCriteria = this.submitCriteria.bind(this);
        this.state = {
            quizCriteria: {
                selectedSubjects: [],
                selectedTags: []
            },
            renderQuiz: false,
        }
    }

    handleSelection(buttonType, value) {
        let criteria = Object.assign({}, this.state.quizCriteria);
        if (buttonType == "subject") {
            if (criteria.selectedSubjects.includes(value)) {
                criteria.selectedSubjects.splice(criteria.selectedSubjects.indexOf(value), 1);
            } else {
                criteria.selectedSubjects.push(value);
            }
        } else {
            if (criteria.selectedTags.includes(value)) {
                criteria.selectedTags.splice(criteria.selectedTags.indexOf(value), 1);
            } else {
                criteria.selectedTags.push(value);
            }
        }
        this.setState({ quizCriteria: criteria });
    }

    submitCriteria() {
        this.setState({ renderQuiz: true });
    }

    render() {
        if (this.state.renderQuiz) {
            return <Redirect to=
                {
                    {
                        pathname: "/quiz",
                        state: { quizCriteria: this.state.quizCriteria }
                    }} />
        }

        let subjects = ['gk', 'science', 'history', 'gk', 'science', 'history', 'gk', 'gk', 'science', 'history', 'gk', 'science', 'history', 'gk', 'science', 'history', 'gk', 'science', 'history', 'gk', 'science', 'history'];
        let tags = ['electro', 'organic-chemistry', 'tag', 'electro', 'organic-chemistry', 'tag', 'electro', 'organic-chemistry', 'tag', 'electro', 'organic-chemistry', 'tag', 'electro', 'organic-chemistry', 'tag', 'electro', 'organic-chemistry', 'tag'];

        return (
            <div className="container-fluid mt-4 full-height-container">
                <div className="row">
                    <div className="col-lg-3"> </div>
                    <div className="col-lg-6">
                        <div className="jumbotron">
                            <div className="text-left"><label className="label label-default">Select Subjects</label></div>
                            <div className="row">
                                <div className="btn-toolbar">
                                    {
                                        subjects.map((val, i) => {
                                            return (<button key={i} type="button" value={val} className={this.state.quizCriteria.selectedSubjects.includes(val) == true ? "btn btn-success m-2" : "m-2 btn btn-primary"} onClick={() => this.handleSelection("subject", val)}>{val}</button>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row">
                    <div className="col-lg-3"> </div>
                    <div className="col-lg-6">
                        <div className="jumbotron">
                            <div className="text-left"><label className="label label-default">Select Tags</label></div>
                            <div className="row">
                                <div className="btn-toolbar">
                                    {
                                        tags.map((val, i) => {
                                            return (<button key={i} type="button" value={val} className={this.state.quizCriteria.selectedTags.includes(val) == true ? "m-2 btn btn-success" : "m-2 btn btn-primary"} onClick={() => this.handleSelection("tag", val)}>{val}</button>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row">
                    <div className="col-lg-3"> </div>
                    <div className="col-lg-6">
                        <div>
                            <button type="submit" className="btn btn-primary" disabled={this.state.quizCriteria.selectedSubjects.length <= 0 && this.state.quizCriteria.selectedTags.length <= 0} onClick={this.submitCriteria}>Submit</button>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        )
    }
}

export default QuizLaunchByVisitor;