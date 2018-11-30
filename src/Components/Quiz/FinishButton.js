import React, {Component} from 'react';

export default class FinishButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<button type="button" className="btn btn-outline-info h-100 btn-sm" onClick={this.props.onHandleClick}><span className='glyphicon glyphicon-forward'></span></button>)
    }
}