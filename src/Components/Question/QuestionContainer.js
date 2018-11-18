import React, { Component } from 'react'
import QuestionCard from './QuestionCard';

class QuestionContainer extends Component {

    listQuestions = [];

    data = [{
        question : "Who is the PM of India",
        options : [
            "Rahul parihar",
            "Narendra Kumawat",
            "Narendra Modi"
        ]
    },
    {
        question : "Who is the CM of MP",
        options : [
            "ChoduMal",
            "Gandu",
            "Shivraj"
        ]
    }]

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="container-fluid" id="react-workspace">
                            { this.data.map((val, i) => {return (<QuestionCard question = {val} /> )})}
                        </div>
                    </div>
                </div>
             </div>             
        )
    }
}

export default QuestionContainer;