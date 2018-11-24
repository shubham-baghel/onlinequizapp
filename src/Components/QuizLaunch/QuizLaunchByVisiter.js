import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


export default class QuizLaunchByVisitor extends Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.submitCriteria = this.submitCriteria.bind(this);
        this.state = {
            quizCriteria : {
                selectedSubjects : [],
                selectedTags : []
            },
            renderQuiz : false,
        }
    }

    handleSelection(e) {
        let target = e.target;
        let criteria = Object.assign({}, this.state.quizCriteria);
        if (target.getAttribute("buttonType") == "subject") {
            if (criteria.selectedSubjects.includes(target.value)) {
                criteria.selectedSubjects.splice(criteria.selectedSubjects.indexOf(target.value), 1);
            } else {
                criteria.selectedSubjects.push(target.value);
            }
        } else {
            if (criteria.selectedTags.includes(target.value)) {
                criteria.selectedTags.splice(criteria.selectedTags.indexOf(target.value), 1);
            }else {
            criteria.selectedTags.push(target.value);
            }
        }
        this.setState({ quizCriteria: criteria });
    }

    submitCriteria(){
        this.setState({renderQuiz : true});
    }

    render() {
        if(this.state.renderQuiz){
            return <Redirect to=
                    {
                    {pathname :"/quiz",
                     state : {quizCriteria : this.state.quizCriteria}}}/>
        }
       
        let subjects = ['gk', 'science', 'history'];
        let tags = ['electro', 'organic-chemistry', 'tag'];

        return (
            <div className="container">
                <div className="jumbotron">
                    <div><b>Select Subjects</b></div>
                    <div className="row">
                        <div className="btn-toolbar">
                            {
                                subjects.map((val, i) => {
                                    return (<button type="button" value={val} buttonType="subject" className={this.state.quizCriteria.selectedSubjects.includes(val) == true ?  "btn btn-success" : "btn btn-primary"} onClick={this.handleSelection}>{val}</button>)
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="jumbotron">
                    <div><b>Select Tags</b></div>
                    <div className="row">
                        <div className="btn-toolbar">
                            {
                                tags.map((val, i) => {
                                    return (<button type="button" value={val} buttonType="tag" className={this.state.quizCriteria.selectedTags.includes(val) == true ?  "btn btn-success" : "btn btn-primary"} onClick={this.handleSelection}>{val}</button>)
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.quizCriteria.selectedSubjects.length <= 0 && this.state.quizCriteria.selectedTags.length <= 0  } onClick={this.submitCriteria}>Submit</button>
                </div>
            </div>
        )

    }
}