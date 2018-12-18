import React, {Component} from 'react';

export default class PreviousButton extends Component{
   constructor(props){
       super(props);
   }
    render(){
        return (<button type="button" className="btn btn-info btn-sm w-100" onClick={this.props.onHandleClick}>&lt;</button>)
    }
}