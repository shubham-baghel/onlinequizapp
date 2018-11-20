import React, {Component} from 'react';

export default class PreviousButton extends Component{
   constructor(props){
       super(props);
   }
    render(){
        return (<button type="button" className="btn btn-primary btn-sm float-left" onClick={this.props.onHandleClick}>Previous</button>)
    }
}