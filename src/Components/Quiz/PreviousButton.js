import React, {Component} from 'react';

export default class PreviousButton extends Component{
   constructor(props){
       super(props);
   }
    render(){
        return (<button type="button" className="btn h-100 btn-sm btn-outline-info" onClick={this.props.onHandleClick}><span className="glyphicon glyphicon-chevron-left"></span></button>)
    }
}