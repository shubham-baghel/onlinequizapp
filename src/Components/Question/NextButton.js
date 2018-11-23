import React, {Component} from 'react';

export default class NextButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
       return  (<button type="button" className="btn h-100 btn-sm btn-light" onClick={this.props.onHandleClick}><span className='glyphicon glyphicon-chevron-right'></span></button>)
    }
}