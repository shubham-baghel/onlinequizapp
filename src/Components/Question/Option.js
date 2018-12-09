import React, {Component} from 'react'

class Option extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
        <li className="list-group-item">{this.props.option}</li>
        )
    }
}

 export  default Option;