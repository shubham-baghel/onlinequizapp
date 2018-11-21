import React, {Component} from 'react';

export default class NextButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
       return  (<button type="button" className="btn h-100" onClick={this.props.onHandleClick}>&#8250;</button>)
    }
}