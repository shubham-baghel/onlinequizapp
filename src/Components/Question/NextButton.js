import React, {Component} from 'react';

export default class NextButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
       return  (<button type="button" className="btn btn-primary btn-sm float-right" onClick={this.props.onHandleClick}>Next</button>)
    }
}