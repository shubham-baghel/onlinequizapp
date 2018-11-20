import React, {Component} from 'react';

export default class FinishButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<button type="button" className="btn btn-success btn-sm float-right" onClick={this.props.onHandleClick}>Finish</button>)
    }
}