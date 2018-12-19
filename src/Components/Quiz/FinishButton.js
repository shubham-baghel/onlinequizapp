import React, {Component} from 'react';

export default class FinishButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<button type="button" className="btn  alert-success btn-sm w-100" onClick={this.props.onHandleClick}>&gt;&gt;</button>)
    }
}