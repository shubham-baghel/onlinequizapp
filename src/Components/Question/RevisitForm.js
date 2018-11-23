'use strict';
import React, {Component} from 'react'


export default class RevisitForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                Quiz Review
                {
                    Object.keys(this.props.userRes).map((val,i)=>{
                        return (<button className={this.props.userRes[val].length > 0 ? "btn btn-primary" :"btn btn-btn-secondary" } >{++val}</button>)
                    })
                }
                    <button className="btn btn-primary" onClick={this.props.revisitQuiz}>Revisit Quiz</button>
                    <button className="btn btn-success">Finish Quiz</button>
            </div>
            
        )
    }
}

