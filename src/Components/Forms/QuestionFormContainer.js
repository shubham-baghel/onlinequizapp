import React, { Component } from 'react';
import QuestionForm from './QuestionForm';

export default class QuestionFormContainer extends Component {
    constructor(props) {
        super(props);
        this.onHandleFormSubmit=this.onHandleFormSubmit.bind(this);
    }

    onHandleFormSubmit(questionFormData){
        //Add Question to API
        debugger;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-sm-10  mb-2 mt-2">
                        <QuestionForm maxOptions={6} minoptions={3} onFormSubmit={this.onHandleFormSubmit} />
                    </div>
                </div>
            </div>
        );
    }

   
}