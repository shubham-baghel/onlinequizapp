import React, { Component } from 'react'
import Question from "./Question";
import Options from "./Options";
import QuestionCard from './QuestionCard';

class QuestionContainer extends Component {

    listQuestions = new Array();

    data = [{
        question : "Who is PM of India",
        options : [
            "Rahul parihar",
            "Narendra Kumawat",
            "Narendra Modi"
        ]
    },
    {
        question : "Who is CM of India",
        options : [
            "ChoduMal",
            "Narendra Kumawat",
            "Narendra Modi"
        ]
    }]

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="container-fluid" id="react-workspace">
                            { this.data.map((val, i) => {return (<QuestionCard question = {val} /> )})}
                        </div>
                    </div>
                </div>
             </div>             
        )
    }
}

export default QuestionContainer;